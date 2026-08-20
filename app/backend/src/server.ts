import { app } from './app'
import { PORT, connectDatabase } from './config'

if (process.env.NODE_ENV !== 'test') {
  connectDatabase().then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))).catch((error) => {
    console.error('MongoDB connection failed; API will not start', error)
    process.exitCode = 1
  })
}


export { app }
