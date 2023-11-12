"use client";
import { regexData } from "@/components/regexdata";
import { useEffect, useState } from "react";

const Page = () => {
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
      const regex = new RegExp(checkValue.map((item) => item.value).join(""));

      setRegex(regex);
      setError(false);
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
                                    (item) => item.value === subItem.value
                                  )
                                ) {
                                  setFlag(
                                    flag.filter(
                                      (item) => item.value !== subItem.value
                                    )
                                  );
                                } else {
                                  setFlag([...flag, subItem]);
                                }
                              } else {
                                if (
                                  checkValue.some(
                                    (item) => item.value === subItem.value
                                  )
                                ) {
                                  setCheckValue(
                                    checkValue.filter(
                                      (item) => item.value !== subItem.value
                                    )
                                  );
                                } else setCheckValue([...checkValue, subItem]);
                              }
                            }}
                            checked={
                              checkValue.some(
                                (item) => item.value === subItem.value
                              ) |
                              flag.some((item) => item.value === subItem.value)
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
        {/* {regexCheck ? "true" : "false"} */} {regex.toString()}
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
      {error && (
        <div className="text-red-500">
          invalide regex please try another one
        </div>
      )}
    </div>
  );
};

export default Page;
