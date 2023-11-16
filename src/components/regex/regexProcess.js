export const regexProcess = (value, specialCharacters) => {
  let regexMakingValue = "";
  let settingsGroup = [];
  let arr = [];
  value.forEach((item) => {
    let c = 0;
    // checkinG character is an special or not
    if ([...item].some((char) => specialCharacters.includes(char))) {
      // checking special character is an first or last and making conditiopn in regex

      const uniqueChars = [...new Set(item)].join("");
      settingsGroup.push(`[${uniqueChars}]`);
      const upperAcceptValue = `[${uniqueChars}]` + `{${item.length}}`;
      arr.push(upperAcceptValue);
      regexMakingValue = regexMakingValue + upperAcceptValue;

      // console.log(regexMakingValue);
    }
    // checking word of character
    else {
      let acceptValue = "";
      let uppercaseCount = 0;
      let lowercaseCount = 0;
      let numberCount = 0;
      for (let i = 0; i < item.length; i++) {
        const char = item.charAt(i);
        // find uppercase value count
        if (/[A-Z]/.test(char)) {
          uppercaseCount++;
        }
        //lowercase value count
        else if (/[a-z]/.test(char)) {
          lowercaseCount++;
        }
        //number count
        else if (/[1-9]/.test(char)) {
          numberCount++;
        }
      }
      // number word three are here then it will be return
      if (numberCount > 0 && uppercaseCount > 0 && lowercaseCount > 0) {
        settingsGroup.push(`[a-zA-Z0-9]`);
        acceptValue =
          `[a-zA-Z0-9]` + `{${uppercaseCount + lowercaseCount + numberCount}}`;
        arr.push(acceptValue);
      }
      // number and uppercaseCount
      else if (numberCount > 0 && uppercaseCount > 0) {
        settingsGroup.push(`[A-Z0-9]`);
        acceptValue = `[A-Z0-9]` + `{${uppercaseCount + numberCount}}`;
        arr.push(acceptValue);
      }
      // number lowercaseCount there are here then it will be return
      else if (numberCount > 0 && lowercaseCount > 0) {
        settingsGroup.push(`[a-z0-9]`);
        acceptValue = `[a-z0-9]` + `{${lowercaseCount + numberCount}}`;
        arr.push(acceptValue);
      }
      // uppercaseCount lowercaseCount there are here then it will be return
      else if (uppercaseCount > 0 && lowercaseCount > 0) {
        settingsGroup.push(`[a-zA-Z]`);
        acceptValue = `[a-zA-Z]` + `{${uppercaseCount + lowercaseCount}}`;
        arr.push(acceptValue);
      }
      // numberCount there are here then it will be return
      else if (numberCount > 0) {
        settingsGroup.push(`[0-9]`);
        acceptValue = `[0-9]` + `{${numberCount}}`;
        arr.push(acceptValue);
      }
      // uppercaseCount there are here then it will be return
      else if (uppercaseCount > 0) {
        settingsGroup.push(`[A-Z]`);
        acceptValue = `[A-Z]` + `{${uppercaseCount}}`;
        arr.push(acceptValue);
      }
      // lowercaseCount there are here then it will be return
      else if (lowercaseCount > 0) {
        settingsGroup.push(`[a-z]`);
        acceptValue = `[a-z]` + `{${lowercaseCount}}`;
        arr.push(acceptValue);
      }

      // merge al value
      regexMakingValue = regexMakingValue + acceptValue;
    }
  });

  return { settingsGroup, regexMakingValue, arr };
};
