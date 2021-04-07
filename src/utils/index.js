export * as challenge from "./challenge";
export * as icon from "./icon";
export * as menu from "./menu";
export * as tag from "./tag";
export * as url from "./url";
export * as pagination from "./pagination";

export function createDropdownOptions(values, selectedValue) {
  return values.map((value) => ({
    label: `${value}`,
    selected: !!selectedValue && selectedValue === value,
  }));
}

/* Return single selected dropdown option*/
export function getSelectedDropdownOption(options) {
  return options.find((o) => o.selected);
}

/* Return multiple selected dropdown options */
export function getSelectedDropdownOptions(options) {
  return options.filter((o) => o.selected);
}

/* Set single selected dropdown option */
export function setSelectedDropdownOption(options, selectedValue) {
  options.forEach((o) => (o.selected = false));

  const option = options.find((option) => option.label === selectedValue);
  if (option) {
    option.selected = true;
  }
}

/* Set multiple selected dropdown options */
export function setSelectedDropdownOptions(options, selectedValues) {
  options.forEach((o) => (o.selected = false));

  selectedValues.forEach((value) => {
    const option = options.find((option) => option.label === value);
    if (option) {
      option.selected = true;
    }
  });
}

export function createDropdownTermOptions(values, selectedValues) {
  return values.map((value) => ({
    label: `${value}`,
    selected: !!selectedValues && selectedValues.includes[value],
  }));
}

/* Return selected dropdown term options */
export function getSelectedDropdownTermsOptions(options) {
  return options.filter((o) => o.selected);
}

/* Set selected dropdown term options */
export function setSelectedDropdownTermOptions(options, selectedValues) {
  options.forEach((o) => (o.selected = false));

  selectedValues.forEach((value) => {
    const option = options.find((option) => option.label === value);
    if (option) {
      option.selected = true;
    }
  });
}

/**
 * Return an array of options.
 *
 * @param values {Array<String>} Input values
 * @param selectedValue {String} Selected value
 * @return {Array<{label: String, value: Boolean}>} Radio options
 */
export function createRadioOptions(values, selectedValue) {
  return values.map((value) => ({
    label: `${value}`,
    value: selectedValue && selectedValue === value,
  }));
}

export function getSelectedRadioOption(options) {
  return options.find((o) => o.value);
}

export function getSortByLabel(SORT_BY, value) {
  const options = Object.keys(SORT_BY).filter((key) => SORT_BY[key] === value);
  if (options.length) {
    return options[0];
  }
}

/**
 * Set the option of `selectedValue` as checked.
 *
 * @param options {Array<{label: String, value: Boolean}>} Radio options
 * @param selectedValue {String} Selected option label.
 */
export function setSelectedRadioOption(options, selectedValue) {
  options.forEach((o) => (o.value = false));

  const option = options.find((option) => option.label === selectedValue);
  if (option) {
    option.value = true;
  }
}

/**
 * Format a number value into the integer text of money value.
 * Ex: 1800 -> $1,800
 */
export function formatMoneyValue(value) {
  let val = value || 0;
  val = val.toLocaleString("en-US");

  const i = val.indexOf(".");
  if (i !== -1) {
    val = val.slice(0, i);
  }

  if (val.startsWith("-")) {
    val = `-\uFF04${val.slice(1)}`;
  } else {
    val = `\uFF04${val}`;
  }

  return val;
}

/**
 * Format a number value into the integer text of amount.
 * Ex: 0 -> 0, greater than 10000 -> 10,000+
 */
export function formatPrizeAmount(value) {
  let val = value || 0;
  let greaterThan10000 = val >= 10000;

  val = val.toLocaleString("en-US");

  const i = val.indexOf(".");
  if (i !== -1) {
    val = val.slice(0, i);
  }

  val = greaterThan10000 ? "10,000+" : val;

  return val;
}

export function parsePrizeAmountText(s) {
  let val = s;
  if (val.endsWith("+")) {
    val = val.slice(0, val.length - 1);
  }

  const i = val.indexOf(".");
  if (i !== -1) {
    val = val.slice(0, i);
  }

  val = val.replace("/,/g", "");
  val = parseInt(val);

  return isNaN(val) ? 0 : val;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
