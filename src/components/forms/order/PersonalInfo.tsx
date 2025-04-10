import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Box, Grid, TextField } from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/ui/CustomButton";

interface FormValues {
  Phone: string;
  Email: string;
  Address: string;
  Comments: string;
}

const validationSchema = Yup.object({
  Phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  Email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  Address: Yup.string().required("Address is required"),
  // Comments: Yup.string().required("Comments are required"),
});

const PersonalInfo = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  useEffect(() => {
    const values = formikRef.current?.values;

    if (values?.Phone && values?.Email && values?.Address) {
      const payload = {
        phone: values.Phone,
        email: values.Email,
        address: values.Address,
      };
      localStorage.setItem("customerData", JSON.stringify(payload));
    }
  }, [
    formikRef.current?.values.Phone,
    formikRef.current?.values.Email,
    formikRef.current?.values.Address,
  ]);

  return (
    <Formik<FormValues>
      initialValues={{
        Phone: "",
        Email: "",
        Address: "",
        Comments: "",
      }}
      innerRef={formikRef}
      validationSchema={validationSchema}
      onSubmit={() => handleNext()}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Grid container spacing={2}>
            {[
              { name: "Phone", label: "Phone" },
              { name: "Email", label: "Email" },
              { name: "Address", label: "Address" },
              { name: "Comments", label: "Comments" },
            ].map(({ name, label }) => (
              <Grid size={12} sx={{ mb: 2 }} key={name}>
                <TextField
                  label={label}
                  name={name}
                  fullWidth
                  variant="outlined"
                  value={values[name as keyof FormValues]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched[name as keyof FormValues] &&
                    Boolean(errors[name as keyof FormValues])
                  }
                  helperText={
                    touched[name as keyof FormValues] &&
                    errors[name as keyof FormValues]
                  }
                  multiline={name === "Comments"}
                  rows={name === "Comments" ? 4 : undefined}
                  size="small"
                />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              position: "absolute",
              right: 20,
              pt: 4,
            }}
          >
            <CustomButton type="submit">Next</CustomButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
});

export default PersonalInfo;
