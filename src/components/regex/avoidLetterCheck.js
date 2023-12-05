export const avoidAndAddedLetterCheck = async (
  avoidLetter,
  avoidWord,
  addedWord,
  value3,
  rangeValue,
  item,
  conditionValue
) => {
  let filters = "";
  let avoidValue = "";
  console.log(value3, conditionValue);
  // console.log(conditionValue);

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
    // console.log("^", filters);
  }
  // avoid letter condition here
  let avoidLetterValue = avoidLetter
    ? `(?![${"^" + filters[0]}]*[${avoidLetter}])`
    : "";
  //   // add your favourite word
  let addWord = addedWord ? `(?=[${"^" + filters[0]}]*${addedWord})` : "";
  let avoidWordUser = avoidWord ? `(?![${"^" + filters[0]}]*${avoidWord})` : "";

  avoidValue = `${addWord}${avoidWordUser}${avoidLetterValue}${item}${rangeValue}`;

  return avoidValue;
};

// if (avoidWord) {
//   if (value3 && conditionValue) {
//     avoidValue = `(?=[${"^" + filters[0]}]${"*" + addedWord})(?![${
//       "^" + filters[0]
//     }]${"*" + avoidWord})(?![${
//       "^" + filters[0]
//     }]*[${avoidLetter}])${item}${rangeValue}`;
//     //   settingRegex[index] = value3;
//     //   setSettingRegex([...settingRegex]);
//   } else {
//     avoidValue = `(?=[${"^" + filters[0]}]${"*" + addedWord})(?![${
//       "^" + filters[0]
//     }]${"*" + avoidWord})(?![${
//       "^" + filters[0]
//     }]*[${avoidLetter}])${item}${rangeValue}`;
//   }
// } else {
//   if (value3) {
//     avoidValue = `${value3}${rangeValue}`;
//     // settingRegex[index] = value3;
//     // setSettingRegex([...settingRegex]);
//   } else {
//     avoidValue = `${item}${rangeValue}`;
//   }
// }
