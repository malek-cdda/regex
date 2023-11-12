"use client";

import { useState } from "react";

const Page = () => {
  const regexData = [
    {
      label: "myTarget",
      data: [
        {
          name: "question",
          active: false,
          value: "?",
          realValue: "?",
        },
        {
          name: "equal",
          active: false,
          value: "=",
          realValue: "=",
        },
        {
          name: "dot",
          active: false,
          value: ".",
          realValue: ".",
        },
        {
          name: "uptick",
          active: false,
          value: "^",
          realValue: "^",
        },
        {
          name: "star",
          active: false,
          value: "*",
          realValue: "*",
        },
        {
          name: "bracketleft",
          active: false,
          value: "(",
          realValue: "(",
        },
        {
          name: "bracketright",
          active: false,
          value: ")",
          realValue: ")",
        },
        {
          name: "dollar",
          active: false,
          value: "$",
          realValue: "$",
        },
        {
          name: "a-z",
          active: false,
          value: "[A-Za-z]",
          realValue: "[A-Za-z]",
        },
        {
          name: "plus",
          active: false,
          value: "+",
          realValue: "+",
        },
        {
          name: "or",
          active: false,
          value: "|",
          realValue: "|",
        },
        {
          name: "2ndbraceleft",
          active: false,
          value: "{",
          realValue: "{",
        },
        {
          name: "2ndbraceright",
          active: false,
          value: "}",
          realValue: "}",
        },
        {
          name: "3rdbracketleft",
          active: false,
          value: "[",
          realValue: "[",
        },
        {
          name: "3rdbracketright",
          active: false,
          value: "]",
          realValue: "]",
        },
        {
          name: "point",
          active: false,
          value: "!",
          realValue: "!",
        },
        {
          name: "semiclon",
          active: false,
          value: ",",
          realValue: ",",
        },
        {
          name: "eight",
          active: false,
          value: "8",
          realValue: "8",
        },
        {
          name: "number",
          active: false,
          value: "\\d",
          realValue: "\\d",
        },
        {
          name: "reverseSlash",
          active: false,
          value: "\\",
          realValue: "\\",
        },
        {
          name: "not word",
          active: false,
          value: "\\W",
          realValue: "\\W",
        },
        {
          name: "number",
          active: false,
          value: "\\n",
          realValue: "\\n",
        },
      ],
    },
  ];
  const [createRegexString, setCreateRegexString] = useState("");
  const [error, setError] = useState("");
  const [checkRegex, setCheckRegex] = useState("");
  const handleCreateRegex = () => {
    try {
      const regex = new RegExp(createRegexString);
      setCheckRegex(regex);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <ul className="bg-gray-600 w-1/6  rounded-r-md  ">
        {regexData[0].data.map((data, index) => (
          <li key={index}>
            <button
              className="w-full h-10 bg-gray-500 hover:bg-gray-400 flex justify-between px-3"
              onClick={(e) => {
                e.preventDefault();
                setCreateRegexString(createRegexString + data.value);
              }}
            >
              <span>{data.name}</span> <span>{data.value}</span>
            </button>
          </li>
        ))}
      </ul>
      <h1>{createRegexString}</h1>

      <button
        onClick={(e) => {
          handleCreateRegex();
        }}
      >
        are you want to make regex this string
      </button>
      {error && (
        <p className="text-red-600">
          {error}
          <button
            onClick={() => {
              setCreateRegexString("");
              setError("");
            }}
          >
            clear string
          </button>
        </p>
      )}
      <div>
        {" "}
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="border-2 my-5"
            onChange={(e) => {
              try {
                console.log(checkRegex.test(e.target.value));
              } catch (error) {
                console.log(error.message);
              }
            }}
          ></input>
          <input type="submit" className="cursor-pointer"></input>
        </form>
      </div>
    </div>
  );
};

export default Page;
