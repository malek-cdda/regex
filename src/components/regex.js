export const seperateCharacter = (value) => {
  const specialSignCharacters = ["@", "*", "%", ".", "#", " ", "^", "!"];
  const sumOfString = [];
  const letterValue = [];
  const specialSign = [];
  let numberValue = [];
  // seperate string character
  for (let i = 0; i < value.length; i++) {
    if (specialSignCharacters.includes(value[i])) {
      specialSign.push(value[i]);
      sumOfString.push(letterValue.join(""));
      sumOfString.push(numberValue.join(""));
      letterValue.length = 0;
      numberValue.length = 0;
    } else if (Number(value[i])) {
      numberValue.push(value[i]);
      sumOfString.push(letterValue.join(""));
      sumOfString.push(specialSign.join(""));
      letterValue.length = 0;
      specialSign.length = 0;
    } else {
      letterValue.push(value[i]);
      sumOfString.push(specialSign.join(""));
      sumOfString.push(numberValue.join(""));
      numberValue.length = 0;
      specialSign.length = 0;
    }
  }
  // join all string
  if (numberValue.length > 0) {
    sumOfString.push(numberValue.join(""));
  }
  if (specialSign.length > 0) {
    sumOfString.push(specialSign.join(""));
  }
  if (letterValue.length > 0) {
    sumOfString.push(letterValue.join(""));
  }
  return sumOfString;
};
