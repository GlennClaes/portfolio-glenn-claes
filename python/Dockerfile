FROM python:3.12-slim
LABEL maintainer="Glenn Claes"

WORKDIR /app

COPY pyproject.toml .
RUN pip install --no-cache-dir .

COPY . .

ENTRYPOINT ["portfolio-tools"]
CMD ["--help"]
