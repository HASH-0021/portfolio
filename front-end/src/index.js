import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './index.css';
import App from './containers/App';
import ErrorPage from './containers/ErrorPage';
import Home from './components/Home';
import Works from './components/Works';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path          : "/",
    element       : <App />,
    errorElement  : <ErrorPage />,
    children      : [
                      {
                        index   : true,
                        element : <Home />
                      },
                      {
                        path    : "works",
                        element : <Works />
                      },
                      {
                        path    : "achievements",
                        element : <Achievements />
                      },
                      {
                        path    : "contact",
                        element : <Contact />
                      }
                    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
