import React from "react";

const ContextMenu = ({ position, onOptionClick }) => {
  if (!position) return null;

  const options = [
    { label: "Bold", syntax: "**" },
    { label: "Italic", syntax: "*" },
    { label: "Code", syntax: "`" },
    { label: "Strikethrough", syntax: "~~" },
  ];

  return (
    <div
      className="absolute bg-white shadow-lg rounded-md p-2 z-10"
      style={{ top: position.y, left: position.x }}
    >
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => onOptionClick(option.syntax)}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
