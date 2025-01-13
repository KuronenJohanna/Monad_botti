const express = require('express')
const app = express()
const config = require('./utils/config')
const startGame = require('./services/gameService.js')


app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
    console.log('Pelin käynnistys...');
    startGame();
  })