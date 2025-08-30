# TriFlow Backend

This is the Node.js/TypeScript backend for TriFlow. It provides RESTful APIs for authentication, user management, training sessions, achievements, file uploads, and AI-powered training plan generation.

## Features

- JWT and OAuth authentication
- MongoDB with Mongoose
- File uploads (Cloudinary)
- AI integration (OpenAI, Anthropic)
- Email notifications (Nodemailer/Sendgrid)
- RESTful API endpoints

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your secrets.

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

- `npm run dev` — Start with hot reload (nodemon + ts-node)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run compiled app

## Environment Variables

See `.env.example` for all required variables.

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.ts
├── .env.example
├── package.json
└── tsconfig.json
```

## API Endpoints

- `/api/auth/*` — Authentication
- `/api/users/*` — User profile and achievements
- `/api/training/*` — Training sessions
- `/api/ai/*` — AI-powered features

---
