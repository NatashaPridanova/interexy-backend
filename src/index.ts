import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL, () => {
  console.log('connected to mongo db')
})

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('hello interexy!')
})

app.listen(port, () => {
  console.log(`Backend Server is running at port ${port}`)
})
