import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// TODO: Import and use routes here

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))