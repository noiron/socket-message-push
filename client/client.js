// 此处路径应根据服务器进行设置
const listenUrl = 'http://localhost:4001';

const msgSocket = io(listenUrl, {
    'reconnectionAttempts': 10,     // 限制对于 socket 服务器的重连次数为10次
});

const name = prompt("Please enter your name", "Jon Snow");
const tokenId = prompt("Please enter your tokenId", "1");
const userId = Math.floor(Math.random().toFixed(4) * 10000);

msgSocket.on('connect', () => {
    msgSocket.emit('user_login', {
        userId,
        socketId: msgSocket.id,
        tokenId
    });
});

msgSocket.on('receive_message', function (msg) {
    console.log('Here is message we got in client:', msg);
});