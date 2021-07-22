import "./App.css";
import useTensorFlow from "./hooks/useTensorFlow";
import commentTraining from "./constants/comment-training";
import commentTesting from "./constants/comment-testing";

const App = () => {
  const { analyze, isAnalyzing, analyzeError, result } =
    useTensorFlow(commentTraining);

  return (
    <div className="App">
      <h1>TensorFlow Tests</h1>
      <form onSubmit={handleAnalyze}>
        <button>Analyse</button>
      </form>
    </div>
  );

  function handleAnalyze(e) {
    e.preventDefault();
    analyze(commentTesting);
  }
};

export default App;
