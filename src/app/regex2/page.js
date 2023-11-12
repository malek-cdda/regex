"use client";

import { regexProcess, separateCharacter } from "@/components/regex2";
import { AiFillInfoCircle } from "react-icons/ai";

import { useEffect, useState } from "react";

export default function Home() {
  const [regex, setRegex] = useState("");
  const [regexConvertText, setRegexConvertText] = useState("");
  const [checkValue, setCheckValue] = useState(null);

  // inital update regex string
  const [content, setContent] = useState("");
  // start and end value initial state here
  // const [startEndValue, setStartEndValue] = useState({});
  // testing value initialize
  const [testValue, setTestValue] = useState("");
  useEffect(() => {
    const specialSignCharacters = ["@", "*", "%", ".", "#", " ", "^", "!"];
    //  separate all string character function
    const separateWord = separateCharacter(
      regexConvertText,
      specialSignCharacters
    );
    //  string convert process in convert normal string to regex process function
    const { regexMakingValue, newLen } = regexProcess(
      separateWord,
      specialSignCharacters
    );
    //  start value set
    // let startValue = startEndValue.start ? `[${startEndValue?.start}]` : "";
    // // end value set
    // let endValue = startEndValue.end ? `[${startEndValue?.end}]` : "";
    // setRegx value length

    //  making regex process
    if (regexMakingValue) {
      const regexValue = new RegExp("^" + regexMakingValue + `{${newLen}}$`);

      // regexValue.test(testValue) ? console.log("true") : console.log("false");
      setRegex(regexValue);
    }
  }, [regexConvertText, testValue]);
  // convert regex to string

  // Initial  update regx value get
  const regexToString = regex.toString();

  let regexString = "";
  for (let i = 1; i < regexToString.toString().length - 1; i++) {
    regexString = regexString + regexToString[i];
  }
  const handleContentChange = (event) => {
    setContent(event.target.textContent);
    checkingRegex(testValue, "updateText");
  };
  // regex check if regex valid return true or false
  const checkingRegex = (value, type) => {
    if (type == "normalText") {
      regex.test(value) ? setCheckValue(true) : setCheckValue(false);
    } else {
      // create update regex value
      const checkUpdateRegex = new RegExp(content);
      checkUpdateRegex.test(value) ? setCheckValue(true) : setCheckValue(false);
    }
  };
  // console.log(regex);
  //   regex.test(testValue) ? console.log("true") : console.log("false");

  return (
    <main className="  p-24">
      {/* regex value show code here  */}
      <div className="text-lg py-3 px-5 shadow-md rounded-md my-5 flex space-x-2 border-none outline-none   relative">
        <div className="flex space-x-2">
          <h1 className="capitalize">regex:</h1>
          <h1
            contentEditable={true}
            onInput={handleContentChange}
            suppressContentEditableWarning={true}
          >
            {!regexConvertText ? "" : regexString}
          </h1>
        </div>
        <div className="group   absolute  top-1 right-7">
          <span className="cursor-pointer">
            <AiFillInfoCircle />
          </span>
          <div className="group-hover:flex hidden absolute border w-52 bg-black text-white px-2 py-5 -right-10 rounded-md z-50">
            see the regex string that is generated from the specified test value
          </div>
        </div>
      </div>
      {/* regex value for testing  */}
      <div className="text-lg py-3 px-5 shadow-md rounded-md my-5 relative  ">
        <div>
          <input
            className="w-full focus:outline-none border-b-2 "
            placeholder="test value"
            onChange={(e) => {
              setTestValue(e.target.value);
              checkingRegex(
                e.target.value,
                content ? "updateText" : "normalText"
              );
            }}
          />
          <span className="text-[8px] text-red-400  ">
            {checkValue == false ? "match the requested form" : ""}
          </span>
          <h6 className="text-sm">
            {checkValue == false ? "not matching" : ""}
          </h6>
        </div>
        <div className="group   absolute  top-1 right-7">
          <span className="cursor-pointer">
            <AiFillInfoCircle />
          </span>
          <div className="group-hover:flex hidden absolute border w-52 bg-black text-white px-2 py-5 -right-10 rounded-md z-50">
            specified test value does not match the generated regular
            expression, the description of the regular expression will be
            displayed as a validation error directly below the te
          </div>
        </div>
      </div>
      {/* for creating regex input some text  */}
      <div className="text-lg py-3 px-5 shadow-md rounded-md my-5 relative  ">
        <div>
          <input
            className="w-full focus:outline-none border-b-2 "
            placeholder="specify string to match "
            onChange={(e) => {
              setTestValue(e.target.value);
              setRegexConvertText(e.target.value);
            }}
          />
        </div>
        <div className="group   absolute  top-1 right-7">
          <span className="cursor-pointer">
            <AiFillInfoCircle />
          </span>
          <div className="group-hover:flex hidden absolute border w-52 bg-black text-white px-2 py-5 -right-10 rounded-md z-50">
            specified test value does not match the generated regular
            expression, the description of the regular expression will be
            displayed as a validation error directly below the te
          </div>
        </div>
      </div>
      {/* start and end value given here  */}
      {/* <div className="flex justify-between">
        <button
          className="border text-green-600 bg-gray-50 px-5 py-2 "
          onClick={(e) => {
            setStartEndValue({
              ...startEndValue,
              start: "f",
            });
          }}
        >
          start with f
        </button> */}
      {/* <button
          className="border text-green-600 bg-gray-50 px-5 py-2 "
          onClick={(e) => {
            setStartEndValue({
              ...startEndValue,
              end: "b",
            });
          }}
        >
          end with with b
        </button> */}
      {/* </div> */}
    </main>
  );
}
