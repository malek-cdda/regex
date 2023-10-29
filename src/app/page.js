"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [regexs, setRegexs] = useState("");
  const [normalText, setNormalText] = useState("");
  const [ind, setInd] = useState(null);
  useEffect(() => {
    const value = normalText;
    const specialCharacters = ["@", "*", "%", "."];
    console.log(specialCharacters.join(""));
    const parts = [];
    const special = [];
    let startIndex = 0;

    for (let i = 0; i < value.length; i++) {
      if (specialCharacters.includes(value[i])) {
        parts.push(value.substring(startIndex, i));
        parts.push(value[i]);
        startIndex = i + 1;
      }
    }

    // Add the last part (substring after the last special character)
    parts.push(value.substring(startIndex));
    // const specialChar = special.join("");
    // parts.push(specialChar);
    const r = 4;
    // const v = `[${parts.join("")}]` + `{${r}}`;
    let newR = "";
    for (let j = 0; j < parts.length; j++) {
      console.log(parts[j]);
      const vd = `[${parts[j]}]` + `{${parts[j].length}}`;
      newR = newR + vd;
    }
    const vds = new RegExp(newR);
    console.log(vds);
    setRegexs(vds);
    const newRegex = vds.toString();
    //   newRegex[2] = "t";
    const v = newR.replace(newR[ind], ind);
    console.log(v);
    const vds1 = new RegExp(v);
    console.log(vds1);
  }, [normalText, ind]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{regexs.toString()}</h1>
        <input
          onChange={(e) => setNormalText(e.target.value)}
          className="border-2"
        />
        <input onChange={(e) => setInd(e.target.value)} className="border-2" />
      </div>
    </main>
  );
}
