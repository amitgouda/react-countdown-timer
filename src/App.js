import "./App.css";
import Timer from "./Timer";

function App() {
  const onComplete = () => {
    alert('completed')
  }
  return (
    <div className="App">
      <Timer
      initialTime={1200000}
      onComplete={onComplete}
      >
        {({ noOfDays, noOfHours, noOfMins, noOfSecs }) => {
          return (
            <div>
              {`day ${noOfDays}    noOfHours ${noOfHours}    noOfMins ${noOfMins}    noOfSecs ${noOfSecs}`}
            </div>
          );
        }}
      </Timer>
    </div>
  );
}

export default App;
