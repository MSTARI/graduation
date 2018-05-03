import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './pages/App';
import 'normalize.css';
import './index.scss';

ReactDOM.render(
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);