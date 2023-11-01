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
  //   console.log(specialSign);
  //   avoid empty string
  const joinString = sumOfString.filter((item) => item !== "");
  return joinString;
};

// decLAre for  normal text to convert regex
export const regexProcess = (value, specialCharacters) => {
  let regexMakingValue = "";
  let v = "";
  let k = "";
  value.forEach((item) => {
    if (specialCharacters.includes(item[0])) {
      v = v + item;
    } else {
      k = k + item;
    }
  });

  const upperAcceptValue = `(?=.*[${v}]{${v.length}})`;
  regexMakingValue = regexMakingValue + upperAcceptValue;
  //   const upperAcceptValue2 = `(?=.*[a-z-A-Z1-9]{${k.length}})`;
  //   regexMakingValue = regexMakingValue + upperAcceptValue2;
  //   const upperAcceptValue3 = `[a-z-A-Z1-9${v}]{${(k + v).length}}`;
  //   regexMakingValue = regexMakingValue + upperAcceptValue3;
  let acceptValue3 = "";
  let acceptValue1 = "";
  let acceptValue2 = "";
  let uppercaseCount = 0;
  let lowercaseCount = 0;
  let numberCount = 0;
  [...k].forEach((item) => {
    let c = 0;
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
    else if (uppercaseCount > 0) {
      acceptValue2 = `(?=.*[A-Z]{${uppercaseCount}})`;
    }
    // lowercaseCount there are here then it will be return
    else if (lowercaseCount > 0) {
      acceptValue3 = `(?=.*[a-z]{${lowercaseCount}})`;
    }

    // merge al value
  });
  let newAcceptValue = "";
  if (numberCount > 0 && uppercaseCount > 0 && lowercaseCount > 0 && v) {
    newAcceptValue = `[a-zA-Z0-9${v}]`;
  }
  // number and uppercaseCount
  else if (numberCount > 0 && uppercaseCount > 0 && v) {
    newAcceptValue = `[A-Z0-9${v}]`;
  }
  // number lowercaseCount there are here then it will be return
  else if (numberCount > 0 && lowercaseCount > 0 && v) {
    newAcceptValue = `[a-z0-9${v}]`;
  }
  // uppercaseCount lowercaseCount there are here then it will be return
  else if (uppercaseCount > 0 && lowercaseCount > 0 && v) {
    newAcceptValue = `[a-zA-Z${v}]`;
  } else if (numberCount > 0 && v) {
    newAcceptValue = `[1-9${v}]`;
  }
  // uppercaseCount there are here then it will be return
  else if (uppercaseCount > 0 && v) {
    newAcceptValue = `[A-Z${v}]`;
  }
  // lowercaseCount there are here then it will be return
  else if (lowercaseCount > 0) {
    newAcceptValue = `[a-z${v}]`;
  } else if (numberCount > 0) {
    newAcceptValue = `[1-9]`;
  }
  // uppercaseCount there are here then it will be return
  else if (uppercaseCount > 0) {
    newAcceptValue = `[A-Z]`;
  }
  // lowercaseCount there are here then it will be return
  else if (lowercaseCount > 0) {
    newAcceptValue = `[a-z]`;
  }
  //   let newLen = 0;
  //   if (k && v) {
  //     newLen = k.length + v.length;
  //   }
  let newLen = lowercaseCount + uppercaseCount + numberCount;
  if (v.length > 0) {
    newLen = 12;
  }

  regexMakingValue =
    acceptValue1 +
    acceptValue2 +
    acceptValue3 +
    regexMakingValue +
    newAcceptValue;
  console.log(regexMakingValue);
  return regexMakingValue;
};

//
