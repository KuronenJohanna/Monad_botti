const { startGameapi, makeMoveapi } = require('../api/gameapi.js')
// Tänne pelin logiikka
let takeCard = null
let gameCount = 0

const startGame = async () => {
try {
    const gameData = await startGameapi()

    const card = gameData.status.card
    const gameid = gameData.gameId
    const money = gameData.status.money


    takeCard = (11 < card && card < 19 && money > 3) ? true : false;
    gameOn(gameid, takeCard, gameData);

} catch (error) {
    console.error('pelin aloitus ei onnistunut', error);
}
};

const gameOn = async (gameId, takeCard, gameData) => {
    try {
            //tarkista pelin tilanne
        if (!gameData.status.finished) {
            console.log('peli kesken... jatkuu')
            let gameData = await makeMoveapi(gameId, takeCard);

            const card = gameData.status.card;
            const money = gameData.status.money;

            // Päätä otetaanko kortti
            const player = gameData.status.players.find(p => p.name === "KuronenJohanna");
            const playerMoney = player ? player.money : 0;
            takeCard = (11 < card && card < 19 && money > 1)|| playerMoney < 1 ? true : false;

            gameOn(gameId, takeCard, gameData);


        } else {
            console.log('Peli päättynyt');
            console.log(JSON.stringify(gameData.status.players)) //pelin tulokset
            const playerPoints = gameData.status.players.map(player => {
                const totalPoints = player.cards.reduce((sum, cardList) => {
                    return sum + (Array.isArray(cardList) ? cardList[0] : cardList);
                }, 0);

                return { name: player.name, points: totalPoints-player.money };
                })
        console.log(playerPoints)
        const winnerPoints = playerPoints.reduce((minPlayer, player) => {
            return player.points < minPlayer.points ? player : minPlayer
        }, playerPoints[0])
        console.log('Ja voittaja on', winnerPoints, winnerPoints.name)
        if (gameCount < 70) {
            startGame()
        }}

        // jos haluan laskea pelatut pelit niin tänne laskuri ja startGame funktion kutsu

    } catch (error) {
        console.error('Pelilogiikassa tapahtui virhe', error);
    }
};

module.exports = startGame