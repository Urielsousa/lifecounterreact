import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*import React from "react";
import ReactDOM from "react-dom/client";

function Teste() {
  return (
    <div style={{ color: "white", background: "black", height: "100vh" }}>
      FUNCIONANDO
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Teste />
  </React.StrictMode>,
);*/
