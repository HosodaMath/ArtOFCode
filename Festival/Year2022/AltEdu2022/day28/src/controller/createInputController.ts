export type InputRangeType = {
  type: string;
  min: string;
  max: string;
  defaultValue: string;
  step: string;
};

/**
 * @description
 * @todo ここは別にするおそらくinput系コントローラーとして作成
 * @param inputRangeValue
 * @param selectorsName
 * @returns
 */
export const getInputValue = (
  inputRangeValue: InputRangeType,
  selectorsName: string
) => {
  const selectors = document.querySelector(selectorsName);
  if (!(selectors instanceof HTMLInputElement)) {
    throw new Error("Error");
  }

  selectors.type = inputRangeValue.type;
  selectors.min = inputRangeValue.min;
  selectors.max = inputRangeValue.max;
  selectors.value = inputRangeValue.defaultValue;
  selectors.step = inputRangeValue.step;

  return selectors;
};
