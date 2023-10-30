"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [regexs, setRegexs] = useState("");
  const [normalText, setNormalText] = useState("");
  const [ind, setInd] = useState(null);
  const [len, setLen] = useState(null);
  // ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(0);
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

    let regexMakingValue = "";
    filter.forEach((item) => {
      if ([...item].some((char) => specialCharacters.includes(char))) {
        // const d = parts.push(value[i]);
        const vd = `[${item}]` + `{${item.length}}`;
        regexMakingValue = regexMakingValue + vd;
      } else if (Number(item)) {
        const vd = `[1-9]` + `{${item.length}}`;
        regexMakingValue = regexMakingValue + vd;
      } else {
        const vd = `[a-zA-Z]` + `{${item.length}}`;
        regexMakingValue = regexMakingValue + vd;
      }
    });

    let x = ind ? `[^${ind}]` : ``;
    let l = len ? `{${len}}` : `{10}`;
    let reg;
    if (pos) {
      console.log(index, regexs);
      const t = [...regexs.toString()];
      let d = "";
      for (let i = 1; i < t.length - 1; i++) {
        d = d + t[i];
      }
      const v = [...d].map((item, indexs) => {
        if (indexs === index - 1) {
          console.log(index, pos);
          item = pos;
          return item;
        }
        return item;
      });
      console.log(v.join(""));
      reg = new RegExp(v.join(""));
      console.log(regexs);
    } else {
      reg = new RegExp(x + regexMakingValue);
    }

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
  }, [normalText, ind, index, pos]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {index && (
          <input
            className="border-2"
            onChange={(e) => {
              setPos(e.target.value);
            }}
          />
        )}
        <h1 className="text-lg py-3 px-5 shadow-md rounded-md">
          regex :- {regexs.toString()}
        </h1>
        <div className="flex relative">
          {[...regexs.toString()].map((item, idx) => {
            return (
              <h1
                key={idx}
                onClick={() => {
                  setIndex(idx);
                }}
                className="mx-1"
              >
                {item}{" "}
              </h1>
            );
          })}
        </div>
        <input
          onChange={(e) => setNormalText(e.target.value)}
          className="text-lg py-3 px-5 shadow-md rounded-md"
        />
        {/* <input
          onChange={(e) => setInd(e.target.value)}
          className="border-2"
          placeholder="enter your avoid characcters"
        /> */}
        {/* <input
          onChange={(e) => setLen(e.target.value)}
          className="border-2"
          placeholder="enter your length"
        /> */}
      </div>
    </main>
  );
}
