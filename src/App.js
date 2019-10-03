import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";

import "./App.css";

// Thin wrapper from final-form-material-ui lib, which is used in the example on
// the React Final Form docs, but is not mentioned in the docs themselves!
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
    value: "stooges",
    label: "The Three Stooges",
    members: [
      { value: "larry", label: "Larry" },
      { value: "moe", label: "Moe" },
      { value: "curly", label: "Curly" }
    ]
  },
  {
    value: "marx",
    label: "The Marx Brothers",
    members: [
      { value: "chico", label: "Chico" },
      { value: "harpo", label: "Harpo" },
      {
        value: "groucho",
        label: "Groucho",
        members: [
          { value: "cigar", label: "Cigar" },
          { value: "moustache", label: "Moustache" },
          { value: "stoopedwalk", label: "Stooped walk" }
        ]
      },
      { value: "zeppo", label: "Zeppo" }
    ]
  },
  {
    value: "nobody",
    label: "No existent"
  }
];

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const RadioFormControlItem = ({ data, name }) => {

  return (
    <>
      <ul>
        <FormControlLabel
          label={data.label}
          control={
            <Field
              name={`field~${name}`}
              component={RadioWrapper}
              type="radio"
              value={data.value}
            />
          }
        />
        {data.members && data.members.length > 0
          ? data.members.map(memberVal => {
              return (
                <RadioFormControlItem
                  key={`${data.value}~${memberVal.value}`}
                  data={memberVal}
                  name={`${data.value}~members`}
                />
              );
            })
          : null}
      </ul>
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
                  {allData.map(data => {
                    return (
                      <RadioFormControlItem
                        key={data.value}
                        data={data}
                        name="toplevel"
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
