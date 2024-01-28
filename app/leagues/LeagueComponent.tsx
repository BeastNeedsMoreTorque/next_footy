//import React from 'react';

const SelectDropdown = ({ selectedValue, onChange, options }) => {
  return (
    <select value={selectedValue} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
