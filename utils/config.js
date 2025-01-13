require('dotenv').config();

const PORT = 3001
const apiToken = process.env.API_TOKEN


module.exports = { apiToken, PORT }