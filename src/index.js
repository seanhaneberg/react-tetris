import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

var specialOnKeyUp = function(e) {
    console.log("woooooooo!!!\n\n\n!");
}

ReactDOM.render(<App onKeyUp={specialOnKeyUp}/>, document.getElementById('root'));
registerServiceWorker();
