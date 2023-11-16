import React from "react";

const Settings = ({
  item,
  index,
  settingToggle,
  setSettingToggle,
  customUpRegex,
  setCustomUpRegex,
  newMatch,
  setMatchValue,
  matchValue,
  userFavourStructureValue,
  handleCustomUpdate,
  settingRegex,
  setSettingRegex,
}) => {
  return (
    <div className="flex justify-between border py-4 px-5 my-5   w-1/2 ">
      <h1>{item}</h1>
      {index == settingToggle && (
        <form
          className="absolute top-0 right-1   flex flex-col space-y-1 bg-white w-5/12"
          onSubmit={(e) =>
            handleCustomUpdate(e, item, index, settingRegex[index + 1])
          }>
          <h1 className="py-3 px-4 text-center bg-gray-50 mb-2 text-xl">
            selectedItem : {item}
          </h1>
          <input
            placeholder="regex minimum value length"
            className="border py-4 px-3"
            type="number"
            min="1"
            minLength="1"
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
            value={customUpRegex[index + 3] || ""}
            onChange={(e) => {
              setCustomUpRegex({
                ...customUpRegex,
                [index + 3]: e.target.value,
              });
            }}
          />

          <input
            placeholder="enter acceptable word"
            className={` ${
              newMatch ? "border border-red-500" : "border"
            }  py-4 px-3`}
            // required={matchValue}
            value={customUpRegex[index + 4] || ""}
            onChange={(e) => {
              setCustomUpRegex({
                ...customUpRegex,
                [index + 4]: e.target.value,
              });
              console.log("--", customUpRegex[index + 3] === e.target.value);
              if (customUpRegex[index + 3] === e.target.value) {
                setMatchValue(true);
              } else {
                setMatchValue(false);
              }
            }}
          />

          {matchValue && <span>Matched value not submitted</span>}

          {
            <select
              className="border py-4 px-3"
              value={customUpRegex[index + 5]}
              onChange={(e) => {
                setCustomUpRegex({
                  ...customUpRegex,
                  [index + 5]: e.target.value,
                });
              }}>
              <option value={item}>{item}</option>
              {userFavourStructureValue
                .filter((i, idx) => i !== item)
                .map((items, idx) => (
                  <option key={idx} value={items}>
                    {items}
                  </option>
                ))}
            </select>
          }

          <button
            className="border hover:underline py-2 px-3 text-green-400"
            type="submit">
            submit
          </button>
        </form>
      )}
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => {
            //   setSettingToggle(index);
            settingToggle == index
              ? setSettingToggle(null)
              : setSettingToggle(index);
          }}
          checked={settingToggle == index ? true : false}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Settings;
