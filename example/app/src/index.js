import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ExampleUseRemove02';

import useFeathers from './useFeathers';
import Feathers from './feathers';

useFeathers(Feathers);

ReactDOM.render(<App />, document.getElementById('root'));
