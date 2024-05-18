import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PeopleZone from './components/people_zone/people_zone.jsx'
import Favourite from './components/favourite/favourite.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PeopleZone />,
  },
  {
    path: "/people_zone",
    element: <PeopleZone />,
  },
  {
    path: "/favourite",
    element: <Favourite />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)