import codes from "country-calling-code";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import * as constants from "../constants";

countries.registerLocale(enLocale);

export { countries };

export function isPassedPhase(allPhases, currentPhase, checkPhase) {
  const currentPhaseIndex = allPhases.indexOf(currentPhase);
  const checkPhaseIndex = allPhases.indexOf(checkPhase);

  return checkPhaseIndex < currentPhaseIndex;
}

export function isFirstPhase(checkPhase) {
  return checkPhase === constants.MY_GIG_PHASE.APPLIED;
}

export function isLastPhase(checkPhase) {
  return checkPhase === constants.MY_GIG_PHASE.PLACED;
}

export function createTextImage(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 80;
  canvas.height = 80;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#2C95D7";
  ctx.fillRect(0, 0, 80, 80);
  ctx.fillStyle = "#fff";
  ctx.font = "500 24px Roboto san-serif";
  ctx.textAlign = "center";
  ctx.fillText(text, 40, 48);

  return canvas.toDataURL();
}

function validateTextRequired(value) {
  value = (value || "").trim();

  if (!value) return "Required field";
  if (value.length < 2) return "Must be at least 2 characters";
  if (value.length > 50) return "Must be max 50 characters";

  return null;
}

export function validateCity(value) {
  return validateTextRequired(value);
}

export function validatePhone(phoneNumber, country) {
  let error = validateTextRequired(phoneNumber);
  if (error) {
    return error;
  }

  phoneNumber = phoneNumber.trim();

  const code = codes.find((i) => i.isoCode3 === country);
  let regionCode = "";
  if (code) {
    regionCode = `+${code.countryCodes[0]}`;
    error = !phoneNumber.startsWith(regionCode) && "Invalid country code";
  }
  if (!error) {
    const regexValidCharacters = /[\s0-9+-\.()]/g;
    error =
      phoneNumber.replace(regexValidCharacters, "") !== "" &&
      "Invalid phone number";
  }

  if (!error) {
    const regexSeparateCharacters = /[\s-\.()]/g;
    const numberLen = phoneNumber
      .replace(regionCode, "")
      .replace(regexSeparateCharacters, "").length;
    error = (numberLen < 9 || numberLen > 11) && "Invalid phone number";
  }

  if (!error) {
    const regexGroupCharacters = /[-\.()]/g;
    const groups = phoneNumber
      .replace(regionCode, "")
      .replace(regexGroupCharacters, " ")
      .trim()
      .split(/\s+/);
    error = groups.length > 3 && "Invalid phone format";
  }

  return error ? error : null;
}
