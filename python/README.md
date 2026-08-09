# Portfolio Tools — Python

Self-contained Python package with CLI tools and automation workflows for the
Glenn Claes portfolio project. Designed to demonstrate practical Python/AI
automation capabilities.

## Quick start

```bash
# Local
cd python
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"

# Docker
docker compose --profile tools build python
docker compose --profile tools run python --help
```

## Included workflows

| Workflow | What it does |
|----------|--------------|
| `portfolio-tools changelog` | Generates a changelog from git log between two tags |
| `portfolio-tools validate` | Validates `frontend/src/data/projects.ts` structure |
| `portfolio-tools seo-audit` | Checks SEO tags on a live or local URL |
| `portfolio-tools health` | Checks if a site is live (HTTP status, response time, title) |
| `portfolio-tools links` | Crawls a page and finds broken links |

## Adding your own

Drop a new module in `src/portfolio_tools/workflows/` and register it as a
subcommand in `cli.py`. The pattern is intentionally simple — each workflow is
a standalone `run()` function that receives parsed arguments.
