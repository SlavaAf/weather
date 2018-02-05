import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
// import App from './default/App';
import Header from './page/Header';
import Main from './page/Main';
import Footer from './page/Footer';
import registerServiceWorker from './registerServiceWorker';


const App = () => [
    <Header key="header" />,
    <Main key="main" />,
    <Footer key="footer" />
]

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();
