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
    0: 1,
    1: 0.75,
    2: 0.70,
    3: 0.65
}