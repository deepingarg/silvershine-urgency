import * as Yup from "yup";
import { Box, Grid, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";

interface FormValues {
  chassisWidth: string;
  chassisFront: string;
  chassisWheelArch: string;
  chassisRear: string;
  chassisTotalLength: string;
  chassisOverhang: string;
  chassisFloorJoint: string;
  comments: string;
}

const validationSchema = Yup.object({
  chassisWidth: Yup.number()
    .typeError("Enter a valid number")
    .required("Chassis Width is required"),
  chassisFront: Yup.number()
    .typeError("Enter a valid number")
    .required("Chassis Front Width is required"),
  chassisWheelArch: Yup.number()
    .typeError("Enter a valid number")
    .required("Chassis Wheel Arch is required"),
  chassisRear: Yup.number()
    .typeError("Enter a valid number")
    .required("Chassis Rear is required"),
  chassisTotalLength: Yup.number()
    .typeError("Enter a valid number")
    .required("Chassis Total Length is required"),
  chassisOverhang: Yup.number()
    .typeError("Enter a valid number")
    .required("Chassis Overhang is required"),
  chassisFloorJoint: Yup.number()
    .typeError("Enter a valid number")
    .required("Chassis Floor Joint is required"),
});

const ChassisDimensions = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  return (
    <Formik<FormValues>
      initialValues={{
        chassisWidth: "",
        chassisFront: "",
        chassisWheelArch: "",
        chassisRear: "",
        chassisTotalLength: "",
        chassisOverhang: "",
        chassisFloorJoint: "",
        comments: "",
      }}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => {
        // Do calculation here
        useEffect(() => {
          const front = parseFloat(values.chassisFront);
          const wheelArch = parseFloat(values.chassisWheelArch);
          const rear = parseFloat(values.chassisRear);
          const total = front + wheelArch + rear;

          if (!isNaN(total)) {
            setFieldValue("chassisTotalLength", total.toString());
          }
        }, [values.chassisFront, values.chassisWheelArch, values.chassisRear]);

        return (
          <Form>
            <Grid container spacing={2}>
              {[
                { name: "chassisWidth", label: "Chassis Width" },
                { name: "chassisFront", label: "Chassis Front" },
                { name: "chassisWheelArch", label: "Chassis Wheel Arch" },
                { name: "chassisRear", label: "Chassis Rear" },
                { name: "chassisTotalLength", label: "Chassis Total Length" },
                { name: "chassisOverhang", label: "Chassis Overhang" },
                { name: "chassisFloorJoint", label: "Chassis Floor Joint" },
              ].map(({ name, label }) => (
                <Grid size={6} sx={{ mb: 2 }} key={name}>
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
                    size="small"
                    disabled={name === "chassisTotalLength"} // Optional
                  />
                </Grid>
              ))}
              <Grid size={12}>
                <TextField
                  label="Comments"
                  name="comments"
                  fullWidth
                  variant="outlined"
                  multiline
                  minRows={3}
                  value={values.comments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.comments && Boolean(errors.comments)}
                  helperText={touched.comments && errors.comments}
                  size="small"
                />
              </Grid>
            </Grid>
            <Box
              mt={2}
              sx={{
                position: "absolute",
                right: 20,
                pt: 4,
              }}
            >
              <CustomButton type="submit">Next</CustomButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
});

export default ChassisDimensions;
