export const avoidLetterCheck = async (value1, value2, rangeValue, item) => {
  let avoidValue = "";
  if (value1) {
    if (value2) {
      avoidValue = `((?:(?!${value1})${value2}){${rangeValue}})`;
      // settingRegex[index] = value2;
      // setSettingRegex([...settingRegex]);
    } else {
      avoidValue = `((?:(?!${value1}))${item}${rangeValue})`;
    }
  } else {
    if (value2) {
      avoidValue = `${value2}${rangeValue}`;
      // settingRegex[index] = value2;
      // setSettingRegex([...settingRegex]);
    } else {
      avoidValue = `${item}${rangeValue}`;
    }
  }
  return avoidValue;
};
