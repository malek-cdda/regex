export const avoidLetterCheck = async (
  avoidLetter,
  avoidWord,
  value3,
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
  if (avoidWord) {
    if (value3 && conditionValue) {
      console.log(filters[0]);
      avoidValue = `(?![${"^" + filters[0]}]${"*" + avoidWord})(?![${
        "^" + filters[0]
      }]*[${avoidLetter}])${item}${rangeValue}`;
      //   settingRegex[index] = value3;
      //   setSettingRegex([...settingRegex]);
    } else {
      avoidValue = `(?![${"^" + filters[0]}]${"*" + avoidWord})(?![${
        "^" + filters[0]
      }]*[${avoidLetter}])${item}${rangeValue}`;
    }
  } else {
    if (value3) {
      avoidValue = `${value3}${rangeValue}`;
      // settingRegex[index] = value3;
      // setSettingRegex([...settingRegex]);
    } else {
      avoidValue = `${item}${rangeValue}`;
    }
  }
  return avoidValue;
};
