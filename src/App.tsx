import { CSSProperties } from "react";
import "./App.css";
import Main from "./components/Main/Main";

const Style: CSSProperties = {
  width: "100vw",
  height: "100vh",
};

function App() {
  return (
    <div className="App" style={Style}>
      <Main></Main>
    </div>
  );
}

export default App;
