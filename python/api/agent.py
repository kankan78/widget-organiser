import os
# import json
import importlib.util
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from phi.run.response import RunResponse
from pydantic import BaseModel, Field

app = FastAPI(title="AgentAgro Team Agent API")

# CORS configuration
_origins = os.getenv("CORS_ALLOW_ORIGINS", "*")
_origin_list = [o.strip() for o in _origins.split(",")] if _origins and _origins != "*" else ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_agent_team():
    """Dynamically load agent_team from agent_team.py (non-standard module name)."""
    project_root = Path(__file__).resolve().parents[1]
    target_path = project_root / "agent_team.py"
    if not target_path.exists():
        raise FileNotFoundError(f"agent file not found at {target_path}")

    spec = importlib.util.spec_from_file_location("agent_team_mod", str(target_path))
    if spec is None or spec.loader is None:
        raise ImportError("Could not create spec for agent module")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    if not hasattr(mod, "agent_team"):
        raise AttributeError("agent_team not found in agent_team.py")
    return mod.agent_team


class InferenceRequest(BaseModel):
    message: Optional[str] = Field(default=None, description="User message or instruction")
    images: List[str] = Field(default_factory=list, description="Optional list of image URLs")

@app.get("/api/health")
async def health():
    return {"ok": True, "service": "agent_team", "message": "Use POST /api/agent"}

@app.get("/api/agent")
async def get_info():
    return {"ok": True, "message": "Use POST /api/agent with {message, images}"}

@app.post("/api/agent")
async def run_agent(payload: dict = Body(...)):
    try:
        agent_team = load_agent_team()
        # Coerce flexible payloads
        message = (
            payload.get("message")
            or payload.get("text")
            or payload.get("prompt")
        )
        images = payload.get("images") or []
        print(payload)
        if not isinstance(images, list):
            images = [images]
        if not message:
            raise HTTPException(status_code=400, detail="'message' is required")

        # Run the agent team. The library prints to console; we return a best-effort JSON response.
        # Run the agent with an input
        response: RunResponse = agent_team.run(message=message,images=images)

        # Convert the Pydantic model instance to a JSON string
        result = response.content.model_dump_json()
        
        # Some agent implementations are synchronous; if it returns an object with content, surface it
        if result is not None:
            try:
                # Try to normalize to dict
                if isinstance(result, dict):
                    return {"ok": True, "result": result}
                return {"ok": True, "result": str(result)}
            except Exception:
                return {"ok": True}
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Local debug runner (not used by Vercel runtime)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))


