import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
// import { Radio } from "final-form-material-ui";

import "./App.css";

// Thin wrapper from final-form-material-ui lib
const RadioWrapper = ({
  input: { checked, value, name, onChange, ...restInput },
  meta,
  ...rest
}) => (
  <Radio
    {...rest}
    name={name}
    inputProps={restInput}
    onChange={onChange}
    checked={checked}
    value={value}
  />
);

const allData = [
  {
    troupe: { value: "stooges", label: "The Three Stooges" },
    members: [
      { value: "larry", label: "Larry" },
      { value: "moe", label: "Moe" },
      { value: "curly", label: "Curly" }
    ]
  },
  {
    troupe: { value: "marx", label: "The Marx Brothers" },
    members: [
      { value: "chico", label: "Chico" },
      { value: "harpo", label: "Harpo" },
      { value: "groucho", label: "Groucho" },
      { value: "zeppo", label: "Zeppo" }
    ]
  },
  {
    troupe: { value: "nobody", label: "No existent" }, members: []
  }
];

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const RadioFormControlItem = ({ data, value, name, label }) => {
  const margin = data.members  ? 0 : 30;

  return (
    <>
      <div name="wrapperdiv" style={{ marginLeft: margin }}>
        <FormControlLabel
          label={label}
          control={
            <Field
              name={name}
              component={RadioWrapper}
              type="radio"
              value={value}
            />
          }
        />
        {data.members && data.members.length > 0
          ? data.members.map(memberVal => {
              return (
                <RadioFormControlItem
                  key={`${value}~${memberVal.value}`}
                  data={memberVal}
                  name={`${value}~members`}
                  value={memberVal.value}
                  label={memberVal.label}
                />
              );
            })
          : null}
      </div>
    </>
  );
};

class App extends Component {
  renderItems = () => {
    console.log("renderItems ->  props: ", this.props);
  };

  render() {
    return (
      <div style={{ margin: "40px" }}>
        <Form
          onSubmit={onSubmit}
          values={allData}
          render={({ handleSubmit, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <FormControl component="fieldset">
                <FormLabel component="legend">Funny groups:</FormLabel>
                <RadioGroup>
                  {allData.map(value => {
                    return (
                      <RadioFormControlItem
                        key={`troupe~${value.troupe.value}`}
                        data={value}
                        name={`troupe`}
                        value={value.troupe.value}
                        label={value.troupe.label}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </form>
          )}
        />
      </div>
    );
  }
}

export default App;
