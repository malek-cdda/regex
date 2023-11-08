export const avoidLetterCheck = async (
  value1,
  value2,
  rangeValue,
  item,
  conditionValue
) => {
  let filters = "";
  let avoidValue = "";
  console.log(conditionValue);
  if (conditionValue !== undefined) {
    const filterCondtion = [...conditionValue].map((item) => {
      if (item === conditionValue[0]) {
        return "";
      }
      if (item === conditionValue[conditionValue.length - 1]) {
        return "";
      } else {
        return item;
      }
    });
    filters = filterCondtion.filter((item) => item !== "").join("");
    console.log("^", filters);
  }
  if (value1) {
    if (value2 && conditionValue) {
      console.log(filters[0]);
      avoidValue = `(?![${"^" + filters[0]}]${
        "*" + value1
      })${item}${rangeValue}`;
      //   settingRegex[index] = value2;
      //   setSettingRegex([...settingRegex]);
    } else {
      avoidValue = `(?![${"^" + filters[0]}]${
        "*" + value1
      })${item}${rangeValue}`;
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
