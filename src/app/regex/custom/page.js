"use client";
import { useEffect, useState } from "react";

const Page = () => {
    const regexData = [
        {
            label: "Character Class",
            data: [
                {
                    name: "characterSet",
                    active: false,
                    value: "(?=^.{8,}$)",
                    realValue: "(?=^.{8,}$)",
                },
                {
                    name: "negatedSet",
                    active: false,
                    value: "((?=.*d)|(?=.*W+))",
                    realValue: "((?=.*d)|(?=.*W+))",
                },
                {
                    name: "range",
                    active: false,
                    value: "(?=.*[A-Z])(?=.*[a-z])",
                    realValue: "(?=.*[A-Z])(?=.*[a-z])",
                },
                {
                    name: "matchAny",
                    active: false,
                    value: "(?=^.{8,}$)((?=.*\\d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
                    realValue: "(?=^.{8,}$)((?=.*\\d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
                },
                {
                    name: "word",
                    active: false,
                    // prettier-ignore
                    value: "\\w",
                    realValue: "\\w",
                },
                {
                    name: "notWord",
                    active: false,
                    value: "\\W",
                    realValue: "\\W",
                },
                {
                    name: "digit",
                    active: false,
                    // prettier-ignore
                    value: "(\\d{3})",
                    realValue: "\\d",
                },
                {
                    name: "notDigit",
                    active: false,
                    value: "\\D",
                    realValue: "\\D",
                },
                {
                    name: "whiteSpace",
                    active: false,
                    value: "\\s",
                    realValue: "\\s",
                },
                {
                    name: "notWhiteSpace",
                    active: false,
                    value: "\\S",
                    realValue: "\\S",
                },
            ],
        },
        {
            label: "Anchors",
            data: [
                {
                    name: "start",
                    active: false,
                    value: "^",
                    realValue: "^",
                },
                {
                    name: "end",
                    active: false,
                    value: "$",
                    realValue: "$",
                },
                {
                    name: "wordBoundary",
                    active: false,
                    value: "b",
                    realValue: "b",
                },
                {
                    name: "notWordBoundary",
                    active: false,
                    value: "B",
                    realValue: "B",
                },
            ],
        },
        {
            label: "escapedCharacter",
            data: [
                {
                    name: "octalEscape",
                    active: false,
                    value: "0",
                    realValue: "0",
                },
                {
                    name: "hexadecimalEscape",
                    active: false,
                    value: "xFF",
                    realValue: "xFF",
                },
                {
                    name: "unicodeEscape",
                    active: false,
                    value: "uFFFF",
                    realValue: "uFFFF",
                },
                {
                    name: "controlCharacter",
                    active: false,
                    value: "cI",
                    realValue: "cI",
                },
                {
                    name: "tab",
                    active: false,
                    value: "t",
                    realValue: "t",
                },
                {
                    name: "lineFeed",
                    active: false,
                    value: "n",
                    realValue: "n",
                },
                {
                    name: "verticalTab",
                    active: false,
                    value: "v",
                    realValue: "v",
                },
                {
                    name: "formFeed",
                    active: false,
                    value: "f",
                    realValue: "f",
                },
                {
                    name: "carriageReturn",
                    active: false,
                    value: "r",
                    realValue: "r",
                },
                {
                    name: "nullCharacter",
                    active: false,
                    value: "0",
                    realValue: "0",
                },
            ],
        },
        {
            label: "groupReference",
            data: [
                {
                    name: "capturingGroup",
                    active: false,
                    value: "(ABC)",
                    realValue: "(ABC)",
                },
                {
                    name: "namedCapturingGroup",
                    active: false,
                    value: "(?<name>ABC)",
                    realValue: "(?<name>ABC)",
                },
                {
                    name: "numericBackReference",
                    active: false,
                    value: "1",
                    realValue: "1",
                },
                {
                    name: "nonCapturingGroup",
                    active: false,
                    value: "(?:ABC)",
                    realValue: "(?:ABC)",
                },
            ],
        },
        {
            label: "lookaHead",
            data: [
                {
                    name: "positiveLookAhead",
                    active: false,
                    value: "(?=ABC)",
                    realValue: "(?=ABC)",
                },
                {
                    name: "negativeLookAhead",
                    active: false,
                    value: "(?!ABC)",
                    realValue: "(?!ABC)",
                },
                {
                    name: "positiveLookBehind",
                    active: false,
                    value: "(?<=ABC)",
                    realValue: "(?<=ABC)",
                },
                {
                    name: "negativeLookBehind",
                    active: false,
                    value: "(?<!ABC)",
                    realValue: "(?<!ABC)",
                },
            ],
        },
        {
            label: "quantityAlternation",
            data: [
                {
                    name: "plus",
                    active: false,
                    value: "+",
                    realValue: "+",
                },
                {
                    name: "star",
                    active: false,
                    value: "*",
                    realValue: "*",
                },
                {
                    name: "quantifier",
                    active: false,
                    value: "{1,3}",
                    realValue: "{1,3}",
                },
                {
                    name: "optional",
                    active: false,
                    value: "?",
                    realValue: "?",
                },
                {
                    name: "lazy",
                    active: false,
                    value: "?",
                    realValue: "?",
                },
                {
                    name: "alternation",
                    active: false,
                    value: "|",
                    realValue: "|",
                },
            ],
        },
        {
            label: "substitution",
            data: [
                {
                    name: "match",
                    active: false,
                    value: "$&",
                    realValue: "$&",
                },
                {
                    name: "captureGroup",
                    active: false,
                    value: "$1",
                    realValue: "$1",
                },
                {
                    name: "beforeMatch",
                    active: false,
                    value: "$`",
                    realValue: "$`",
                },
                {
                    name: "afterMatch",
                    active: false,
                    value: "$'",
                    realValue: "$'",
                },
                {
                    name: "escapedDollar",
                    active: false,
                    value: "$$",
                    realValue: "$$",
                },
                {
                    name: "escapedCharacter",
                    active: false,
                    value: "n",
                    realValue: "n",
                },
            ],
        },
        {
            label: "flag",
            data: [
                {
                    name: "global",
                    active: false,
                    value: "g",
                    realValue: "g",
                },
                {
                    name: "ignoreCase",
                    active: false,
                    value: "i",
                    realValue: "i",
                },
                {
                    name: "multiline",
                    active: false,
                    value: "m",
                    realValue: "m",
                },
                {
                    name: "unicode",
                    active: false,
                    value: "u",
                    realValue: "u",
                },
                {
                    name: "sticky",
                    active: false,
                    value: "y",
                    realValue: "y",
                },
                {
                    name: "dotAll",
                    active: false,
                    value: "s",
                    realValue: "s",
                },
            ],
        },
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
            ],
        },
    ];
    const [regexClassMenu, setRegexClassMenu] = useState(null);
    const handleClassMenu = (index) => {
        setRegexClassMenu(index);
    };
    const [checkValue, setCheckValue] = useState([]);
    const [regex, setRegex] = useState("");

    const [flag, setFlag] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        try {
            // const flagData = flag.map((item) => item.value).join("");
            const regex = new RegExp(checkValue.map((item) => item.value).join(""));
            setRegex(regex);
            setError(false);
            console.log(checkValue.map((item) => item.value).join(""));
        } catch (error) {
            setError(true);
        }
    }, [checkValue, flag]);
    const [regexCheck, setRegexCheck] = useState(false);
    return (
        <div>
            {regexClassMenu !== null && (
                <button
                    onClick={() => setRegexClassMenu(null)}
                    className="my-4 py-2 px-3 bg-blue-600 rounded-lg text-white"
                >
                    {" "}
                    {"<"} back data
                </button>
            )}
            <ul className="bg-gray-600 w-1/6  rounded-r-md  ">
                {regexData.map((item, index) => (
                    <li className=" " key={index}>
                        {regexClassMenu === null ? (
                            <button
                                className="  text-white   w-full flex justify-between px-3 py-2 border border-transparent text-base font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={() => handleClassMenu(index)}
                            >
                                <span className="capitalize">{item.label}</span>
                                <span> {">"}</span>
                            </button>
                        ) : (
                            <>
                                {regexClassMenu === index &&
                                    item.data.map((subItem, subIndex) => (
                                        <p
                                            key={subIndex}
                                            className="flex justify-between px-4 py-2 "
                                        >
                                            <span className="capitalize"> {subItem.name} </span>

                                            <span>
                                                {subItem.realValue}{" "}
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => {
                                                            if (item.label === "flag") {
                                                                if (
                                                                    flag.some(
                                                                        (item) =>
                                                                            item.value ===
                                                                            subItem.value
                                                                    )
                                                                ) {
                                                                    setFlag(
                                                                        flag.filter(
                                                                            (item) =>
                                                                                item.value !==
                                                                                subItem.value
                                                                        )
                                                                    );
                                                                } else {
                                                                    setFlag([...flag, subItem]);
                                                                }
                                                            } else {
                                                                setCheckValue([
                                                                    ...checkValue,
                                                                    subItem,
                                                                ]);
                                                            }
                                                        }}
                                                        checked={
                                                            checkValue.some(
                                                                (item) =>
                                                                    item.value === subItem.value
                                                            ) |
                                                            flag.some(
                                                                (item) =>
                                                                    item.value === subItem.value
                                                            )
                                                        }
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </span>
                                        </p>
                                    ))}
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <span>
                {regex.toString()} {regexCheck ? "true" : "false"}
            </span>

            <div>
                <form
                    action=""
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <input
                        className="border-2 my-5"
                        onChange={(e) => {
                            setRegexCheck(regex.test(e.target.value));
                        }}
                    ></input>
                    <input type="submit" className="cursor-pointer"></input>
                </form>
            </div>
            {error && <div className="text-red-500">invalide regex please try another one</div>}
        </div>
    );
};

export default Page;
