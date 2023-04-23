import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import App from '@layouts/app';

const container = document.getElementById('app') as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

// pages - 서비스 페이지
// components - 짜잘 컴포넌트
// layouts - 공통 레이아웃
