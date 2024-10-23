import React from "react";
import Home from "./screens/Home";
import Configure from "./screens/Configure";
import { UtilProvider } from "./contexts/UtilContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/configure",
      element: <Configure/>
    }
  ]);
  return (
    <UtilProvider>
      <RouterProvider router={router}>
        <div className="App">
          <Configure />
        </div>
      </RouterProvider>
    </UtilProvider>
  );
}

export default App;
