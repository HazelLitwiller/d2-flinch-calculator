export const weaponTypeFlinch = {
  0.75: ["AutoRifle", "Bow", "SubmachineGun"],
  0.8: ["MachineGun", "PulseRifle", "ScoutRifle", "Sidearm"],
  0.85: ["HandCannon", "TraceRifle"],
  0.9: [
    "FusionRifle",
    "GrenadeLauncher",
    "LinearFusionRifle",
    "Shotgun",
    "SniperRifle",
    "RocketLauncher",
  ],
};
export const weaponTypes = Object.values(weaponTypeFlinch).flat();
export const unflinchMods = {
  armor: {
    0: 1,
    1: 0.75,
    2: 0.7,
    3: 0.65,
  },
  weapon: {
    none: 1,
    standard: 0.85,
    enhanced: 0.8,
  },
};
export const flinchModifiers = {
  noDis: 0.65,
  perfectFloat: 0.65,
  darciPerk: 0.5,
  disasterPlan: 0.85,
  surosSyn: 0.8,
  heavyBurst: 0.9,
  wings: 0.75,
  rally: 0.5,
};
