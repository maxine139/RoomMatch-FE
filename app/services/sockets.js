// Socket.io

import io from 'socket.io-client';

const host = "http://18.222.255.4";

global.socket = null;

export function init() {

  // need user_id
  if (!global.user) {
    return;
  }

  // init
  if (!global.socket) {
    global.socket = io(host);

    global.socket.emit('check-in', global.user._id);

    // Sockets can not be listened to on global.socket.on(...)
    global.socket.on('disconnect', () => {
      global.socket.emit('check-in', global.user._id);
      global.socket.open();
    });
  }
}
