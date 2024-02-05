import React from 'react'

export default function Select({ options, onChange, className, id, name, required }) {
   // Use a unique key based on the length of the options array to force re-rendering
  const key = options.length;

  return (
    <select
      key={key}
      onChange={onChange}
      className={className}
      id={id || null}
      name={name}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
