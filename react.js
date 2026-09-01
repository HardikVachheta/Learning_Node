const logger = function (req, res, next) {
  console.log('logging')
  next()
}

app.use(logger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})