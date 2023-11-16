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
import { avoidAndAddedLetterCheck } from "@/components/regex/avoidLetterCheck";
import Settings from "@/components/regexGeneratorComponent/settings";

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
  const [matchValue, setMatchValue] = useState(false);
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
  const [newMatch, setNewMatch] = useState(false);
  const handleCustomUpdate = async (e, item, index, conditionValue) => {
    e.preventDefault();
    if (matchValue) {
      setNewMatch(true);
      return;
    }
    setNewMatch(false);
    if (!customUpRegex) {
      alert("avoid");
      return;
    }
    // maxvalue and minvalue check here and set range value
    const rangeValue = await rangeCheck(
      customUpRegex[index],
      customUpRegex[index + 1]
    );
    // if not find any special character then it accept "$"
    let conditionData = conditionValue ? conditionValue : "[$]";
    // user can added favourite structure
    let favouriteStructure = customUpRegex[index + 5]
      ? customUpRegex[index + 5]
      : item;
    // avoid letter/word check here
    const avoidAddedValue = await avoidAndAddedLetterCheck(
      customUpRegex[index + 2], //avoid letter
      customUpRegex[index + 3], // avoid word
      customUpRegex[index + 4], // added word
      customUpRegex[index + 5], // structure value
      rangeValue,
      favouriteStructure,
      conditionData // condion value
    );

    if (!updateRegex.length) {
      const regexUpdateData = arr.map((item, idx) => {
        if (idx == index) {
          return avoidAddedValue;
        } else {
          return item;
        }
      });
      const checkUpdateRegex = new RegExp("^" + regexUpdateData.join("") + "$");
      setRegex(checkUpdateRegex);
      setUpdateRegex(regexUpdateData);
    } else {
      updateRegex[index] = avoidAddedValue;
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
    }
  }, [testValue]);

  return (
    <main className="  p-24">
      <h1 className="text-center border py-5 font-bold text-xl ">
        Regex Generator
      </h1>
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
          <Settings
            key={index}
            item={item}
            index={index}
            settingToggle={settingToggle}
            setSettingToggle={setSettingToggle}
            customUpRegex={customUpRegex}
            setCustomUpRegex={setCustomUpRegex}
            newMatch={newMatch}
            setMatchValue={setMatchValue}
            matchValue={matchValue}
            userFavourStructureValue={userFavourStructureValue}
            handleCustomUpdate={handleCustomUpdate}
            settingRegex={settingRegex}
            setSettingRegex={setSettingRegex}
          />
        ))}
      </div>
      {settingRegex.length > 0 && (
        <div className="circle-parent">
          <span className="circle1"></span>
        </div>
      )}
    </main>
  );
}
