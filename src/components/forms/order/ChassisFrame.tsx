import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTabs from "@/components/CustomTabs";
import CustomButton from "@/components/ui/CustomButton";

// === OPTION CONSTANTS ===
const ChassisFrameMainRailOptions = [
  "6’ x 2” - (150mm x 50mm)",
  "4’ x 2” - (100mm x 50mm)",
];

const AFrameOptions = ["6’ x 2” - (150mm x 50mm)", "4’ x 2” - (100mm x 50mm)"];

const AFrameSizeOptions = ["Standard(1550mm)", "Extended"];

const ExtendedOptions = [
  "1550mm",
  "1600mm",
  "1650mm",
  "1700mm",
  "1750mm",
  "1800mm",
  "1850mm",
  "1900mm",
  "1950mm",
  "2000mm",
  "2050",
  "2100mm",
  "2200mm",
  "2250mm",
  "2300mm",
];

const initialValues = {
  chassisFrameMainRail: "",
  aFrame: "",
  aFrameSize: "",
  extendedSize: "",
  batteryFront: false,
  batteryRear: false,
  frontQty: "",
  rearQty: "",
  frameComments: "",
};

const validationSchema = Yup.object().shape({
  // Optional validation
});

const ChassisFrame = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  const [showExtended, setShowExtended] = useState(false);

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
          <div>
            <Typography variant="body1">Chassis Frame Main Rail</Typography>
            <CustomTabs
              name="chassisFrameMainRail"
              options={ChassisFrameMainRailOptions}
            />
          </div>

          <div>
            <Typography variant="body1">A-Frame</Typography>
            <CustomTabs name="aFrame" options={AFrameOptions} />
          </div>

          <div>
            <Typography variant="body1">A-Frame Size</Typography>
            <CustomTabs
              name="aFrameSize"
              options={AFrameSizeOptions}
              onChange={(val) => setShowExtended(val === "Extended")}
            />
          </div>

          {showExtended && (
            <div>
              <Typography variant="body1" className="mt-4">
                Extended A-Frame Options
              </Typography>
              <CustomTabs name="extendedSize" options={ExtendedOptions} />
            </div>
          )}

          <div>
            <Typography variant="body1" className="mt-6">
              Battery Box
            </Typography>
            <div className="flex gap-6">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.batteryFront || false}
                    onChange={(e) =>
                      setFieldValue("batteryFront", e.target.checked)
                    }
                  />
                }
                label="Front"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.batteryRear || false}
                    onChange={(e) =>
                      setFieldValue("batteryRear", e.target.checked)
                    }
                  />
                }
                label="Rear"
              />
            </div>

            <Grid container spacing={2} className="mt-2">
              {values.batteryFront && (
                <Grid size={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Front Qty"
                    name="frontQty"
                    value={values.frontQty}
                    onChange={(e) => setFieldValue("frontQty", e.target.value)}
                  />
                </Grid>
              )}

              {values.batteryRear && (
                <Grid size={6}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Rear Qty"
                    name="rearQty"
                    value={values.rearQty}
                    onChange={(e) => setFieldValue("rearQty", e.target.value)}
                  />
                </Grid>
              )}
            </Grid>
          </div>

          <div>
            <TextField
              fullWidth
              multiline
              rows={3}
              className="mt-6"
              label="Comments"
              name="frameComments"
              value={values.frameComments}
              onChange={(e) => setFieldValue("frameComments", e.target.value)}
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

export default ChassisFrame;
