"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [regexs, setRegexs] = useState("");
  const [normalText, setNormalText] = useState("");
  const [ind, setInd] = useState(null);
  const [len, setLen] = useState(null);
  // ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
  useEffect(() => {
    const value = normalText;
    const specialCharacters = ["@", "*", "%", ".", "#", " ", "^", "!"];
    const arr = [];
    const parts = [];
    const special = [];
    let arr1 = [];
    for (let i = 0; i < value.length; i++) {
      if (specialCharacters.includes(value[i])) {
        // parts.push(value.substring(startIndex, i));
        // console.log(value[i]);
        special.push(value[i]);
        // const d = parts.push(value[i]);
        // const vd = `[a-zA-Z]` + `{${value.substring(startIndex, i).length}}`;
        // newR = newR + vd;
        // startIndex = i + 1;

        arr.push(parts.join(""));
        arr.push(arr1.join(""));
        parts.length = 0;
        arr1.length = 0;
      } else if (Number(value[i])) {
        arr1.push(value[i]);
        arr.push(parts.join(""));
        arr.push(special.join(""));
        parts.length = 0;
        special.length = 0;
      } else {
        parts.push(value[i]);
        arr.push(special.join(""));
        arr.push(arr1.join(""));
        arr1.length = 0;
        special.length = 0;
      }
    }
    if (arr1.length > 0) {
      arr.push(arr1.join(""));
    }
    if (special.length > 0) {
      arr.push(special.join(""));
    }
    if (parts.length > 0) {
      arr.push(parts.join(""));
    }
    const filter = arr.filter((item) => item !== "");

    console.log(filter);
    let k = "";
    filter.forEach((item) => {
      if ([...item].some((char) => specialCharacters.includes(char))) {
        // const d = parts.push(value[i]);
        const vd = `[@#$%^&*()]` + `{${item.length}}`;
        k = k + vd;
      } else if (Number(item)) {
        const vd = `[1-9]` + `{${item.length}}`;
        k = k + vd;
      } else {
        const vd = `[a-zA-Z]` + `{${item.length}}`;
        k = k + vd;
      }
    });

    let x = `[^${ind}]`;
    let l = len ? `{${len}}` : `{10}`;
    const reg = new RegExp(x + k);
    console.log(reg);
    // console.log(reg);
    // console.log(special);
    // console.log(parts.join(""));
    // parts.push(value.substring(startIndex));
    // console.log(parts);
    // console.log(special.join(""));
    // console.log(newR);
    // let x = `[^d]`;
    // const vds = new RegExp("^" + "t" + x + newR);

    setRegexs(reg);
    // const newRegex = vds.toString();
    // const v = newR.replace(newR[ind], ind);

    // const vds1 = new RegExp(v);
  }, [normalText, ind]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{regexs.toString()}</h1>
        <input
          onChange={(e) => setNormalText(e.target.value)}
          className="border-2"
        />
        <input
          onChange={(e) => setInd(e.target.value)}
          className="border-2"
          placeholder="enter your avoid characcters"
        />
        {/* <input
          onChange={(e) => setLen(e.target.value)}
          className="border-2"
          placeholder="enter your length"
        /> */}
      </div>
    </main>
  );
}
