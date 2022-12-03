const express = require('express')
const route = express.Router()
const accounts = require('./database')
const userData = require('./userData')
const data = require('./userData')

// Accounts Get request
route.get('/accounts', (req, res)=> {
  res.json({ userData: accounts})
})
// Account POST request
route.post('/accounts', (req, res)=> {
  const incommingData = req.body
  accounts.push(incommingData)
  res.json(accounts)
})

// Get request to find a specific id | person in accounts database
route.get('/accounts/:id',(req, res)=> {
  const accountId = Number(req.params.id)
  const getAccount = accounts.find((account)=> account.id === accountId)

  if(!getAccount){
    res.status(500).send('User id not found')
  } else {
    res.json( {userData : [getAccount]})
  }
})

// put request account data
route.put('/accounts/:id', (req, res)=> {
  const accountId = Number(req.params.id)
  const body = req.body
  const getAccount = accounts.find((account)=> account.id === accountId)
  const index = accounts.indexOf(getAccount)

  if(!getAccount){
    res.status(404).send('Account not found!')
  } else {
    const updatedAccount = {...getAccount, ...body}
    accounts[index] = updatedAccount
    res.send(updatedAccount)
  }
})

//----------------------------------------------------------//

// UserData Get request
route.get('/userdata', (req, res)=> {
  res.json({userData: data})
})

// userData POST request
route.post('/userdata', (req, res)=> {
  const incommingUser = req.body
  userData.push(incommingUser)
  res.json(userData)
})

// USERDATA get request to find a specific person
route.get('/userdata/:id', (req, res)=> {
  const userId = Number(req.params.id)
  const getUser = userData.find((user)=> user.id === userId)

  if(!getUser){
    res.status(404).send('User not found')
  } else {
    res.json({user: [getUser]})
  }
})

// put request userdata
route.put('/userdata/:id', (req, res)=> {
  const userId = Number(req.params.id)
  const body = req.body
  const account = userData.find((user)=> user.id === userId)
  const index = accounts.indexOf(account)

  if(!account){
    res.status(404).send('User not found')
  } else {
    const updatedData = {...account, ...body}
    // userData[index] = updatedData
    res.send(updatedData)
    console.log(updatedData)
  }
})

// delete http request over userdata
route.delete('/userdata/:id', (req, res)=> {
  const accountId = Number(req.params.id)
  const newAccounts = userData.filter((account)=> account.id != accountId)

  if(!newAccounts){
    res.status(404).send('User not found')
  } else {
    let userdata = newAccounts
    res.send(userdata)
  }
})




module.exports = route