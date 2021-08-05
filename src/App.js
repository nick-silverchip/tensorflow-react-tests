import "./App.css";
import useTensorFlow from "./hooks/useTensorFlow";
import trainingData from "./constants/";
import SearchForm from "./SearchForm";

const App = () => {
  const { analyze, isAnalyzing, analyzeError, result } =
    useTensorFlow(trainingData);

  return (
    <div className="App">
      <h1>TensorFlow Tests</h1>
      <div className="result-diagram">
        {!isAnalyzing && (
          <>
            <div className="col" style={{ borderRight: "1px solid" }}>
              <div className="graphic">
                <div
                  className="colorbar"
                  style={{ height: `${result[0]?.result[0] * 100}%` }}
                />
              </div>
              <div className="label">Food</div>
              <div className="label">{`${
                !!result[0]?.result[0]
                  ? (result[0]?.result[0] * 100).toFixed(1)
                  : 0
              }%`}</div>
            </div>
            <div className="col" style={{ borderRight: "1px solid" }}>
              <div className="graphic">
                <div
                  className="colorbar"
                  style={{ height: `${result[0]?.result[1] * 100}%` }}
                />
              </div>
              <div className="label">Joke</div>
              <div className="label">{`${
                !!result[0]?.result[1]
                  ? (result[0]?.result[1] * 100).toFixed(1)
                  : 0
              }%`}</div>
            </div>
            <div className="col" style={{ borderRight: "1px solid" }}>
              <div className="graphic">
                <div
                  className="colorbar"
                  style={{ height: `${result[0]?.result[2] * 100}%` }}
                />
              </div>
              <div className="label">Question</div>
              <div className="label">{`${
                !!result[0]?.result[2]
                  ? (result[0]?.result[2] * 100).toFixed(1)
                  : 0
              }%`}</div>
            </div>
            <div className="col">
              <div className="graphic">
                <div
                  className="colorbar"
                  style={{ height: `${result[0]?.result[3] * 100}%` }}
                />
              </div>
              <div className="label">Compliment</div>
              <div className="label">{`${
                !!result[0]?.result[3]
                  ? (result[0]?.result[3] * 100).toFixed(1)
                  : 0
              }%`}</div>
            </div>
          </>
        )}
        {isAnalyzing && (
          <div className="loading">
            <span>Analyzing...</span>
          </div>
        )}
        {analyzeError && (
          <div className="loading">
            <span>{analyzeError}</span>
          </div>
        )}
      </div>
      <SearchForm handleSubmit={handleAnalyze} />
    </div>
  );

  function handleAnalyze(text) {
    analyze([{ text }]);
  }
};

export default App;
