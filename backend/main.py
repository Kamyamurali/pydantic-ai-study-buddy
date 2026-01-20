"""
StudyBuddy AI Backend
Built with FastAPI + Pydantic AI + Google Gemini
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.models.gemini import GeminiModel

app = FastAPI(title="StudyBuddy AI Backend", version="1.0.0")

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class ChatRequest(BaseModel):
    message: str
    subject: str | None = None
    conversation_history: list[dict] = []
    api_key: str | None = None

class ChatResponse(BaseModel):
    response: str
    subject: str | None = None

# System prompts per subject
SUBJECT_PROMPTS = {
    "mathematics": "You are an expert mathematics tutor. Explain concepts clearly with step-by-step solutions. Use examples and encourage problem-solving.",
    "physics": "You are a physics expert. Explain phenomena with real-world examples, equations, and intuitive explanations.",
    "chemistry": "You are a chemistry tutor. Explain reactions, molecular structures, and concepts with clear diagrams described in text.",
    "biology": "You are a biology expert. Explain life sciences with vivid descriptions and connections to everyday life.",
    "history": "You are a history scholar. Provide context, cause-effect relationships, and engaging narratives about historical events.",
    "literature": "You are a literature expert. Analyze texts, themes, and literary devices with insightful commentary.",
    "computer-science": "You are a programming tutor. Explain concepts with code examples, best practices, and debugging tips.",
    "languages": "You are a language learning expert. Help with grammar, vocabulary, and conversational practice.",
    "general": "You are a knowledgeable study buddy. Help students learn any topic with clear, engaging explanations."
}

def get_system_prompt(subject: str | None) -> str:
    """Get the appropriate system prompt for the subject."""
    base_prompt = SUBJECT_PROMPTS.get(subject or "general", SUBJECT_PROMPTS["general"])
    return f"""{base_prompt}

Guidelines:
- Be encouraging and patient
- Break down complex topics into digestible parts
- Use examples and analogies
- Ask follow-up questions to check understanding
- Provide practice problems when appropriate
- Format responses with markdown for clarity
"""

@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "healthy", "service": "StudyBuddy AI Backend"}

@app.get("/health")
async def health_check():
    """Health check for deployment platforms."""
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Process a chat message and return AI response."""
    try:
        # Get API key from request or environment
        api_key = request.api_key or os.getenv("GEMINI_API_KEY")
        
        if not api_key:
            raise HTTPException(
                status_code=400, 
                detail="Gemini API key is required. Provide it in the request or set GEMINI_API_KEY environment variable."
            )
        
        # Initialize Gemini model with Pydantic AI
        model = GeminiModel("gemini-1.5-flash", api_key=api_key)
        
        # Create agent with subject-specific system prompt
        agent = Agent(
            model=model,
            system_prompt=get_system_prompt(request.subject)
        )
        
        # Build conversation context
        context = ""
        if request.conversation_history:
            for msg in request.conversation_history[-10:]:  # Last 10 messages for context
                role = "Student" if msg.get("role") == "user" else "Tutor"
                context += f"{role}: {msg.get('content', '')}\n"
        
        # Prepare the full prompt
        full_prompt = f"{context}Student: {request.message}" if context else request.message
        
        # Get response from Pydantic AI agent
        result = await agent.run(full_prompt)
        
        return ChatResponse(
            response=result.data,
            subject=request.subject
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error processing chat: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process message: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
