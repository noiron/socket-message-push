const express = require('express');
const router = express.Router();
const { getSocketId } = require('./../utils');

router.use(function timeLog(req, res, next) {
    const m = new Date();
    const dateString = `${m.getFullYear()}/${m.getMonth() +
        1}/${m.getDate()}  ${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
    console.log('Time: ', dateString);
    next();
});

router.post('/api', function(req, res) {
    if (process.env.NODE_ENV === 'development') {
        console.log("----------------- this is req's body -----------------");
        console.log(req.body);
        console.log('------------------------------------------------------\n');
    }

    const { tokens = [], entityType = '', data = {} } = req.body;
    tokens.forEach(tokenId => {
        const socketIds = getSocketId(users, tokenId);

        // 当后端post了一个消息时，通知client进行处理
        socketIds.forEach(function(socketId) {
            io.sockets.to(socketId).emit('receive_message', {
                entityType,
                data
            });
        });
    });

    res.send({
        responseCode: 000,
        data: 'OK!'
    });
});

module.exports = router;
