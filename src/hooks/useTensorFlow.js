import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

const useTensorFlow = (trainingData) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyseError] = useState(null);
  const [result, setResult] = useState([]);

  const model = tf.sequential();
  // Add layers to the model
  model.add(
    tf.layers.dense({
      inputShape: [512],
      activation: "sigmoid",
      units: 2,
    })
  );
  model.add(
    tf.layers.dense({
      inputShape: [2],
      activation: "sigmoid",
      units: 2,
    })
  );
  model.add(
    tf.layers.dense({
      inputShape: [2],
      activation: "sigmoid",
      units: 2,
    })
  );
  // Compile the model
  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(0.06), // This is a standard compile config
  });

  const encodeData = (data) => {
    const sentences = data.map((comment) => comment.text.toLowerCase());
    const trainingData = use
      .load()
      .then((model) => {
        return model.embed(sentences).then((embeddings) => {
          return embeddings;
        });
      })
      .catch((err) => console.error("Fit Error:", err));

    return trainingData;
  };

  const outputData = tf.tensor2d(
    trainingData.map((datum) => [
      datum.intent === "buy" ? 1 : 0,
      datum.intent === "none" ? 1 : 0,
    ])
  ); // Output: [1,0] or [0,1]

  const analyze = async (testingData) => {
    console.log("Analyzing...");

    setIsAnalyzing(true);
    setAnalyseError(null);

    try {
      const training_data = await encodeData(trainingData);
      const testing_data = await encodeData(testingData);

      await model.fit(training_data, outputData, { epochs: 200 });

      const data = await model.predict(testing_data).array();
      console.log("Success");
      console.log({ data });

      const formattedData = testingData.map((datum, i) => {
        return {
          ...datum,
          result: data[i],
        };
      });
      console.log({ formattedData });

      setIsAnalyzing(false);
      setResult(formattedData);
    } catch (err) {
      console.log("Catch Err:", err);

      setIsAnalyzing(false);
      setAnalyseError(err);
    }
  };

  return { analyze, isAnalyzing, analyzeError, result };
};
export default useTensorFlow;
