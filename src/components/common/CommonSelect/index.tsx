"use client";
import React, { Component } from "react";
import { colourOptions } from "./data.js";
import MySelect from "./SelectComponenet";
import { components } from "react-select";
import commonSelectStyle from "./commonSelect.module.scss";

const Option = (props) => {
  return (
    <div className={commonSelectStyle.options}>
      <components.Option {...props}>
        <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

// const animatedComponents = makeAnimated();
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected,
    });
  };

  render() {
    return (
      <div>
        <MySelect
          options={colourOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option, MultiValue }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
          className={commonSelectStyle.commonSelect}
        />
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Example />, rootElement);
