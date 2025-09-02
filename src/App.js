import "./App.scss";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { weaponTypeFlinch, weaponTypes, unflinchMods } from "./data/formData";

function App() {
  const [weaponType, setWeaponType] = useState(weaponTypes[0]);
  const [flinchVals, setFlinchVals] = useState({
    weaponType: Object.keys(weaponTypeFlinch).find((key) =>
      weaponTypeFlinch[key].includes(weaponType)
    ),
    stab: 0,
    noDS: 1,
    surosSyn: 1,
    unflinchMod: 1,
    wings: 1,
    rally: 1,
  });

  const handleWeaponTypeChange = (e) => {
    setWeaponType(e.target.value);
    setFlinchVals((prev) => ({
      ...prev,
      weaponType: Object.keys(weaponTypeFlinch).find((key) =>
        weaponTypeFlinch[key].includes(e.target.value)
      ),
    }));
  };

  const [stabVal, setStabVal] = useState(20);
  const handleStabChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setStabVal(inputValue);
    } else if (/^-?\d+$/.test(inputValue)) {
      let clampedVal = Math.min(parseInt(inputValue), 100);
      setStabVal(clampedVal);
      setFlinchVals((prev) => ({
        ...prev,
        stab: Math.max(0, parseInt(clampedVal) - 20) * (1 / 80),
      }));
    }
  };

  const [noDisVal, setNoDisVal] = useState(false);
  const handleNoDisChange = (e) => {
    setNoDisVal(e.target.checked);
    setFlinchVals((prev) => ({
      ...prev,
      noDS: e.target.checked ? 0.65 : 1,
    }));
  };

  const [surosSynVal, setSurosSynVal] = useState(false);
  const handleSurosSynChange = (e) => {
    setSurosSynVal(e.target.checked);
    setFlinchVals((prev) => ({
      ...prev,
      surosSyn: e.target.checked ? 0.8 : 1,
    }));
  };

  const [unflinchModsVal, setUnflichModsVal] = useState(0);
  const handleUnflinchModsChange = (e) => {
    setUnflichModsVal(e.target.value);
    setFlinchVals((prev) => ({
      ...prev,
      unflinchMod: unflinchMods[e.target.value],
    }));
  };

  const [wingsVal, setWingsVal] = useState(false);
  const handleWingsChange = (e) => {
    setWingsVal(e.target.checked);
    setFlinchVals((prev) => ({
      ...prev,
      wings: e.target.checked ? 0.75 : 1,
    }));
  };

  const [rallyVal, setRallyVal] = useState(false);
  const handleRallyChange = (e) => {
    setRallyVal(e.target.checked);
    setFlinchVals((prev) => ({
      ...prev,
      rally: e.target.checked ? 0.5 : 1,
    }));
  };

  const [resultFlinch, setResultFlinch] = useState((0).toFixed(2));

  useEffect(() => {
    const calculateFlinch = () => {
      let tempResultFlinch = 1 - flinchVals.stab * (1 - flinchVals.weaponType);
      console.log("base: ", tempResultFlinch);
      for (const key in flinchVals) {
        if (!["stab", "weaponType"].includes(key)) {
          tempResultFlinch *= flinchVals[key];
        }
      }
      console.log("all: ", flinchVals);
      setResultFlinch(
        Math.min(Math.max((1 - tempResultFlinch) * 100, 0), 100).toFixed(2)
      );
    };
    calculateFlinch();
  }, [flinchVals]);

  return (
    <div className="main-container">
      <h2
        style={{
          backgroundImage: "linear-gradient(#f3969a,#78c2ad)",
          color: "transparent",
          backgroundClip: "text",
        }}
      >
        Destiny 2 Flinch Calculator
      </h2>
      <Form className="form">
        <p className="form-header">Weapon Stats</p>
        <Form.Label htmlFor="weaponType">Weapon Type</Form.Label>
        <Form.Select
          id="weaponType"
          value={weaponType}
          onChange={handleWeaponTypeChange}
        >
          {weaponTypes.map((type) => (
            <option key={type} value={type}>
              {type.replace(/([A-Z])/g, " $1").trim()}
            </option>
          ))}
        </Form.Select>
        <Form.Label className="form-item" htmlFor="stabVal">
          Stability
        </Form.Label>
        <Form.Control
          type="text"
          id="stabVal"
          value={stabVal}
          min={0}
          max={100}
          onChange={handleStabChange}
        />

        <p className="form-header">Weapon Modifiers</p>
        <Form.Check
          type="checkbox"
          checked={noDisVal}
          label="No distractions"
          onChange={handleNoDisChange}
        />
        <Form.Check
          type="checkbox"
          checked={surosSynVal}
          label="Suros synergy"
          onChange={handleSurosSynChange}
        />

        <p className="form-header">Armor/Class Modifiers</p>
        <Form.Label htmlFor="unflinchMods">Unflinching mods</Form.Label>
        <Form.Select
          id="unflinchMods"
          value={unflinchModsVal}
          onChange={handleUnflinchModsChange}
        >
          {Object.keys(unflinchMods).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </Form.Select>
        <Form.Check
          className="form-item"
          type="checkbox"
          checked={wingsVal}
          label="Wings of sacred dawn"
          onChange={handleWingsChange}
        />
        <Form.Check
          type="checkbox"
          checked={rallyVal}
          label="Rally barricade"
          onChange={handleRallyChange}
        />
      </Form>

      <h3
        style={{
          marginTop: "30px",
          padding: "15px 0",
          float: "left",
          width: "fit-content",
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(to right, #f3969a,#78c2ad) border-box",
        }}
      >
        Total flinch reduction: {resultFlinch}%
      </h3>
    </div>
  );
}

export default App;
