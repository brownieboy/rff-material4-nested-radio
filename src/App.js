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
  }
];

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
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
          initialValues={{ stooge: "larry" }}
          values={allData}
          render={({ handleSubmit, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit} noValidate>
              <FormControl component="fieldset">
                <FormLabel component="legend">Funny groups:</FormLabel>
                <RadioGroup>
                  {allData.map(value => (
                    <FormControlLabel
                      label={value.troupe.label}
                      control={
                        <Field
                          name="troupe"
                          component={RadioWrapper}
                          type="radio"
                          value={value.troupe.value}
                        />
                      }
                    />
                  ))}
                  {/* <FormControlLabel
                    label="Larry"
                    control={
                      <Field
                        name="stooge"
                        component={RadioWrapper}
                        type="radio"
                        value="larry"
                      />
                    }
                  />
                  <FormControlLabel
                    label="Moe"
                    control={
                      <Field
                        name="stooge"
                        component={RadioWrapper}
                        type="radio"
                        value="moe"
                      />
                    }
                  />
                  <FormControlLabel
                    label="Curly"
                    control={
                      <Field
                        name="stooge"
                        component={RadioWrapper}
                        type="radio"
                        value="curly"
                      />
                    }
                  /> */}
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
