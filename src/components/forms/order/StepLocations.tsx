import * as Yup from "yup";
import CustomTabs from "@/components/CustomTabs";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";

// === OPTIONS ===
const stepLocationOptions = ["Step Bracket Only", "Front", "Rear"];
const stepSizeOptions = ["625X185", "Custom"];
const yesNoOptions = ["YES", "NO"];

const initialValues = {
  stepLocation: "",
  stepSize: "",
  roundedCorners: "",
  brackets: "",
  locationComments: "",
};

const validationSchema = Yup.object().shape({
  // Add validation if needed
});

const StepLocations = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={() => {
        handleNext();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          {/* === Step Location === */}
          <div>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Step Location
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <CustomTabs
              name="stepLocation"
              options={stepLocationOptions}
              onChange={(val) => setFieldValue("stepLocation", val)}
            />
          </div>

          {/* === Conditional Section === */}
          {(values.stepLocation === "Front" ||
            values.stepLocation === "Rear") && (
            <>
              {/* Step Size */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Step Size:
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <CustomTabs
                  name="stepSize"
                  options={stepSizeOptions}
                  onChange={(val) => setFieldValue("stepSize", val)}
                />
              </div>

              {/* Rounded Corners */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Rounded Corners:
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <CustomTabs
                  name="roundedCorners"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("roundedCorners", val)}
                />
              </div>

              {/* Brackets */}
              <div>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Brackets:
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <CustomTabs
                  name="brackets"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("brackets", val)}
                />
              </div>
            </>
          )}

          {/* === Comments Section === */}
          <div>
            <TextField
              fullWidth
              multiline
              rows={3}
              className="mt-6"
              label="Comments"
              name="locationComments"
              value={values.locationComments}
              onChange={(e) =>
                setFieldValue("locationComments", e.target.value)
              }
            />
          </div>
          <Box
            sx={{
              position: "absolute",
              right: 20,
              pt: 1,
            }}
          >
            <CustomButton type="submit">Next</CustomButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
});

export default StepLocations;
