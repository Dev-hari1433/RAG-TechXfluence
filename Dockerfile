# syntax=docker/dockerfile:1.0.0-experimental
FROM ghcr.io/cinnamon/kotaemon:main-full as base_image

USER root
RUN useradd -m -u 1000 user || true
RUN chown -R user:user /app || true
RUN chown -R user:user /usr/local/lib/python3.10 || true

WORKDIR /app
COPY --chown=user:user . /app

USER user
ENV PATH="/app/.venv/bin:$PATH"
ENV GRADIO_SERVER_NAME=0.0.0.0
ENV GRADIO_SERVER_PORT=7860

ENTRYPOINT ["/app/.venv/bin/python", "app.py"]
EXPOSE 7860
