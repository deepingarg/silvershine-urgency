import React, { forwardRef, useImperativeHandle, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form } from "formik";
import CustomTabs from "@/components/CustomTabs";
import CustomButton from "@/components/ui/CustomButton";

const waterTankQtyLabels = {
  front: "Front 95L",
  between: "Between 95L",
  rear: "Rear 95L",
  grey: "Grey 95L",
};

const gasHolderQtyLabels = {
  kg45: "45KG",
  kg9: "9KG",
  loose: "Loose",
};

type WaterTankKey = keyof typeof waterTankQtyLabels; // 'front' | 'between' | 'rear' | 'grey'
type GasHolderKey = keyof typeof gasHolderQtyLabels; // 'kg45' | 'kg9' | 'loose'

const yesNoOptions = ["YES", "NO"];

const initialValues = {
  waterTankOptions: {
    front: false,
    between: false,
    rear: false,
    grey: false,
  },
  waterTankQty: {
    front: "",
    between: "",
    rear: "",
    grey: "",
  },
  waterTankCover: "",
  gasHolderOptions: {
    kg45: false,
    kg9: false,
    loose: false,
  },
  gasHolderQty: {
    kg45: "",
    kg9: "",
    loose: "",
  },
  yesNoOptions: "",
  comments: "",
};

const WaterGasConfiguration = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  return (
    <Formik
      initialValues={initialValues}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Box>
            <Typography variant="body1">Water Tank Configuration</Typography>
            <Grid container spacing={2}>
              {Object.entries(values.waterTankOptions).map(([key, checked]) => {
                const typedKey = key as WaterTankKey;
                return (
                  <Grid size={3} key={typedKey}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) =>
                            setFieldValue(
                              `waterTankOptions.${typedKey}`,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={
                        waterTankQtyLabels[
                          key as keyof typeof waterTankQtyLabels
                        ]
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>

            <Grid container spacing={2} mt={2}>
              {Object.entries(values.waterTankOptions).map(([key, checked]) => {
                const typedKey = key as WaterTankKey;
                return (
                  checked && (
                    <Grid size={6} key={typedKey}>
                      <TextField
                        fullWidth
                        size="small"
                        label={`${waterTankQtyLabels[typedKey]}Qty`}
                        value={values.waterTankQty[typedKey]}
                        onChange={(e) =>
                          setFieldValue(
                            `waterTankQty.${typedKey}`,
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  )
                );
              })}
            </Grid>
          </Box>
          <Box sx={{ pt: 2, pb: 2 }}>
            <Typography variant="body1">Water tank covers</Typography>
            <CustomTabs
              name="waterTankCover"
              options={yesNoOptions}
              onChange={(val) => setFieldValue("waterTankCover", val)}
            />
          </Box>

          <Box>
            <Typography variant="body1">Gas Holder</Typography>
            <Grid container spacing={2}>
              {Object.entries(values.gasHolderOptions).map(([key, checked]) => {
                const typedKey = key as GasHolderKey;
                return (
                  <Grid size={3} key={typedKey}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) =>
                            setFieldValue(
                              `gasHolderOptions.${typedKey}`,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={gasHolderQtyLabels[typedKey]}
                    />
                  </Grid>
                );
              })}
            </Grid>

            <Grid container spacing={2} mt={2}>
              {Object.entries(values.gasHolderOptions).map(([key, checked]) => {
                const typedKey = key as GasHolderKey;
                return (
                  checked && (
                    <Grid size={6} key={typedKey}>
                      <TextField
                        fullWidth
                        size="small"
                        label={`${gasHolderQtyLabels[typedKey]}Qty`}
                        value={values.gasHolderQty[typedKey]}
                        onChange={(e) =>
                          setFieldValue(
                            `gasHolderQty.${typedKey}`,
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  )
                );
              })}
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
              label="Comments"
              fullWidth
              multiline
              minRows={3}
              size="small"
              name="comments"
              value={values.comments}
              onChange={(e) => setFieldValue("comments", e.target.value)}
            />
          </Box>
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

export default WaterGasConfiguration;
