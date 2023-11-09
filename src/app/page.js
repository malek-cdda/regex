"use client";
import { AiFillInfoCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { separateCharacter } from "@/components/regex/separateCharacter";
import { regexProcess } from "@/components/regex/regexProcess";
import {
  specialSignCharacters,
  userFavourStructureValue,
} from "@/components/regex/regexData";
import { rangeCheck } from "@/components/regex/rangeCheck";
import { avoidLetterCheck } from "@/components/regex/avoidLetterCheck";

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
  const [customUpRegex, setCustomUpRegex] = useState({});
  const [arr, setArr] = useState([]);
  useEffect(() => {
    //  separate all string character function
    const separateWord = separateCharacter(
      regexConvertText,
      specialSignCharacters
    );
    //  string convert process in convert normal string to regex process function
    const { regexMakingValue, settingsGroup, arr } = regexProcess(
      separateWord,
      specialSignCharacters
    );
    setArr(arr);
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

  const handleCustomUpdate = async (e, item, index, conditionValue) => {
    e.preventDefault();
    if (!customUpRegex) {
      alert("avoid");
      return;
    }
    // maxvalue and minvalue check here and set range value
    const rangeValue = await rangeCheck(
      customUpRegex[index],
      customUpRegex[index + 1]
    );
    // avoid letter/word check here
    let conditionData = conditionValue ? conditionValue : "[$]";
    let favouriteStructure = customUpRegex[index + 4]
      ? customUpRegex[index + 4]
      : item;
    const avoidValue = await avoidLetterCheck(
      customUpRegex[index + 2], //avoid letter
      customUpRegex[index + 3], // avoid word
      customUpRegex[index + 4], // structure value
      rangeValue,
      favouriteStructure,
      conditionData
    );
    if (!updateRegex.length) {
      const regexUpdateData = arr.map((item, idx) => {
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
    // const updateRegex = await updateRegexData()
    setCustomUpRegex({
      ...customUpRegex,
      [index]: "",
      [index + 1]: "",
      [index + 2]: "",
      [index + 3]: "",
      [index + 4]: "",
    });
  };
  useEffect(() => {
    if (regex && testValue) {
      const check = regex.test(testValue);
      setCheckValue(check);
      console.log(check);
    }
  }, [testValue]);
  console.log(regex);
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
              // checkingRegex(
              //   e.target.value,
              //   content ? "updateText" : "normalText"
              // );
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
              <form
                className="absolute top-0 right-1   flex flex-col space-y-1 bg-white w-5/12"
                onSubmit={(e) =>
                  handleCustomUpdate(e, item, index, settingRegex[index + 1])
                }
              >
                <h1 className="py-3 px-4 text-center bg-gray-50 mb-2 text-xl">
                  selectedItem : {item}
                </h1>
                <input
                  placeholder="regex minimum value length"
                  className="border py-4 px-3"
                  type="number"
                  min="1"
                  minLength="1"
                  required
                  value={customUpRegex[index] || ""}
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
                  min="2"
                  minLength="1"
                  type="number"
                  value={customUpRegex[index + 1] || ""}
                  onChange={(e) => {
                    setCustomUpRegex({
                      ...customUpRegex,
                      [index + 1]: e.target.value,
                    });
                  }}
                />

                <input
                  placeholder="enter avoid letter"
                  className="border py-4 px-3"
                  required
                  value={customUpRegex[index + 2] || ""}
                  onChange={(e) => {
                    setCustomUpRegex({
                      ...customUpRegex,
                      [index + 2]: e.target.value,
                    });
                  }}
                />
                <input
                  placeholder="enter avoid word"
                  className="border py-4 px-3"
                  required
                  value={customUpRegex[index + 3] || ""}
                  onChange={(e) => {
                    setCustomUpRegex({
                      ...customUpRegex,
                      [index + 3]: e.target.value,
                    });
                  }}
                />

                {
                  <select
                    className="border py-4 px-3"
                    onChange={(e) => {
                      setCustomUpRegex({
                        ...customUpRegex,
                        [index + 4]: e.target.value,
                      });
                    }}
                  >
                    <option value={item} selected={item}>
                      {item}
                    </option>
                    {userFavourStructureValue
                      .filter((i, idx) => i != item)
                      .map((items, index) => (
                        <option key={index} value={items}>
                          {items}
                        </option>
                      ))}
                  </select>
                }

                <button
                  className="border hover:underline py-2 px-3 text-green-400"
                  type="submit"
                >
                  submit
                </button>
              </form>
            )}
            <button
              className="text-green-500  text-lg"
              onClick={() => {
                setSettingToggle(index);
              }}
            >
              {settingToggle == index ? "open" : "setting"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
