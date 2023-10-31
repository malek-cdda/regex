"use client";
import { seperateCharacter } from "@/components/regex";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [regexs, setRegexs] = useState("");
  const [normalText, setNormalText] = useState("");
  const [ind, setInd] = useState(null);
  const [len, setLen] = useState(null);
  const [index, setIndex] = useState({});
  const [pos, setPos] = useState({
    index: null,
    value: "",
  });
  const [changeLen, setChangeLen] = useState([]);
  const [vs, setVs] = useState([]);
  const [vs1, setVs1] = useState([]);
  const [indexss, setIndexss] = useState({});
  useEffect(() => {
    const regexConvertText = normalText;
    const specialCharacters = ["@", "*", "%", ".", "#", " ", "^", "!"];
    // const arr = [];
    // const parts = [];
    // const special = [];
    // let arr1 = [];
    // // seperate string character
    // for (let i = 0; i < value.length; i++) {
    //   if (specialCharacters.includes(value[i])) {
    //     special.push(value[i]);
    //     arr.push(parts.join(""));
    //     arr.push(arr1.join(""));
    //     parts.length = 0;
    //     arr1.length = 0;
    //   } else if (Number(value[i])) {
    //     arr1.push(value[i]);
    //     arr.push(parts.join(""));
    //     arr.push(special.join(""));
    //     parts.length = 0;
    //     special.length = 0;
    //   } else {
    //     parts.push(value[i]);
    //     arr.push(special.join(""));
    //     arr.push(arr1.join(""));
    //     arr1.length = 0;
    //     special.length = 0;
    //   }
    // }
    // // join all string
    // if (arr1.length > 0) {
    //   arr.push(arr1.join(""));
    // }
    // if (special.length > 0) {
    //   arr.push(special.join(""));
    // }
    // if (parts.length > 0) {
    //   arr.push(parts.join(""));
    // }
    const arr = seperateCharacter(regexConvertText);
    // remove empty string
    const filter = arr.filter((item) => item !== "");

    let regexMakingValue = "";
    //  creating for regex acceptable string
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
    // updating regex length
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

    setRegexs(reg);
  }, [normalText, ind, vs1]);
  // console.log("index", index);
  // const letters = new Set(changeLen);

  const handleOnClick = () => {
    if (vs1.some((item) => item?.index == pos?.index)) {
      const v = vs1.filter((item) => item?.index !== pos?.index);
      const n = [...v, pos];
      // console.log(n);
      setVs1(n);
    } else {
      setVs1([...vs1, pos]);
    }
    console.log(indexss, pos);
    setPos({});
    setIndex(pos);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {indexss.index && (
          <>
            <input
              value={pos.value || ""}
              className="border-2"
              onChange={(e) => {
                setPos({
                  index: indexss?.index,
                  value: e.target.value,
                });
              }}
            />
            <button
              className="border bg-red-400 text-black"
              onClick={handleOnClick}
            >
              submit
            </button>
          </>
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
                  setVs(0),
                    setIndexss({
                      index: idx,
                      value: item,
                    });
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
