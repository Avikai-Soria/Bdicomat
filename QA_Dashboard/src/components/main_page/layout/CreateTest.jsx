import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../reusable_component/Header.jsx";
import { useContext } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";

const CreateTest = () => {
  const { apiKey } = useContext(UserInfoContext);

  const handleFormSubmit = (values) => {
    // Construct the body based on user's input
    const body = {
      name: values.name,
      description: values.description,
      expectedResult: values.expectedResult,
      configuration: values.configuration,
      domain: values.domain || null, // Will be null if left empty
      version: values.version || null, // Will be null if left empty
      type: values.type,
    };

    // Call your apiFetch function
    apiFetch("tests", "POST", apiKey, body)
      .then((response) => {
        if (response.statusCode === 201) {
          alert("Succeeded");
        } else {
          alert("Error occurred");
        }
      })
      .catch((error) => {
        console.error("An error occurred while creating the test:", error);
        alert("An error occurred");
      });
  };

  return (
    <Box m="20px">
      <Header title="CREATE TEST" subtitle="Create a New Test" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={testSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="filled"
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Expected Result"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.expectedResult}
              name="expectedResult"
              error={!!touched.expectedResult && !!errors.expectedResult}
              helperText={touched.expectedResult && errors.expectedResult}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Configuration"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.configuration}
              name="configuration"
              error={!!touched.configuration && !!errors.configuration}
              helperText={touched.configuration && errors.configuration}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Domain"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.domain}
              name="domain"
              error={!!touched.domain && !!errors.domain}
              helperText={touched.domain && errors.domain}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Version"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.version}
              name="version"
              error={!!touched.version && !!errors.version}
              helperText={touched.version && errors.version}
            />
            <FormControl fullWidth variant="filled">
              <InputLabel>Type</InputLabel>
              <Select
                value={values.type}
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!touched.type && !!errors.type}
              >
                <MenuItem value="regression">Regression</MenuItem>
                <MenuItem value="smoke">Smoke</MenuItem>
                <MenuItem value="functional">Functional</MenuItem>
                <MenuItem value="load">Load</MenuItem>
              </Select>
              {touched.type && errors.type && <div>{errors.type}</div>}
            </FormControl>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create Test
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const testSchema = yup.object().shape({
  name: yup.string().min(1).required(),
  description: yup.string().required(),
  expectedResult: yup.string().required(),
  configuration: yup.string().required(),
  domain: yup.string().nullable().notRequired(),
  version: yup.string().nullable().notRequired(),
  type: yup
    .string()
    .oneOf(["regression", "smoke", "functional", "load"], "Invalid type")
    .required(),
});

const initialValues = {
  name: "",
  description: "",
  expectedResult: "",
  configuration: "",
  domain: "",
  version: "",
  type: "",
};

export default CreateTest;
