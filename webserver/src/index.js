import app from './app'

const port = app.get('port')
const server = app.listen(port, () =>
  console.log(`Expanse running on port ${port}`)
)
