import React from "react";

export default function Subreadits({ selectedSubreadit, subreadits }) {
  const subreaditsJsx = subreadits.map(subreadit => {
    if (subreadit.name === selectedSubreadit) {
      return <div className="subreadit subreadit-selected">{subreadit.name}</div>
    } else {
      return <div className="subreadit">{subreadit.name}</div>
    }
  })
  return (
    <div className="subreadits">
      {subreaditsJsx}
    </div>
  )
}
