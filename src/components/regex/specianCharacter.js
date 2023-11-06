export const separateCharacter = (value, specialSignCharacters) => {
  const sumOfString = [];
  const letterValue = [];
  const specialSign = [];
  let numberValue = [];
  // seperate string character
  for (let i = 0; i < value.length; i++) {
    // seperate special character
    if (specialSignCharacters.includes(value[i])) {
      specialSign.push(value[i]);
      sumOfString.push(letterValue.join(""));
      letterValue.length = 0;
    } else {
      letterValue.push(value[i]);
      sumOfString.push(specialSign.join(""));
      specialSign.length = 0;
    }
  }

  if (specialSign.length > 0) {
    sumOfString.push(specialSign.join(""));
  }
  if (letterValue.length > 0) {
    sumOfString.push(letterValue.join(""));
  }
  //   avoid empty string
  let joinString;
  console.log(value);
  if (!value) {
    joinString = [];
  } else {
    joinString = sumOfString.filter((item) => item !== "");
  }
  return joinString;
};
