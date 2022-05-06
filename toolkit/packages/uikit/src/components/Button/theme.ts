import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    height: "48px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "40px",
    padding: "0 12px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};
export const scaleVariants_MD = {
  [scales.MD]: {
    height: "36px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "30px",
    padding: "0 12px",
  },
  [scales.XS]: {
    height: "22px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "primary",
    color: "btnTextColor",
  },
  [variants.SECONDARY]: {
    backgroundColor: "cardBackground",
    border: "1px solid",
    borderColor: "primary",
    color: "primary",
    // ":disabled": {
    //   backgroundColor: "transparent",
    // },
  },
  [variants.TERTIARY]: {
    backgroundColor: "tertiary",
    boxShadow: "none",
    color: "primary",
    border: "1px solid",
    borderColor: "primary",
  },
  [variants.SUBTLE]: {
    backgroundColor: "btnBgSecondaryColor",
    color: "primary",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "btnTextColor",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "btnTextColor",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    // border: "1px solid",
    // borderColor: "primary",
    // boxShadow: "none",
    color: "primaryDark",
  },
};
