const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Web socket connected successfuly on port 8080.')
});

module.exports.wss = wss;