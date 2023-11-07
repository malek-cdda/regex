"use client";

import { AiFillInfoCircle } from "react-icons/ai";

import { useEffect, useState } from "react";
import { separateCharacter } from "@/components/regex/separateCharacter";
import { regexProcess } from "@/components/regex/regexProcess";
import {
  specialSignCharacters,
  userFavourStructureValue,
} from "@/components/regex/regexData";

export default function Home() {
  let [regex, setRegex] = useState("");
  const [regexConvertText, setRegexConvertText] = useState("");
  const [checkValue, setCheckValue] = useState(null);
  // inital update regex string
  const [content, setContent] = useState("");
  // testing value initialize
  const [testValue, setTestValue] = useState("");
  const [settingRegex, setSettingRegex] = useState([]);
  const [updateRegex, setUpdateRegex] = useState([]);
  const [settingToggle, setSettingToggle] = useState(null);
  const [customUpRegex, setCustomUpRegex] = useState(null | {});

  useEffect(() => {
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
    const regexValue = new RegExp("^" + regexMakingValue + `$`);
    setRegex(regexValue);
    //  separeate regex group
    setSettingRegex(settingsGroup);
  }, [regexConvertText]);

  // Initial  update regx value get
  const regexToString = regex.toString();
  let regexString = "";
  for (let i = 1; i < regexToString.toString().length - 1; i++) {
    regexString = regexString + regexToString[i];
  }

  const handleCustomUpdate = (item, index) => {
    let rangeValue = "";
    let avoidValue = "";
    console.log(customUpRegex);
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
      if (customUpRegex[index + 3]) {
        avoidValue = `((?!.*[${customUpRegex[index + 2]}])${
          customUpRegex[index + 3]
        }${rangeValue})`;
        settingRegex[index] = customUpRegex[index + 3];
        setSettingRegex([...settingRegex]);
      } else {
        avoidValue = `((?!.*[${
          customUpRegex[index + 2]
        }])${item}${rangeValue})`;
      }
    } else {
      if (customUpRegex[index + 3]) {
        avoidValue = `${customUpRegex[index + 3]}${rangeValue}`;
        settingRegex[index] = customUpRegex[index + 3];
        setSettingRegex([...settingRegex]);
      } else {
        avoidValue = `${item}${rangeValue}`;
      }
    }
    if (!updateRegex.length) {
      const regexUpdateData = settingRegex.map((item, idx) => {
        if (idx == index) {
          return avoidValue;
        } else {
          return item;
        }
      });
      const checkUpdateRegex = new RegExp("^" + regexUpdateData.join("") + "$");
      setRegex(checkUpdateRegex);
      setUpdateRegex(regexUpdateData);
    } else {
      updateRegex[index] = avoidValue;
      const checkUpdateRegex = new RegExp("^" + updateRegex.join("") + "$");
      setRegex(checkUpdateRegex);
    }
  };

  return (
    <main className="  p-24">
      {/* regex value show code here  */}
      <div className="text-lg py-3 px-5 shadow-md rounded-md my-5 flex space-x-2 border-none outline-none   relative">
        <div className="flex space-x-2">
          <h1 className="capitalize">regex:</h1>
          <h1 contentEditable={true} suppressContentEditableWarning={true}>
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
      {/* making regex value for imput  */}
      <div className="text-lg py-3 px-5 shadow-md rounded-md my-5 relative  ">
        <div>
          <input
            className="w-full focus:outline-none border-b-2 "
            placeholder="specify string to match "
            readOnly={updateRegex.length > 0 ? true : false}
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
      {/* update regex value  */}

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

                {
                  <select
                    className="border py-4 px-3"
                    onChange={(e) => {
                      setCustomUpRegex({
                        ...customUpRegex,
                        [index + 3]: e.target.value,
                      });
                    }}
                  >
                    {userFavourStructureValue.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                }

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
    </main>
  );
}
