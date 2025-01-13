const axios = require('axios');
const { apiToken } = require('../utils/config');

const startURL = 'https://koodipahkina.monad.fi/api/game'
let token = `Bearer ${apiToken}`
//täällä api pyynnöt


const startGameapi = async() => {
    try {
        const response = await axios.post(startURL, {}, {
            headers: {
            Authorization: token,
            },
        })

    return response.data;
    } catch (error) {
        console.error('Virhe pelin aloittamisessa:', error.message);
        };
}

const makeMoveapi = async(gameId, takeCard) => {
    try {

    const actionURL = `https://koodipahkina.monad.fi/api/game/${gameId}/action`
    const response = await axios.post(actionURL, { takeCard }, {
        headers: {
        Authorization: token,
        },
    })
    return response.data
    } catch (error) {
        console.error('Virhe siirrossa:', error.message);
        };

}

module.exports = { startGameapi, makeMoveapi }