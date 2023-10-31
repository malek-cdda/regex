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
      sumOfString.push(numberValue.join(""));
      letterValue.length = 0;
      numberValue.length = 0;
    }
    // seperate number of string
    else if (Number(value[i])) {
      numberValue.push(value[i]);
      sumOfString.push(letterValue.join(""));
      sumOfString.push(specialSign.join(""));
      letterValue.length = 0;
      specialSign.length = 0;
    }
    // seperate character
    else {
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
  //   avoid empty string
  const joinString = sumOfString.filter((item) => item !== "");
  return joinString;
};

// decLAre for  normal text to convert regex
export const regexProcess = (value, specialCharacters) => {
  let regexMakingValue = "";
  value.forEach((item) => {
    // checkinG character is an special or not
    if ([...item].some((char) => specialCharacters.includes(char))) {
      // const d = parts.push(value[i]);
      const regexAcceptValue = `[${item}]` + `{${item.length}}`;
      regexMakingValue = regexMakingValue + regexAcceptValue;
    }
    // checking number of character
    else if (Number(item)) {
      const regexAcceptValue = `[1-9]` + `{${item.length}}`;
      regexMakingValue = regexMakingValue + regexAcceptValue;
    }
    // checking word of character
    else {
      const regexAcceptValue = `[a-zA-Z]` + `{${item.length}}`;
      regexMakingValue = regexMakingValue + regexAcceptValue;
    }
  });
  return regexMakingValue;
};

// REGEX MAKING PROCESS FUNCTION
export const regexMakingValueProcess = (
  vs1,
  index,
  regexMakingValue,
  x,
  regexs
) => {
  let reg;
  if (vs1?.length && index?.index) {
    // console.log(index, regexs);
    const t = [...regexs.toString()];
    let d = "";
    console.log(vs1);
    for (let i = 1; i < t.length - 1; i++) {
      d = d + t[i];
    }
    const v = [...d].map((item, indexs) => {
      if (vs1.some((item) => item?.index - 1 == indexs)) {
        // console.log(index, pos);
        const vValue = vs1.find((item) => item?.index - 1 == indexs);
        item = vValue.value;
        return item;
      }
      setIndex({});
      return item;
    });
    //

    reg = new RegExp(v.join(""));
  } else {
    reg = new RegExp(x + regexMakingValue);
  }
  return reg;
};
