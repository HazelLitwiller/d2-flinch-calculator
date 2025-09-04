import "./FlinchWiki.scss";
import Accordion from "react-bootstrap/Accordion";

function FlinchWiki() {
  return (
    <div className="main-container">
      <h2>Wiki</h2>
      <Accordion className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How does this calculator work?</Accordion.Header>
          <Accordion.Body>
            Most of the values used in this calculator were taken from the{" "}
            <a
              href="https://www.bungie.net/en/Explore/Detail/News/51250"
              target="_blank"
              rel="noopener noreferrer"
            >
              4/21
            </a>{" "}
            and{" "}
            <a
              href="https://www.bungie.net/en/Explore/Detail/News/51319"
              target="_blank"
              rel="noopener noreferrer"
            >
              5/5
            </a>{" "}
            TWABs. I also referenced the{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Destiny Data Compendium
            </a>
            . When creating the formula for how the stability stat affects flinch, I
            assumed that flinch scales linearly with the stat.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How does flinch work in Destiny 2?</Accordion.Header>
          <Accordion.Body>
            In short, from the 5/5 TWAB, "flinch resistance directly scales the
            angle your aim moves by when you take damage, so if you have 60% flinch
            resistance and you would normally be flinched 10 degrees, you would now
            be flinched 4 degrees". Flinch resistance can also impact the speed at
            which your reticle recenters after being shot.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Flinch factors in Destiny 2</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                Health stat: Gain up to a 10% bonus at 100 health stat (0.1% gained
                per point)
              </li>
              <li>
                Weapon tier (based on stability starting at 20):
                <ul>
                  <li>Tier 1 (Auto Rifle, Bow, Submachine Gun): up to 25%</li>
                  <li>
                    Tier 2 (Machine Gun, Pulse Rifle, Scout Rifle, Sidearm): up to 20%
                  </li>
                  <li>Tier 3 (Hand Cannon, Trace Rifle): up to 15%</li>
                  <li>
                    Tier 4 (Fusion Rifle, Grenade Launcher, Linear Fusion, Shotgun,
                    Sniper Rifle, Rocket Launcher): up to 10%
                  </li>
                </ul>
              </li>
              <li>
                Weapon modifiers:
                <ul>
                  <li>D.A.R.C.I Target Acquired perk: 50%</li>
                  <li>No Distractions perk: 35%</li>
                  <li>Perfect Float perk: 35%</li>
                  <li>Suros Synergy origin trait: 20%</li>
                  <li>Disaster Plan origin trait: 15%</li>
                  <li>Anti-Flinch mod: 15% (enhanced = 20%)</li>
                  <li>Heavy Burst frame: 10%</li>
                </ul>
              </li>
              <li>
                Armor/Class modifiers
                <ul>
                  <li>Unflinching mods: 1 = 25%, 2 = 30%, 3 = 35%</li>
                  <li>Wings of Sacred Dawn: 25%</li>
                  <li>Rally Barricade: 50%</li>
                </ul>
              </li>
              <li>
                Have an unknown/variable impact on flinch
                <ul>
                  <li>A stability value less than 20</li>
                  <li>Built to Blast perk</li>
                  <li>Celerity perk</li>
                  <li>Zen Moment perk</li>
                  <li>Red Death's Inverse Relationship perk</li>
                  <li>Still Hunt's Golden Gun mode</li>
                  <li>Hit by the High-Caliber Rounds mag perk</li>
                  <li>Hit by the Seraph Rounds mag perk</li>
                  <li>Subjugation origin trait</li>
                  <li>Rapid Precision Rifling artifact perk</li>
                  <li>Cyrtarachne's Facade Acrobat's Focus perk</li>
                  <li>Lustrous armor 2 piece set bonus</li>
                  <li>Hit by the Stasis slow effect</li>
                </ul>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Learn more about flinch in Destiny 2</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>
                <a href="https://www.bungie.net/en/Explore/Detail/News/51250" target="_blank" rel="noopener noreferrer">
                  4/21 TWAB
                </a>
              </li>
              <li>
                <a href="https://www.bungie.net/en/Explore/Detail/News/51319" target="_blank" rel="noopener noreferrer">
                  5/5 TWAB
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/spreadsheets/d/1WaxvbLx7UoSZaBqdFr1u32F2uWVLo-CJunJB4nlGUE4/edit" target="_blank" rel="noopener noreferrer">
                  Destiny Data Compendium
                </a>
              </li>
              <li>
                <a href="https://farewelld2.github.io/" target="_blank" rel="noopener noreferrer">
                  Farewell D2: A massive weapon stat breakdown document
                </a>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FlinchWiki;
