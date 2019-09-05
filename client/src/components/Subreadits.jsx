import React from "react";

export default function Subreadits({
  selectedSubreadit,
  subreadits,
  changeSubreadit
}) {
  const subreaditsWithEverything = [{id: 0, name: 'everything'}].concat(subreadits)
  const subreaditsJsx = subreaditsWithEverything.map(subreadit => {
    if (subreadit.name === selectedSubreadit) {
      return (
        <button
          key={subreadit.id}
          className="subreadit subreadit-selected"
          value={subreadit.name}
          onClick={changeSubreadit}
        >
          {subreadit.name}
        </button>
      );
    } else {
      return (
        <button
          key={subreadit.id}
          className="subreadit"
          value={subreadit.name}
          onClick={changeSubreadit}
        >
          {subreadit.name}
        </button>
      );
    }
  });
  return <div className="subreadits">{subreaditsJsx}</div>;
}
