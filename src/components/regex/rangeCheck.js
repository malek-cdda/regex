export async function rangeCheck(min, max) {
  let rangeValue = "";
  if ((!min && !max) || (min && !max)) {
    rangeValue = `{${min ? min : 1}}`;
    // alert("minimum");
  } else if (min && max) {
    if (min < max) rangeValue = `{${min},${max}}`;
    else {
      alert("minimum value must be less than maximum value");
      return;
    }
  } else {
    rangeValue = `{1}`;
  }
  return rangeValue;
}
