const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')



const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))

app.use('/api', router)

app.get('/', (req, res)=> {
  res.end('Routing app')
})




app.listen(port, ()=> { console.log(`Server started on http://localhost:${port}`)})