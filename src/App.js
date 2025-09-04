import "./App.scss";
import FlinchForm from "./components/FlinchForm/FlinchForm";

function App() {
  return (
    <div className="main-container">
      <h2>
        Destiny 2 Flinch Calculator
        <span style={{ fontSize: "20px" }}> by Hazel</span>
      </h2>
      <FlinchForm />
    </div>
  );
}

export default App;
