import React, { ChangeEvent, useState } from "react";
import { SelectorType } from "../types/type";

type SelectorFormPropsType = {
  selector: SelectorType;
  onChange: (updatedSelector: SelectorType) => void;
  onDelete: () => void;
}

export const SelectorForm: React.FC<SelectorFormPropsType> = ({
  selector,
  onChange,
  onDelete,
}) => {
  const [name, setName] = useState(selector.name);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    onChange({ ...selector, name: newName });
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        className="text-gray-800 border-2 border-gray-300 rounded-md p-2"
      />
      <button
        onClick={onDelete}
        className="bg-red-500 text-white rounded-md p-2"
      >
        Delete
      </button>
    </div>
  );
};
