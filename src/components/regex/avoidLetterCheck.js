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
  // add your favourite word
  let addWord = addedWord ? `(?=[${"^" + filters[0]}]*[${addedWord}])` : "";
  // skip word condition here
  let avoidWordUser = avoidWord ? `(?![${"^" + filters[0]}]*${avoidWord})` : "";
  // regex formate string making
  avoidValue = `${addWord}${avoidWordUser}${avoidLetterValue}${item}${rangeValue}`;

  return avoidValue;
};
