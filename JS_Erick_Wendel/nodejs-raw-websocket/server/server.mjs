import { createServer } from "http";
import crypto from "crypto";

const PORT = 1337;
const WEBSOCKET_MAGIC_STRING_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const SEVEN_BITS_INTEGER_MARKER = 125;
const SIXTEEN_BITS_INTEGER_MARKER = 126;
const SIXTYFOUR_BITS_INTEGER_MARKER = 127;

// parseInt()

const server = createServer((request, response) => {

    response.writeHead(200);
    response.end("hey there");
})
    .listen(PORT, () => console.log(`server listening to ${PORT}`));

server.on("upgrade", onSocketUpgrade);

function onSocketUpgrade(req, socket, head) {

    const { "sec-websocket-key": webClientSocketKey } = req.headers;
    console.log(`${webClientSocketKey} connected!`);
    const headers = prepareHandShakeHeaders(webClientSocketKey);

    socket.write(headers)
    socket.on('readble', () => onSocketReadable(socket))
}

function onSocketReadable(socket) {
    // consume 
}

function prepareHandShakeHeaders(id) {

    const acceptKey = createSocketAccept(id);
    console.log(acceptKey);

    const headers = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Accept: ${acceptKey}`,
        "\r\n",
    ].join("\r\n");

    return headers;
}

function createSocketAccept(id) {

    const hashed = crypto.createHash("sha1");
    hashed.update(id + WEBSOCKET_MAGIC_STRING_KEY);
    return hashed.digest("base64");
}

// error handling to keep the server on
["uncaughtException", "unhandledRejection"].forEach((event) =>
    process.on(event, (err) => {
        console.error(
            `something bad happened! event: ${event}, msg: ${err.stack || err}`
        );
    })
);
