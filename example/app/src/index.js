import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ExampleUseAuthenticate';

import useFeathers from './useFeathers';
import Feathers from './feathers';

useFeathers(Feathers);

ReactDOM.render(<App />, document.getElementById('root'));
