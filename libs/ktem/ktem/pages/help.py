from importlib.metadata import version
from pathlib import Path

import gradio as gr
import requests
from decouple import config
from theflow.settings import settings

KH_DEMO_MODE = getattr(settings, "KH_DEMO_MODE", False)
HF_SPACE_URL = config("HF_SPACE_URL", default="")


def get_remote_doc(url: str) -> str:
    try:
        res = requests.get(url)
        res.raise_for_status()
        return res.text
    except Exception as e:
        print(f"Failed to fetch document from {url}: {e}")
        return ""


def download_changelogs(release_url: str) -> str:
    try:
        res = requests.get(release_url).json()
        changelogs = res.get("body", "")

        return changelogs
    except Exception as e:
        print(f"Failed to fetch changelogs from {release_url}: {e}")
        return ""


class HelpPage:
    def __init__(
        self,
        app,
        doc_dir: str = settings.KH_DOC_DIR,
        remote_content_url: str = "https://raw.githubusercontent.com/Cinnamon/kotaemon",
        app_version: str | None = settings.KH_APP_VERSION,
        changelogs_cache_dir: str
        | Path = (Path(settings.KH_APP_DATA_DIR) / "changelogs"),
    ):
        self._app = app
        self.doc_dir = Path(doc_dir)
        self.remote_content_url = remote_content_url
        self.app_version = app_version
        self.changelogs_cache_dir = Path(changelogs_cache_dir)

        self.changelogs_cache_dir.mkdir(parents=True, exist_ok=True)

        user_guide_md_dir = self.doc_dir / "usage.md"
        if user_guide_md_dir.exists():
            with (self.doc_dir / "usage.md").open(encoding="utf-8") as fi:
                user_guide_md = fi.read()
        else:  # fetch from remote
            user_guide_md = get_remote_doc(
                f"{self.remote_content_url}/v{self.app_version}/docs/usage.md"
            )
        if user_guide_md:
            with gr.Accordion("User Guide", open=True):
                gr.Markdown(user_guide_md)
