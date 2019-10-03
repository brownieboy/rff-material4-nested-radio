import React from "react";
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

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

function App() {
  return (
    <div style={{margin: "40px"}}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ stooge: "larry" }}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <FormControl component="fieldset">
              <FormLabel component="legend">Best Stooge</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  label="Larry"
                  control={
                    <Field
                      name="stooge"
                      component={Radio}
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
                      component={Radio}
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
                      component={Radio}
                      type="radio"
                      value="curly"
                    />
                  }
                />
              </RadioGroup>
            </FormControl>
          </form>
        )}
      />
    </div>
  );
}

export default App;
