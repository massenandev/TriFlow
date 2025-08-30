# TriFlow

TriFlow is a full-stack triathlon training platform. It features a Next.js frontend and a Node.js/TypeScript backend, with AI-powered training plan generation, user authentication, file uploads, and more.

## Project Structure

```
triflow/
├── backend/      # Node.js/TypeScript API server
├── frontend/     # Next.js React frontend
├── README.md     # Project overview (this file)
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd triflow
   ```

2. **Install dependencies:**
   - Backend:  
     ```sh
     cd backend
     npm install
     ```
   - Frontend:  
     ```sh
     cd ../frontend
     npm install
     ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in both `backend` and `frontend` and fill in the required values.

4. **Run the apps:**
   - Backend:  
     ```sh
     cd backend
     npm run dev
     ```
   - Frontend:  
     ```sh
     cd ../frontend
     npm run dev
     ```

5. **Access the app:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Monorepo Tips

- Each app has its own README and environment variables.
- Use the root README for high-level documentation and onboarding.
