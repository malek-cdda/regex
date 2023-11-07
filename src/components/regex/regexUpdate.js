export const handleCustomUpdate = async (item, index) => {
  let rangeValue = "";
  let avoidValue = "";

  if (customUpRegex[index + 1]) {
    if (customUpRegex[index] >= customUpRegex[index + 1]) {
      alert(
        "minimum value is not greater than maximum value or same is not grater than value"
      );
      return;
    } else {
      rangeValue = `{${customUpRegex[index]},${customUpRegex[index + 1]}}`;
    }
  } else {
    if (window.confirm("are you sure you want to  infinite value accept")) {
      if (!customUpRegex[index]) {
        rangeValue = `{1,}`;
        return;
      } else {
        rangeValue = `{${customUpRegex[index]},}`;
      }
    } else {
      rangeValue = `{1,}`;
    }
  }
  if (customUpRegex[index + 2]) {
    avoidValue = `((?!.*[${customUpRegex[index + 2]}])${item}${rangeValue})`;
  } else {
    avoidValue = item;
  }
  if (!updateRegex.length) {
    const regexUpdateData = settingRegex.map((item, i) => {
      if (i == index) {
        return avoidValue;
      } else {
        return item;
      }
    });
    const checkUpdateRegex = new RegExp("^" + regexUpdateData.join("") + "$");
    setRegex(checkUpdateRegex);
    setUpdateRegex(regexUpdateData);
  } else {
    updateRegex[index] = avoidValue;
    const checkUpdateRegex = new RegExp("^" + updateRegex.join("") + "$");
    setRegex(checkUpdateRegex);
  }
};
