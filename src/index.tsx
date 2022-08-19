import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SessionProvider } from './hooks';
import { Helmet } from 'react-helmet';
import App from './App';
import { Login } from './components/Login';


function Index() {
  return (
      <div>
          <Helmet>
              <title>Shared Library</title>
          </Helmet>
          <SessionProvider>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<App />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="*" element={<h1>Error 404</h1>} />
                  </Routes>
              </BrowserRouter>
          </SessionProvider>
      </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
      <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
