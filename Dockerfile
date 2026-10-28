FROM ghcr.io/cinnamon/kotaemon:main-full as base_image

USER root
RUN id -u user &>/dev/null || useradd -m -u 1000 user
WORKDIR /app

COPY --chown=user:user . /app
RUN chown -R user:user /app

USER user
ENV GRADIO_SERVER_NAME=0.0.0.0
ENV GRADIO_SERVER_PORT=7860

ENTRYPOINT ["python", "app.py"]
EXPOSE 7860
