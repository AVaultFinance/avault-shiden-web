import { Colors } from "./types";

export const baseColors = {
  primary: "#1476FF",
  primaryBright: "#53DEE9",
  primaryDark: "#CC64F2",
  secondary: "#25234C",
  failure: "#E6007A",
  success: "#31DAB1",
  warning: "#EE9F45",
};

export const tooltipColors = {
  background: "#181733",
  borderColor: "#2E2D5B",
};

export const additionalColors = {
  binance: "#F0B90B",
  overlay: "#000000",
  gold: "#FFC700",
  silver: "#B2B2B2",
  bronze: "#E7974D",
};
export const lightColors: Colors = {
  ...baseColors,
  ...additionalColors,
  tooltipColors,
  background: "#030222",
  background02: "#030222",
  backgroundDisabled: "#37365E",
  backgroundAlt: "#181733",
  cardBorder: "#2E2D5B",
  cardBackground: "#181733",
  contrast: "#181733",
  dropdown: "#1E1D20",
  dropdownDeep: "#100C18",
  invertedContrast: "#191326",
  input: "#030222",
  inputSecondary: "#2E2D5B",
  tertiary: "#030222",
  text: "#FFFFFF",
  textDisabled: "#37365E",
  textSubtle: "#6A6991",
  textSubSubtle: "#C2C2C2",
  disabled: "#524B63",
  btnTextColor: "#F7F3F6",
  btnBgSecondaryColor: "#201F43",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
    cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
    blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
    violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
    violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
  borderColor: "#19183E",
};
export const darkColors = lightColors;
