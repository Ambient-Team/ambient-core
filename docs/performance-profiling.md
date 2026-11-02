# Performance profiling (pipeline transforms)

Ambient Core records Spark stage timing and plan excerpts through `PipelinePerfRecorder`
in [`lib/ambient_pipeline/perf.py`](../lib/ambient_pipeline/perf.py). This is optional
instrumentation for local scale tests—not required for catalog or contract CI.

## Quick local profile

```bash
source .venv/bin/activate
pip install -e ".[pipeline]"
AMBIENT_SPARK_TESTS=1 pytest tests/pipeline/test_perf_recorder.py -q
```

The tests exercise `record_stage`, `timed_action`, CSV flush, and Delta append with
`mergeSchema` enabled (schema evolution).

## Manual recorder snippet

```python
from ambient_pipeline.perf import PipelinePerfRecorder, create_local_spark

spark = create_local_spark()
df = spark.range(10)
rec = PipelinePerfRecorder(spark, volume_gb=0.001, output_path=".scale_test/gold/pipeline_perf")
rows, metrics = rec.timed_action("bronze_to_silver", df, plan_label="count")
rec.flush()
print(metrics.wall_seconds, metrics.plan_excerpt[:200])
```

## What gets captured

- Wall time per stage (`wall_seconds`)
- Input/output row counts when provided
- Shuffle read/write and spill bytes (best-effort from Spark status tracker)
- Truncated physical plan text (max 2000 characters in JSON export)
- Environment label (platform, Python version, Spark master)

## Output destinations

- **Delta table** (default): `.scale_test/gold/pipeline_perf` when `output_path` is unset
- **CSV**: set `output_path` to a `.csv` file path
- **Custom Delta path**: set `output_path` to a directory without `.csv` suffix

## Interpreting results

Compare `wall_seconds` across runs on the same machine with fixed `AMBIENT_SPARK_TESTS=1`.
Large `plan_excerpt` diffs usually indicate join or shuffle plan changes—pair with
`tests/pipeline/test_gold_layer_spark.py` idempotency checks when tuning transforms.
