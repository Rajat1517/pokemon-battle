import React from "react";
import Home from "./screens/Home";
import { UtilProvider } from "./contexts/UtilContext";
import "./App.css"
function App() {
  return (
    <UtilProvider>
      <div className="App">
        <Home />
      </div>
    </UtilProvider>
  );
}

export default App;
