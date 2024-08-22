import React from "react";

export default function Select() {
  const [value, setValue] = React.useState("hamster");
  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <label htmlFor="pet-select">Choose a pet:</label>
      <select name="pets" id="pet-select" value={value} onChange={onChange}>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
      <div>{value}</div>
    </div>
  );
}
