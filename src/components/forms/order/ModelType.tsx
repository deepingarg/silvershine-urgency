import { Typography, Divider, TextField, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTabs from "@/components/CustomTabs";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";

// === OPTIONS ===
const modelOptions = ["SUPAGAL", "GALVANIZED"];
const modelTypeOptions = [
  "HOLLOW CHANNEL",
  "KICK-UP",
  "TRUSS Chassis",
  "FLAT FlOOR",
];

const initialValues = {
  model: "",
  modelType: "",
  stepComments: "",
};

const validationSchema = Yup.object().shape({
  // Add validation if needed
});

const ModelType = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={(values) => {
        handleNext();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          {/* === Model Section === */}
          <div>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Model:
            </Typography>
            <Divider className="my-2" />
            <CustomTabs
              name="model"
              options={modelOptions}
              onChange={(val) => setFieldValue("model", val)}
            />
          </div>

          {/* === Model Type Section === */}
          <div>
            <Typography variant="body1" sx={{ mb: 1 }} className="mt-4">
              Model Type:
            </Typography>
            <CustomTabs
              name="modelType"
              options={modelTypeOptions}
              onChange={(val) => setFieldValue("modelType", val)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              multiline
              rows={3}
              className="mt-6"
              label="Comments"
              name="stepComments"
              value={values.stepComments}
              onChange={(e) => setFieldValue("stepComments", e.target.value)}
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

export default ModelType;
