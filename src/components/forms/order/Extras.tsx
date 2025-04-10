import * as Yup from "yup";
import CustomTabs from "@/components/CustomTabs";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { forwardRef, useImperativeHandle, useRef } from "react";
import CustomButton from "@/components/ui/CustomButton";

// === OPTIONS ===
const yesNoOptions = ["YES", "NO"];
const paintColourOptions = ["Monument", "Gunmetal", "Matt Black", "Silver"];
const coatingOptions = ["RAPTOR COATING", "EXTREME COATING"];

const initialValues = {
  nudgeBar: "",
  recoveryPoints: "",
  skidPlates: "",
  bikePlate: "",
  wheelBrace: "",
  jack2000: "",
  paintColour: "",
  coatingType: "",
  extrasComments: "",
};

const validationSchema = Yup.object().shape({
  // Add validations if needed
});

const Extras = forwardRef(({ handleNext }: any, ref) => {
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
        <Form className="space-y-8">
          <div>
            <Grid container spacing={2}>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Nudge Bar
                </Typography>
                <CustomTabs
                  name="nudgeBar"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("nudgeBar", val)}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Recovery Points
                </Typography>
                <CustomTabs
                  name="recoveryPoints"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("recoveryPoints", val)}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Skid Plates
                </Typography>
                <CustomTabs
                  name="skidPlates"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("skidPlates", val)}
                />
              </Grid>
            </Grid>
          </div>

          <div>
            <Typography variant="h6" sx={{ mb: 1 }}></Typography>
            <Grid container spacing={2}>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Bike Plate
                </Typography>
                <CustomTabs
                  name="bikePlate"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("bikePlate", val)}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Wheel Brace
                </Typography>
                <CustomTabs
                  name="wheelBrace"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("wheelBrace", val)}
                />
              </Grid>
              <Grid size={4}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Jack 2000
                </Typography>
                <CustomTabs
                  name="jack2000"
                  options={yesNoOptions}
                  onChange={(val) => setFieldValue("jack2000", val)}
                />
              </Grid>
            </Grid>
          </div>

          <div>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Paint Colour
            </Typography>
            <CustomTabs
              name="paintColour"
              options={paintColourOptions}
              onChange={(val) => setFieldValue("paintColour", val)}
            />
          </div>

          <div>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Coating Type
            </Typography>
            <CustomTabs
              name="coatingType"
              options={coatingOptions}
              onChange={(val) => setFieldValue("coatingType", val)}
            />
          </div>

          <div>
            <TextField
              fullWidth
              multiline
              rows={3}
              className="mt-6"
              label="Comments"
              name="extrasComments"
              value={values.extrasComments}
              onChange={(e) => setFieldValue("extrasComments", e.target.value)}
            />
          </div>
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

export default Extras;
