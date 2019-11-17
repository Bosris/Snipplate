import React from 'react';
import { Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './components/App.jsx';
import history from './history.jsx'

ReactDOM.render(
<Router history={history}><App /></Router>,
document.getElementById('root'))