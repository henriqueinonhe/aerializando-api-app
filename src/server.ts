import fastify from 'fastify'
import health from './controllers/health'

// Declare a route
const app = fastify()

app.get('/health', health)

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

export default app