import React from "react";
import "./App.css";
import { Comments } from "./components/comment-box";

function App() {
  return (
    <div className="App">
      <Comments currentUserId="1" />
    </div>
  );
}

export default App;
