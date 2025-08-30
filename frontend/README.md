# TriFlow Frontend

This is the Next.js React frontend for TriFlow. It provides the user interface for triathlon training, authentication, progress tracking, and AI-powered plan generation.

## Features

- Next.js (React)
- Authentication (JWT/OAuth)
- Responsive UI
- API integration with backend
- File uploads
- AI-powered training plan interface

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (API URL, etc.).

3. **Run in development:**
   ```sh
   npm run dev
   ```

4. **Build and run in production:**
   ```sh
   npm run build
   npm start
   ```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server

## Environment Variables

See `.env.example` for required variables (e.g., `NEXT_PUBLIC_API_URL`).