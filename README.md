# Untangle AI: Path to Clarity 🌿

**Turn messy thoughts into clear meaning.**
Untangle AI is an emotional clarity assistant that helps you rewrite anxiety-filled texts, clarify spiraling thoughts, and gain philosophical perspective.

![UI Preview](https://via.placeholder.com/800x400?text=Untangle+AI+Interface)

## ✨ Features

### 1. 💬 Message Builder
**"Don't send that raw text."**
Drafting a difficult message to an ex, a boss, or a friend?
-   Input your raw, messy, or anxious thoughts.
-   Get back a mature, clear, and confident version.
-   *Example: "Text him without sounding desperate" -> Polished, secure response.*

### 2. 🧠 Overthinking Clarifier
**"Stop the spiral."**
Feeling overwhelmed by a situation?
-   Vent without filter.
-   The AI breaks it down into: **What you control**, **What you don't**, and **Actionable next steps**.

### 3. 🪐 Philosophical Reflection
**"The View from Above."**
Need deeper wisdom?
-   Ask big questions about rejection, failure, or worry.
-   Receive advice channeling Stoic philosophers (Marcus Aurelius, Seneca) on impermanence and virtue.

---

## 🛠️ Tech Stack
-   **Frontend**: React (Vite), Modern CSS (Cream/Forest design system).
-   **Backend**: Node.js, Express.
-   **AI**: Google Gemini API (`gemini-2.0-flash`).

## 🚀 Getting Started

### Prerequisites
-   Node.js installed.
-   A Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/)).

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Untangle-AI
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    ```
    -   Create a `.env` file in the `backend` folder:
        ```env
        GEMINI_API_KEY=your_actual_api_key_here
        PORT=5000
        ```

3.  **Setup Frontend**
    ```bash
    cd ../frontend
    npm install
    ```

---

## 🏃‍♂️ How to Run

You need **two terminal windows** open (one for backend, one for frontend).

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```
*Server runs on: `http://localhost:5000`*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*App runs on: `http://localhost:5173`*

---

## ⚠️ Troubleshooting

### "Too Many Requests (429)" Error
If you see a red banner saying "Traffic is high", don't panic!
-   This means you hit the Google Gemini Free Tier rate limit.
-   **The Fix**: The app has auto-retry logic. Just wait **10-20 seconds** and try again. The backend will automatically retry your request.

### "EADDRINUSE: port 5000"
If the backend says port 5000 is busy:
-   You likely have another instance running.
-   Kill the process or restart your computer.
