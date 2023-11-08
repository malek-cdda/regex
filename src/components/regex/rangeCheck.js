export async function rangeCheck(min, max) {
  let rangeValue = "";
  if ((!min && !max) || (min && !max)) {
    rangeValue = `${min ? min : 1}`;
  } else {
    if (min < max) rangeValue = `{${min},${max}}`;
    else {
      alert("minimum value must be less than maximum value");
      return;
    }
  }
  return rangeValue;
}
