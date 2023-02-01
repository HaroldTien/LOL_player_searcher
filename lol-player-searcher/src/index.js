import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SummonerProfile from './pages/summonerProfile';
import AiBP from './pages/aiBP.js'
import ErrorPage from './pages/ErrorPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/aiBP",
    element:<AiBP />
  },
  {
    path:'/summonerProfile',
    element:<SummonerProfile/>
  },
  {
    path:"/ErrorPage",
    element: <ErrorPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
