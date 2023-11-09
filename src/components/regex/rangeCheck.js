export async function rangeCheck(min, max) {
  const newMin = Number(min);
  const newMax = Number(max);
  let rangeValue = "";

  if ((!newMin && !newMax) || (newMin && !newMax)) {
    rangeValue = `{${newMin ? newMin : 1}}`;
    // alert("minimum");
  } else if (newMin && newMax) {
    if (newMin < newMax) {
      rangeValue = `{${newMin},${newMax}}`;
    } else {
      console.log("min", typeof newMin, "max", typeof newMax);
      alert("minimum value must be less than maximum value");
      return;
    }
  } else {
    rangeValue = `{1}`;
  }
  return rangeValue;
}
