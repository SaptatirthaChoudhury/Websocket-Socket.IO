
const socket = new WebSocket("ws://localhost:1337");

socket.onopen = () => {
  console.log(`WebSocket connected!`);
};

socket.onmessage = (msg) => {
  console.log(`I got a message! ${msg.data}`);
};

socket.onerror = (error) => {
  console.error(`Web Socket error ${error}`);
};

socket.onclose = () => {
  console.log(`Disconnected from the WebSocket server`);
};