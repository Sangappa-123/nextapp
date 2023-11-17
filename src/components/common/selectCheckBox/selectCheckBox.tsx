"use client";

import GenericSelect from "../GenericSelect/index";
import selectStyle from "./selectCheckBoxStyle.module.scss";

export default function App() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className={selectStyle.App}>
      <GenericSelect isMulti options={options} className={selectStyle.GenericSelect} />
    </div>
  );
}
