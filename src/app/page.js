"use client";

import { AiFillInfoCircle } from "react-icons/ai";

import { useEffect, useState } from "react";
import { separateCharacter } from "@/components/regex/specianCharacter";
import { regexProcess } from "@/components/regex/regexProcess";

export default function Home() {
  let [regex, setRegex] = useState("");
  const [regexConvertText, setRegexConvertText] = useState("");
  const [checkValue, setCheckValue] = useState(null);

  // inital update regex string
  const [content, setContent] = useState("");
  // start and end value initial state here
  const [startEndValue, setStartEndValue] = useState({});
  // testing value initialize
  const [testValue, setTestValue] = useState("");
  const [settingRegex, setSettingRegex] = useState([]);
  const [updateRegex, setUpdateRegex] = useState([]);
  useEffect(() => {
    const specialSignCharacters = [
      "@",
      "*",
      "%",
      ".",
      "#",
      " ",
      "^",
      "!",
      ")",
      "/",
      "$",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "+",
      "=",
      "{",
      "}",
      "[",
      "]",
      "|",
      "\\",
      ";",
      ":",
      "'",
      "<",
      ">",
      "?",
      "/",
      "~",
      "`",
    ];
    //  separate all string character function

    const separateWord = separateCharacter(
      regexConvertText,
      specialSignCharacters
    );

    //  string convert process in convert normal string to regex process function
    const { regexMakingValue, settingsGroup } = regexProcess(
      separateWord,
      specialSignCharacters
    );
    //  start value set
    let startValue = startEndValue.start ? `[${startEndValue?.start}]` : "";
    // end value set
    let endValue = startEndValue.end ? `[${startEndValue?.end}]` : "";
    //  making regex process
    // let regexValue;

    const regexValue = new RegExp(
      "^" + startValue + regexMakingValue + endValue + `$`
    );

    setSettingRegex(settingsGroup);
    // regexValue.test(testValue) ? setCheckValue(true) : setCheckValue(false);
    // if (updateRegex) {
    //   const checkUpdateRegex = new RegExp("^" + updateRegex + "$");
    //   checkUpdateRegex.test(regexConvertText)
    //     ? setCheckValue(true)
    //     : setCheckValue(false);
    //   setRegex(checkUpdateRegex);
    // } else {
    // regexValue.test(regexConvertText)
    //   ? setCheckValue(true)
    //   : setCheckValue(false);
    setRegex(regexValue);
    // }
    // setRegex(regexValue);
    console.log(updateRegex);
  }, [regexConvertText, startEndValue, updateRegex]);
  // convert regex to string

  // Initial  update regx value get
  const regexToString = regex.toString();

  let regexString = "";
  for (let i = 1; i < regexToString.toString().length - 1; i++) {
    regexString = regexString + regexToString[i];
  }
  const handleContentChange = (event) => {
    console.log(event.target.textContent);
    setContent(event.target.textContent);
    const checkUpdateRegex = new RegExp(event.target.textContent);
    checkUpdateRegex.test(regexConvertText)
      ? setCheckValue(true)
      : setCheckValue(false);
    // checkingRegex(testValue, "updateText");
  };
  // regex check if regex valid return true or false
  const checkingRegex = (value, type) => {
    // if (type == "normalText") {
    //   // console.log("my test value is back", value, regex.test(value), regex);
    //   regex.test(value) ? setCheckValue(true) : setCheckValue(false);
    // } else {
    //   // create update regex value
    //   const checkUpdateRegex = new RegExp(content);
    //   checkUpdateRegex.test(value) ? setCheckValue(true) : setCheckValue(false);
    // }
  };
  const [settingToggle, setSettingToggle] = useState(null);

  useEffect(() => {
    const checkUpdateRegex = new RegExp("^" + updateRegex.join("") + "$");
    // checkUpdateRegex.test(regexConvertText)
    //   ? setCheckValue(true)
    //   : setCheckValue(false);
    setRegex(checkUpdateRegex);
  }, [updateRegex]);
  const [customUpRegex, setCustomUpRegex] = useState(null | {});

  const handleCustomUpdate = (item, index) => {
    let rangeValue = "";
    let avoidValue = "";

    if (customUpRegex[index + 1]) {
      if (customUpRegex[index] >= customUpRegex[index + 1]) {
        alert(
          "minimum value is not greater than maximum value or same is not grater than value"
        );
        return;
      } else {
        rangeValue = `{${customUpRegex[index]},${customUpRegex[index + 1]}}`;
      }
    } else {
      if (window.confirm("are you sure you want to  infinite value accept")) {
        if (!customUpRegex[index]) {
          rangeValue = `{1,}`;
          return;
        } else {
          rangeValue = `{${customUpRegex[index]},}`;
        }
      } else {
        rangeValue = `{1,}`;
      }
    }
    if (customUpRegex[index + 2]) {
      avoidValue = `((?!.*[${customUpRegex[index + 2]}])${item}${rangeValue})`;
    } else {
      avoidValue = item;
    }
    if (!updateRegex.length) {
      const mapData = settingRegex.map((item, i) => {
        if (i == index) {
          console.log(avoidValue);
          return avoidValue;
        } else {
          return item;
        }
      });
      // regexs = new RegExp("^" + mapData.join("") + "$");
      setUpdateRegex(mapData);
    } else {
      updateRegex[index] = avoidValue;
      setUpdateRegex(updateRegex);
      setRegex(updateRegex.join(""));
      // console.log(updateRegex.join(""));
      // regexs = new RegExp("^" + updateRegex.join("") + "$");
    }
  };
  console.log(updateRegex);
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
      <div className="text-lg py-3 px-5 shadow-md rounded-md my-5 relative  ">
        <div>
          <input
            className="w-full focus:outline-none border-b-2 "
            placeholder="specify string to match "
            onChange={(e) => {
              setTestValue(e.target.value);
              setRegexConvertText(e.target.value);
              // checkingRegex(e.target.value, "normalText");
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
      {/* <div className="text-lg py-3 px-5 shadow-md rounded-md my-5 relative  ">
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
      </div> */}
      <div className="  relative">
        {settingRegex.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border py-4 px-5 my-5   w-1/2 "
          >
            <h1>{item}</h1>
            {index == settingToggle && (
              <div className="absolute top-0 right-1 flex flex-col space-y-1 bg-white w-5/12 ">
                <input
                  placeholder="regex minimum value length"
                  className="border py-4 px-3"
                  type="number"
                  min="1"
                  minLength="1"
                  onChange={(e) => {
                    setCustomUpRegex({
                      ...customUpRegex,
                      [index]: e.target.value,
                    });
                  }}
                />
                <input
                  placeholder="regex maximum value length"
                  className="border py-4 px-3"
                  min="1"
                  minLength="1"
                  type="number"
                  onChange={(e) => {
                    setCustomUpRegex({
                      ...customUpRegex,
                      [index + 1]: e.target.value,
                    });
                  }}
                />

                <input
                  placeholder="enter avoid word"
                  className="border py-4 px-3"
                  onChange={(e) => {
                    setCustomUpRegex({
                      ...customUpRegex,
                      [index + 2]: e.target.value,
                    });
                  }}
                />
                <button
                  onClick={() => {
                    handleCustomUpdate(item, index);
                  }}
                >
                  submit
                </button>
              </div>
            )}
            <button
              className="text-green-500  text-lg"
              onClick={() => {
                setSettingToggle(index);
              }}
            >
              setting
            </button>
          </div>
        ))}
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
        </button>
        <button
          className="border text-green-600 bg-gray-50 px-5 py-2 "
          onClick={(e) => {
            setStartEndValue({
              ...startEndValue,
              end: "b",
            });
          }}
        >
          end with with b
        </button>
      </div> */}
    </main>
  );
}
