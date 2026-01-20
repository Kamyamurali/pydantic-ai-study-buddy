# StudyBuddy AI Backend

A Python backend built with **FastAPI** and **Pydantic AI** using Google's Gemini model.

## 🚀 Quick Start (Local Development)

1. **Create virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set environment variable:**
   ```bash
   export GEMINI_API_KEY="your-api-key-here"
   ```

4. **Run the server:**
   ```bash
   python main.py
   ```

   Server runs at `http://localhost:8000`

## 🌐 Free Deployment Options

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Select the `backend` folder as root
4. Add environment variable: `GEMINI_API_KEY`
5. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy!

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create new Web Service from GitHub
3. Set root directory to `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add `GEMINI_API_KEY` in Environment

### Option 3: Fly.io
1. Install flyctl: `curl -L https://fly.io/install.sh | sh`
2. Run `fly launch` in the backend folder
3. Set secret: `fly secrets set GEMINI_API_KEY=your-key`
4. Deploy: `fly deploy`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/health` | Health status |
| POST | `/chat` | Send message to AI tutor |

### Chat Request Body
```json
{
  "message": "Explain photosynthesis",
  "subject": "biology",
  "conversation_history": [],
  "api_key": "optional-if-set-in-env"
}
```

### Chat Response
```json
{
  "response": "Photosynthesis is the process...",
  "subject": "biology"
}
```

## 🔑 Getting a Free Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy and save your key

**Free tier includes:** 15 RPM, 1M tokens/minute, 1500 requests/day

## 🛡️ Security Note

Never commit your API key to version control. Always use environment variables.
