import "./App.scss";
import FlinchForm from "./components/FlinchForm/FlinchForm";
import FlinchWiki from "./components/FlinchWiki/FlinchWIki";

function App() {
  return (
    <>
      <h2 style={{ padding: "20px 20px 0 20px", marginBottom:"-5px" }}>
        Destiny 2 Flinch Calculator
        <span style={{ fontSize: "20px" }}> by Hazel</span>
      </h2>
      <FlinchForm />
      <FlinchWiki/>
    </>
  );
}

export default App;
