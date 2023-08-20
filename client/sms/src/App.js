import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [text, setText] = useState("");

  const [percentage, setPercentage] = useState(null);
  const predictSMS = () => {
    axios.post("http://127.0.0.1:5000/predict", { text }).then((response) => {
      console.log(response);
      setPercentage(response.data.prediction[1] * 100);
      var val = response.data.prediction[1] * 100;
      var bar = document.getElementById("percentageBar");
      const increment = 1;
      let progress = 0;
      const interval = setInterval(() => {
        progress += increment;
        bar.style.width = `${progress}%`;
        if (progress <= 30) {
          bar.className = "progress-bar bg-success ";
        } else if (progress > 30 && progress < 75) {
          bar.className = "progress-bar bg-warning";
        } else {
          bar.className = "progress-bar bg-danger";
        }
        if (progress >= val) {
          clearInterval(interval);
        }
      }, 10);
    });
  };
  return (
    <>
      <div class="mx-auto mt-4">
        <p class="text-center fs-1 text-wrap">
          SMS Spam Detection using Naive Bayes
        </p>
        <form id="sms" className="m-3">
          <div className="mb-3">
            <label className="form-label mb-3">Enter your message</label>
            <div className="form-floating">
              <textarea
                className="form-control border border-secondary"
                id="message"
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={predictSMS}
          >
            Submit
          </button>
        </form>
        <p className="m-3" id="result">
          Spam: {percentage ? percentage : 0}%
        </p>
        <div className="progress m-3">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            aria-valuenow=""
            aria-valuemin="0"
            aria-valuemax="100"
            id="percentageBar"
          ></div>
        </div>
      </div>
    </>
  );
}

export default App;
