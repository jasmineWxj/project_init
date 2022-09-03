import './index.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
// 热更新
if (module && module.hot) {
    module.hot.accept();
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<div></div>);
