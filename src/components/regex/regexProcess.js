export const regexProcess = (value, specialCharacters) => {
  let regexMakingValue = "";
  let settingsGroup = [];
  value.forEach((item) => {
    let c = 0;
    // checkinG character is an special or not
    if ([...item].some((char) => specialCharacters.includes(char))) {
      // checking special character is an first or last and making conditiopn in regex

      const uniqueChars = [...new Set(item)].join("");
      settingsGroup.push(`[${uniqueChars}]` + `{${item.length}}`);
      const upperAcceptValue = `[${uniqueChars}]` + `{${item.length}}`;
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
        settingsGroup.push(
          `[a-zA-Z0-9]` + `{${uppercaseCount + lowercaseCount + numberCount}}`
        );
        acceptValue =
          `[a-zA-Z0-9]` + `{${uppercaseCount + lowercaseCount + numberCount}}`;
      }
      // number and uppercaseCount
      else if (numberCount > 0 && uppercaseCount > 0) {
        settingsGroup.push(`[A-Z0-9]` + `{${uppercaseCount + numberCount}}`);
        acceptValue = `[A-Z0-9]` + `{${uppercaseCount + numberCount}}`;
      }
      // number lowercaseCount there are here then it will be return
      else if (numberCount > 0 && lowercaseCount > 0) {
        settingsGroup.push(`[a-z0-9]` + `{${lowercaseCount + numberCount}}`);
        acceptValue = `[a-z0-9]` + `{${lowercaseCount + numberCount}}`;
      }
      // uppercaseCount lowercaseCount there are here then it will be return
      else if (uppercaseCount > 0 && lowercaseCount > 0) {
        settingsGroup.push(`[a-zA-Z]` + `{${uppercaseCount + lowercaseCount}}`);
        acceptValue = `[a-zA-Z]` + `{${uppercaseCount + lowercaseCount}}`;
      }
      // numberCount there are here then it will be return
      else if (numberCount > 0) {
        settingsGroup.push(`[0-9]` + `{${numberCount}}`);
        acceptValue = `[0-9]` + `{${numberCount}}`;
      }
      // uppercaseCount there are here then it will be return
      else if (uppercaseCount > 0) {
        settingsGroup.push(`[A-Z]` + `{${uppercaseCount}}`);
        acceptValue = `[A-Z]` + `{${uppercaseCount}}`;
      }
      // lowercaseCount there are here then it will be return
      else if (lowercaseCount > 0) {
        settingsGroup.push(`[a-z]` + `{${lowercaseCount}}`);
        acceptValue = `[a-z]` + `{${lowercaseCount}}`;
      }

      // merge al value
      regexMakingValue = regexMakingValue + acceptValue;
    }
  });
  return { settingsGroup, regexMakingValue };
};
