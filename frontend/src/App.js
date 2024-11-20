import React from "react";
import Home from "./screens/Home";
import Configure from "./screens/Configure";
import { UtilProvider } from "./contexts/UtilContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Battle from "./screens/Battle";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Battle />,
    },
    {
      path: "/configure",
      element: <Configure/>
    },
    {
      path: "/battle",
      element: <Home/>
    }
  ]);

  return (
    <UtilProvider>
      <RouterProvider router={router}>
        <div className="App">
        </div>
      </RouterProvider>
    </UtilProvider>
  );
}

export default App;
