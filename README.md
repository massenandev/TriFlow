# TriFlow - Intelligent Triathlon Training App

A comprehensive triathlon training application that combines AI-powered training plan generation with intuitive progress tracking. Built with Next.js frontend and designed to integrate with a Node.js backend for authentication, data storage, and AI processing.

## 🏊‍♂️🚴‍♂️🏃‍♂️ Features

### Frontend Features
- **Authentication**: Email/password and social login (Google, Twitter)
- **Smart Questionnaire**: 6-step progressive disclosure form capturing:
  - Personal information and goals
  - Experience levels for swim, bike, run
  - Training preferences and schedule
  - Equipment and motivational factors
- **Interactive Calendar**: Training session management with discipline-specific views
- **Progress Tracking**: Visual analytics and achievement system
- **Profile Management**: User profiles with photo upload capability
- **Responsive Design**: Mobile-first approach with ocean blue to sunset orange gradient theme

### Backend Integration Ready
- Structured API routes for easy Node.js backend integration
- JWT token-based authentication system
- RESTful API design patterns
- File upload handling for profile photos
- AI integration endpoints for training plan generation

## 🚀 Quick Start

### Frontend Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd triflow-app
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   BACKEND_URL=http://localhost:3001
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   Open [http://localhost:3000](http://localhost:3000)

## 🔧 Backend Integration Guide

### Required Node.js Backend Architecture

Create a separate Node.js backend with the following structure:

```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── trainingController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── TrainingSession.js
│   │   └── Achievement.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── training.js
│   │   └── ai.js
│   ├── services/
│   │   ├── aiService.js
│   │   ├── emailService.js
│   │   └── uploadService.js
│   └── app.js
├── package.json
└── .env
```

### Recommended Backend Technologies

#### Core Framework & Database
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0"
  }
}
```

#### Authentication & Security
```json
{
  "dependencies": {
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "passport": "^0.6.0",
    "passport-google-oauth20": "^2.0.0",
    "passport-jwt": "^4.0.1",
    "express-validator": "^7.0.1"
  }
}
```

#### File Upload & Storage
```json
{
  "dependencies": {
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.40.0",
    "sharp": "^0.32.5"
  }
}
```

#### AI Integration
```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.24.3",
    "openai": "^4.52.7"
  }
}
```

#### Email & Communication
```json
{
  "dependencies": {
    "nodemailer": "^6.9.4",
    "sendgrid": "^5.2.3"
  }
}
```

### Backend Environment Variables

```env
# Server Configuration
PORT=3001
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/triflow
REDIS_URL=redis://localhost:6379

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
TWITTER_API_KEY=your-twitter-api-key
TWITTER_API_SECRET=your-twitter-api-secret

# AI Services
ANTHROPIC_API_KEY=your-claude-api-key
OPENAI_API_KEY=your-openai-api-key

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

# Email Service
SENDGRID_API_KEY=your-sendgrid-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

## 📊 Database Schema

### MongoDB Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  profilePhoto: String (URL),
  isEmailVerified: Boolean,
  socialProviders: {
    google: { id: String, email: String },
    twitter: { id: String, username: String }
  },
  questionnaire: {
    personalInfo: {
      age: Number,
      weight: Number,
      height: Number,
      gender: String
    },
    experience: {
      swimming: String, // beginner, intermediate, advanced
      cycling: String,
      running: String,
      triathlon: String
    },
    goals: {
      primaryGoal: String,
      targetRace: String,
      timeframe: String
    },
    preferences: {
      trainingDays: Number,
      sessionDuration: Number,
      intensity: String
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Training Sessions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  date: Date,
  discipline: String, // swim, bike, run, brick
  type: String, // endurance, interval, recovery, race
  duration: Number, // minutes
  distance: Number,
  intensity: String,
  notes: String,
  completed: Boolean,
  actualDuration: Number,
  actualDistance: Number,
  rating: Number, // 1-10
  createdAt: Date
}
```

#### Achievements Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // distance, consistency, personal_best
  title: String,
  description: String,
  icon: String,
  unlockedAt: Date,
  progress: Number // 0-100
}
```

## 🔌 API Endpoints

### Authentication Routes
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/verify-email/:token
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/google
GET  /api/auth/twitter
```

### User Routes
```
GET    /api/users/profile
PUT    /api/users/profile
POST   /api/users/upload-photo
DELETE /api/users/account
GET    /api/users/achievements
```

### Training Routes
```
GET    /api/training/sessions
POST   /api/training/sessions
PUT    /api/training/sessions/:id
DELETE /api/training/sessions/:id
GET    /api/training/calendar/:month
GET    /api/training/stats
```

### Questionnaire & AI Routes
```
POST /api/questionnaire/submit
POST /api/ai/generate-plan
GET  /api/ai/training-suggestions
POST /api/ai/analyze-progress
```

## 🤖 AI Integration Implementation

### Claude API Integration Example

```javascript
// services/aiService.js
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateTrainingPlan(userProfile, questionnaire) {
  const prompt = `
    Create a personalized triathlon training plan for:
    - Experience: ${questionnaire.experience}
    - Goals: ${questionnaire.goals}
    - Available time: ${questionnaire.preferences.trainingDays} days/week
    - Target race: ${questionnaire.goals.targetRace}
    
    Generate a structured 12-week plan with specific workouts.
  `;

  const response = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 4000,
    messages: [{ role: 'user', content: prompt }]
  });

  return parseTrainingPlan(response.content);
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Backend Deployment Options

#### Option 1: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

#### Option 2: Heroku
```bash
# Install Heroku CLI
# Create Procfile
echo "web: node src/app.js" > Procfile

# Deploy
heroku create triflow-backend
git push heroku main
```

#### Option 3: DigitalOcean App Platform
```yaml
# .do/app.yaml
name: triflow-backend
services:
- name: api
  source_dir: /
  github:
    repo: your-username/triflow-backend
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
```

## 🔒 Security Considerations

1. **Authentication**: Implement JWT with refresh tokens
2. **Rate Limiting**: Protect API endpoints from abuse
3. **Input Validation**: Validate all user inputs
4. **File Upload**: Restrict file types and sizes
5. **CORS**: Configure proper CORS policies
6. **Environment Variables**: Never commit secrets to version control
7. **Database**: Use connection pooling and query optimization
8. **HTTPS**: Always use HTTPS in production

## 📱 Mobile Considerations

The frontend is built mobile-first, but consider:
- Progressive Web App (PWA) capabilities
- Offline training session logging
- Push notifications for training reminders
- Native mobile app using React Native (future enhancement)

## 🧪 Testing

### Frontend Testing
```bash
npm install --save-dev jest @testing-library/react
npm run test
```

### Backend Testing
```bash
npm install --save-dev jest supertest
npm run test:backend
```

## 📈 Performance Optimization

1. **Frontend**: Image optimization, code splitting, caching
2. **Backend**: Database indexing, Redis caching, CDN for assets
3. **AI**: Cache common training plan patterns
4. **Monitoring**: Implement logging and performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**TriFlow** - Swim. Bike. Run. Achieve. 🏊‍♂️🚴‍♂️🏃‍♂️
