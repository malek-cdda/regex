export async function rangeCheck(min, max) {
  const newMin = Number(min);
  const newMax = Number(max);
  console.log(newMax, newMin);
  let rangeValue = "";

  if ((!newMin && !newMax) || (newMin && !newMax)) {
    rangeValue = `{${newMin ? newMin : 1}}`;
    // alert("minimum");
  } else if (newMin && newMax) {
    if (newMin < newMax) {
      rangeValue = `{${newMin},${newMax}}`;
    } else if (newMin >= newMax) {
      rangeValue = `{1,}`;
    }
  } else {
    rangeValue = `{1,${newMax}}`;
  }
  return rangeValue;
}
