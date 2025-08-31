import "./App.scss";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function App() {
  const weaponTypeFlinch = {
    0.75: ["autoRifle", "bow", "submachineGun"],
    0.8: ["machineGun", "pulseRifle", "scoutRifle", "sidearm"],
    0.85: ["handCannon", "traceRifle"],
    0.9: [
      "fusionRifle",
      "grenadeLauncher",
      "linearFusionRifle",
      "shotgun",
      "sniperRifle",
      "rocketLauncher",
    ],
  };

  const [weaponType, setWeaponType] = useState("autoRifle");
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
      weaponType:
        Object.keys(weaponTypeFlinch).find((key) =>
          weaponTypeFlinch[key].includes(e.target.value)
        ),
    }));
  };

  const [stabVal, setStabVal] = useState(0);
  const handleStabChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || /^-?\d+$/.test(inputValue)) {
      setStabVal(inputValue);
      if (/^-?\d+$/.test(inputValue)) {
        setFlinchVals((prev) => ({
          ...prev,
          stab: (Math.max(0,parseInt(inputValue) - 20)) * (1 / 80),
        }));
      }
    }
  };

  const [resultFlinch, setResultFlinch] = useState((0).toFixed(2));

  useEffect(() => {
    const calculateFlinch = () => {
      let tempResultFlinch = 1 - (flinchVals.stab * (1 - flinchVals.weaponType));
      for (const key in flinchVals) {
        if (!["stab","weaponType"].includes(key)) {
          tempResultFlinch *= flinchVals[key];
        }
      }
      console.log("all: ", flinchVals);
      setResultFlinch(Math.max((1 - tempResultFlinch) * 100, 0).toFixed(2));
    };
    calculateFlinch();
  }, [flinchVals]);

  return (
    <div className="main-container">
      <Form.Label className="form-label" htmlFor="weaponType">
        Weapon Type
      </Form.Label>
      <Form.Select
        id="weaponType"
        value={weaponType}
        onChange={handleWeaponTypeChange}
      >
        <option value="autoRifle">Auto Rifle</option>
        <option value="bow">Bow</option>
        <option value="fusionRifle">Fusion Rifle</option>
        <option value="grenadeLauncher">Grenade Launcher</option>
        <option value="handCannon">Hand Cannon</option>
        <option value="linearFusionRifle">Linear Fusion Rifle</option>
        <option value="machineGun">Machine Gun</option>
        <option value="pulseRifle">Pulse Rifle</option>
        <option value="rocketLauncher">Rocket Launcher</option>
        <option value="scoutRifle">Scout Rifle</option>
        <option value="shotgun">Shotgun</option>
        <option value="sidearm">Sidearm</option>
        <option value="sniperRifle">Sniper Rifle</option>
        <option value="submachineGun">Submachine Gun</option>
        <option value="traceRifle">Trace Rifle</option>
      </Form.Select>
      <Form.Label className="form-label" htmlFor="stabVal">
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
      <p>Total flinch reduction {resultFlinch}%</p>
    </div>
  );
}

export default App;
