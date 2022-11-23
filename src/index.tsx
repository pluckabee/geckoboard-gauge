import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import { fetchGaugeData } from './services/gaugeDataService' 

import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => fetchGaugeData(),
    element: <App />,
    errorElement: <div>Error: Refresh to try again</div>,
    id: "app",
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

