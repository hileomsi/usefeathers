import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

const URL = 'http://localhost:3030';

const socket = io(URL);
const client = feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: window.localStorage
  }));

export default client;