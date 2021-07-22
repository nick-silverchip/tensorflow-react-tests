import { useState } from "react";
import "./App.css";
import useTensorFlow from "./hooks/useTensorFlow";
import commentTraining from "./constants/comment-training";
import commentTesting from "./constants/comment-testing";

const App = () => {
  const { analyze, isAnalyzing, analyzeError, result } =
    useTensorFlow(commentTraining);
  const [textInput, setTextInput] = useState("");

  return (
    <div className="App">
      <h1>TensorFlow Tests</h1>
      <form onSubmit={handleAnalyze}>
        <input
          type="text"
          value={textInput}
          onChange={({ target: { value } }) => setTextInput(value)}
        />
        <button>Analyse</button>
      </form>
    </div>
  );

  function handleAnalyze(e) {
    e.preventDefault();
    analyze([{ text: textInput }]);
  }
};

export default App;
