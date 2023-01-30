const WebSocket = require('ws');
const { wss } = require('../websocket');

/**
 * 
 * @param {*} collection Collection to monitor
 * @param {*} pipeLine Aggregation Pipeline that change stream will use
 */
exports.monitorListingsUsingEventEmitter = (collection, pipeline = []) => {
    const changeStream = collection.watch(pipeline);
    changeStream.on("change", function (change) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN && change.operationType === 'insert') {
                client.send(JSON.stringify(change));
            }
        });
    });

    return changeStream;
}