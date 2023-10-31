"use client";
import { regexProcess, separateCharacter } from "@/components/regex";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [regexs, setRegexs] = useState("");
  const [regexConvertText, setRegexConvertText] = useState("");
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
    const specialSignCharacters = ["@", "*", "%", ".", "#", " ", "^", "!"];
    //  seperate all string character function
    const separateWord = separateCharacter(
      regexConvertText,
      specialSignCharacters
    );
    //  string convert process in convert normal string to regex process function
    const regexMakingValue = regexProcess(separateWord, specialSignCharacters);

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
  }, [regexConvertText, ind, vs1]);
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
          onChange={(e) => setRegexConvertText(e.target.value)}
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
