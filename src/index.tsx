// const root = document.querySelector('#root');
// import aaa from './img/text.png';
// import xcc from './font/Gilroy-Medium-2.otf';
import './index.less';
// console.log(aaa, xcc);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dev from './dev';
import Header from '@/Header';
// 热更新
if (module && module.hot) {
    module.hot.accept();
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
        <Dev name="vortesnail" age={25} />
        <Header />
    </React.StrictMode>,
);
