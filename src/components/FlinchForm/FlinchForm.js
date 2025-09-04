import "./FlinchForm.scss";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import {
  weaponTypeFlinch,
  weaponTypes,
  unflinchMods,
  flinchModifiers,
} from "../../data/formData.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FlinchForm() {
  const [weaponType, setWeaponType] = useState(weaponTypes[0]);
  const [flinchVals, setFlinchVals] = useState({
    baseWeapon: {
      weaponType: Object.keys(weaponTypeFlinch).find((key) =>
        weaponTypeFlinch[key].includes(weaponType)
      ),
      stab: 0,
    },
    modifiers: {
      noDis: 1,
      perfectFloat: 1,
      darciPerk: 1,
      disasterPlan: 1,
      surosSyn: 1,
      heavyBurst: 1,
      antiFlinch: 1,
      unflinchMod: 1,
      wings: 1,
      rally: 1,
    },
    health: 0,
  });

  const handleWeaponTypeChange = (e) => {
    setWeaponType(e.target.value);
    setFlinchVals((prev) => ({
      ...prev,
      baseWeapon: {
        ...prev.baseWeapon,
        weaponType: Object.keys(weaponTypeFlinch).find((key) =>
          weaponTypeFlinch[key].includes(e.target.value)
        ),
      },
    }));
  };

  const [stabVal, setStabVal] = useState(20);
  const handleStabChange = (e) => {
    const inputValue = e.target.value;
    let resultStab = 0;
    if (inputValue === "") {
      setStabVal(inputValue);
    } else if (/^-?\d+$/.test(inputValue)) {
      let clampedVal = Math.min(parseInt(inputValue), 100);
      setStabVal(clampedVal);
      resultStab = Math.max(0, clampedVal - 20) * (1 / 80);
    }
    setFlinchVals((prev) => ({
      ...prev,
      baseWeapon: {
        ...prev.baseWeapon,
        stab: resultStab,
      },
    }));
  };

  const [noDisVal, setNoDisVal] = useState(false);
  const [perfectFloatVal, setPerfectFloatVal] = useState(false);
  const [darciVal, setDarciVal] = useState(false);
  const [disasterPlanVal, setDisasterPlanVal] = useState(false);
  const [surosSynVal, setSurosSynVal] = useState(false);
  const [heavyBurstVal, setHeavyBurstVal] = useState(false);
  const [antiFlinchVal, setAntiFlinchVal] = useState(false);
  const handleAntiFlinchChange = (e) => {
    setAntiFlinchVal(e.target.value);
    setFlinchVals((prev) => ({
      ...prev,
      modifiers: {
        ...prev.modifiers,
        antiFlinch: unflinchMods.weapon[e.target.value],
      },
    }));
  };

  const [unflinchModsVal, setUnflichModsVal] = useState(0);
  const handleUnflinchModsChange = (e) => {
    setUnflichModsVal(e.target.value);
    setFlinchVals((prev) => ({
      ...prev,
      modifiers: {
        ...prev.modifiers,
        unflinchMod: unflinchMods.armor[e.target.value],
      },
    }));
  };

  const [healthVal, setHealthVal] = useState(0);
  const handleHealthChange = (e) => {
    const inputValue = e.target.value;
    let resultHealth = 0;
    if (inputValue === "") {
      setHealthVal(inputValue);
    } else if (/^-?\d+$/.test(inputValue)) {
      resultHealth = Math.min(parseInt(inputValue), 100);
      setHealthVal(resultHealth);
    }
    setFlinchVals((prev) => ({
      ...prev,
      health: resultHealth,
    }));
  };

  const [wingsVal, setWingsVal] = useState(false);
  const [rallyVal, setRallyVal] = useState(false);

  const stateSetters = {
    noDis: setNoDisVal,
    perfectFloat: setPerfectFloatVal,
    darciPerk: setDarciVal,
    surosSyn: setSurosSynVal,
    disasterPlan: setDisasterPlanVal,
    heavyBurst: setHeavyBurstVal,
    wings: setWingsVal,
    rally: setRallyVal,
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    if (stateSetters[id]) {
      stateSetters[id](checked);
    }

    setFlinchVals((prev) => ({
      ...prev,
      modifiers: {
        ...prev.modifiers,
        [id]: checked ? flinchModifiers[id] : 1,
      },
    }));
  };

  const [resultFlinch, setResultFlinch] = useState((0).toFixed(2));

  useEffect(() => {
    const calculateFlinch = () => {
      let tempResultFlinch =
        (1 -
          flinchVals.baseWeapon.stab * (1 - flinchVals.baseWeapon.weaponType)) *
        (1 - flinchVals.health * 0.001);
      console.log("base: ", tempResultFlinch);
      for (const value of Object.values(flinchVals.modifiers)) {
        tempResultFlinch *= value;
      }
      console.log("all: ", flinchVals);
      setResultFlinch(
        Math.min(Math.max((1 - tempResultFlinch) * 100, 0), 100).toFixed(2)
      );
    };
    calculateFlinch();
  }, [flinchVals]);

  return (
    <>
      <Container>
        <Form className="form">
          <Row className="justify-content-md-center gx-5">
            <Col md="auto">
              <p className="form-header text-primary">Weapon Stats</p>
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
            </Col>
            <Col md="auto">
              <p className="form-header text-primary">Weapon Modifiers</p>
              <Form.Label className="text-secondary">Perks</Form.Label>
              <Form.Check
                id="noDis"
                type="checkbox"
                checked={noDisVal}
                label="No Distractions"
                onChange={handleCheckboxChange}
                className="form-indent"
              />
              <Form.Check
                id="perfectFloat"
                type="checkbox"
                checked={perfectFloatVal}
                label="Perfect Float"
                onChange={handleCheckboxChange}
                className="form-indent"
              />
              <Form.Check
                id="darciPerk"
                type="checkbox"
                checked={darciVal}
                label="D.A.R.C.I. Target Acquired"
                onChange={handleCheckboxChange}
                className="form-indent"
              />
              <Form.Label className="form-item text-secondary">
                Origin Traits
              </Form.Label>
              <Form.Check
                id="disasterPlan"
                type="checkbox"
                checked={disasterPlanVal}
                label="Disaster Plan"
                onChange={handleCheckboxChange}
                className="form-indent"
              />
              <Form.Check
                id="surosSyn"
                type="checkbox"
                checked={surosSynVal}
                label="Suros Synergy"
                onChange={handleCheckboxChange}
                className="form-indent"
              />
              <Form.Label className="form-item text-secondary">
                Frames/Mods
              </Form.Label>
              <Form.Check
                id="heavyBurst"
                type="checkbox"
                checked={heavyBurstVal}
                label="Heavy 
                    Burst frame"
                onChange={handleCheckboxChange}
                className="form-indent"
              />
              <Form.Label
                className="form-item form-indent"
                htmlFor="antiFlinch"
              >
                Anti-Flinch mods
              </Form.Label>
              <Form.Select
                id="antiFlinch"
                value={antiFlinchVal}
                onChange={handleAntiFlinchChange}
                className="form-indent"
              >
                {Object.keys(unflinchMods.weapon).map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md="auto">
              <p className="form-header text-primary">Armor/Class Modifiers</p>
              <Form.Label htmlFor="healthVal">Health stat</Form.Label>
              <Form.Control
                type="text"
                id="healthVal"
                value={healthVal}
                min={0}
                max={100}
                onChange={handleHealthChange}
              />

              <Form.Label className="form-item" htmlFor="unflinchMods">
                Unflinching mods
              </Form.Label>
              <Form.Select
                id="unflinchMods"
                value={unflinchModsVal}
                onChange={handleUnflinchModsChange}
              >
                {Object.keys(unflinchMods.armor).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Form.Select>
              <Form.Check
                id="wings"
                className="form-item"
                type="checkbox"
                checked={wingsVal}
                label="Wings of Sacred Dawn"
                onChange={handleCheckboxChange}
              />
              <Form.Check
                id="rally"
                type="checkbox"
                checked={rallyVal}
                label="Rally Barricade"
                onChange={handleCheckboxChange}
              />
            </Col>
          </Row>
        </Form>
      </Container>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <h3
          style={{
            marginTop: "50px",
            width: "fit-content",
            border: "1px solid #008CBA",
            padding: "15px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          Total flinch reduction: {resultFlinch}%
        </h3>
      </div>
    </>
  );
}

export default FlinchForm;
