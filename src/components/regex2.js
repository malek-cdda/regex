export const separateCharacter = (value, specialSignCharacters) => {
  const sumOfString = [];
  const letterValue = [];
  const specialSign = [];

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
  //   console.log(specialSign);
  //   avoid empty string
  const joinString = sumOfString.filter((item) => item !== "");
  return joinString;
};

// decLAre for  normal text to convert regex
export const regexProcess = (value, specialCharacters) => {
  let regexMakingValue = "";
  let specialCharacterSign = "";
  let letterValue = "";
  value.forEach((item) => {
    if (specialCharacters.includes(item[0])) {
      specialCharacterSign = specialCharacterSign + item;
    } else {
      letterValue = letterValue + item;
    }
  });
  let upperAcceptValue = "";
  if (specialCharacterSign.length > 0) {
    upperAcceptValue = `(?=.*[${specialCharacterSign}]{${specialCharacterSign.length}})`;
  }

  regexMakingValue = regexMakingValue + upperAcceptValue;

  let acceptValue3 = "";
  let acceptValue1 = "";
  let acceptValue2 = "";
  let uppercaseCount = 0;
  let lowercaseCount = 0;
  let numberCount = 0;
  [...letterValue].forEach((item) => {
    const char = item.charAt(item);
    // find uppercase value count
    if (/[A-Z]/.test(char)) {
      uppercaseCount++;
    }
    //lowercase value count
    else if (/[a-z]/.test(char)) {
      lowercaseCount++;
    } else {
      numberCount++;
    }
    if (numberCount > 0) {
      acceptValue1 = `(?=.*[0-9]{${numberCount}})`;
    }
    // uppercaseCount there are here then it will be return
    if (uppercaseCount > 0) {
      acceptValue2 = `(?=.*[A-Z]{${uppercaseCount}})`;
    }
    // lowercaseCount there are here then it will be return
    if (lowercaseCount > 0) {
      acceptValue3 = `(?=.*[a-z]{${lowercaseCount}})`;
    }

    // merge al value
  });
  let newAcceptValue = "";
  // uppercaseCount numberCount lowercaseCount match then it will be return
  if (uppercaseCount > 0 && lowercaseCount && numberCount > 0) {
    newAcceptValue = `[a-zA-Z1-9${specialCharacterSign}]`;
  }
  // uppercaseCount lowercaseCount match then it will be return
  else if (uppercaseCount > 0 && lowercaseCount) {
    newAcceptValue = `[a-zA-Z${specialCharacterSign}]`;
  }
  // uppercaseCount numberCount match then it will be return
  else if (uppercaseCount > 0 && numberCount) {
    newAcceptValue = `[A-Z1-9${specialCharacterSign}]`;
  }
  // lowercaseCount numberCount match then it will be return
  else if (lowercaseCount > 0 && numberCount) {
    newAcceptValue = `[a-z1-9${specialCharacterSign}]`;
  }
  // lowercaseCount there are here then it will be return
  else if (lowercaseCount > 0) {
    newAcceptValue = `[a-z${specialCharacterSign}]`;
  }
  // numberCount there are here then it will be return
  else if (numberCount > 0) {
    newAcceptValue = `[1-9${specialCharacterSign}]`;
  }
  // uppercaseCount there are here then it will be return
  else if (uppercaseCount > 0) {
    newAcceptValue = `[A-Z${specialCharacterSign}]`;
  }
  // lowercaseCount there are here then it will be return
  else if (lowercaseCount > 0) {
    newAcceptValue = `[a-z${specialCharacterSign}]`;
  }
  // specialCharacterSign there are here then it will be return
  else if (specialCharacterSign) {
    newAcceptValue = `[${specialCharacterSign}]`;
  }

  let newLen =
    lowercaseCount + uppercaseCount + numberCount + specialCharacterSign.length;

  regexMakingValue =
    acceptValue1 +
    acceptValue2 +
    acceptValue3 +
    regexMakingValue +
    newAcceptValue;
  // console.log(regexMakingValue);
  return { regexMakingValue, newLen };
};

//
