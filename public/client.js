/**
 * This script file should be added to client's html file
 */

// 此处路径应根据服务器进行设置
const listenUrl = 'http://localhost:4001';

var socket = io(listenUrl);

socket.on('receive_message', function (msg) {
    console.log('Here is message we got in client:', msg);
});