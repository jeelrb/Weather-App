const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

app.use(express.static(path.join(__dirname,'../public')))
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index',{
      title:'Weather App',
      name:'Jeel Baraiya'
    });
})

app.get('/about', (req, res) => {
  res.render('about',{
    title:'About Me',
    name:'Jeel Baraiya'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    message:'No Help, do it yourself!!',
    title:'Help',
    name:'Jeel Baraiya'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address
  if(!req.query.address){
    return res.send({
      error:'Provide any Location',
    })
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {
      if(error){
        return res.send({error})
      }

      forecast(longitude, latitude, (error, data) => {
        if(error){
          return res.send({error})
        }

        res.send({
          Forecast:data,
          location,
        })
      })

  })

  // res.send({
  //   location:'Ahmedabad',
  // })
})

app.get('/help/*', (req, res) => {
  res.render('error',{
    message:'Help Page not found',
  })
})

app.get('/about/*', (req, res) => {
  res.render('error',{
    message:'Page not found',
  })
})

app.get('/*', (req, res) => {
  res.render('error',{
    message:'Page not found',
  })
})



app.listen(port, () => {
  console.log("Server Started")
})
