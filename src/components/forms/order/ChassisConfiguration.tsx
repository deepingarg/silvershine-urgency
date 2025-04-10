import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Formik, Form } from "formik";
import { Grid, Typography, TextField, Box } from "@mui/material";
import CustomTabs from "@/components/CustomTabs";
import CustomButton from "@/components/ui/CustomButton";

const ChassisConfiguration = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  return (
    <Formik
      initialValues={{
        chassisRaiser: "",
        couplingType: "",
        zSection: "",
        couplingPosition: "",
        customCouplingType: "",
        otherZSection: "",
        comment: "",
      }}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={2}>
            {/* Chassis Raiser */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Chassis Raiser
              </Typography>
              <CustomTabs
                name="chassisRaiser"
                options={["2''-50mm", "3''-75mm", "4mm", "6''-150mm"]}
              />
            </Grid>

            {/* Coupling Type */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Coupling Type
              </Typography>
              <CustomTabs
                name="couplingType"
                options={["STD", "DO35", "DO45", "Custom"]}
              />
              {values.couplingType === "Custom" && (
                <TextField
                  label="Custom Coupling Type"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                  value={values.customCouplingType}
                  onChange={(e) =>
                    setFieldValue("customCouplingType", e.target.value)
                  }
                />
              )}
            </Grid>

            {/* Z-Section */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Z-Section
              </Typography>
              <CustomTabs
                name="zSection"
                options={["22", "44", "L", "Other"]}
              />
              {values.zSection === "Other" && (
                <TextField
                  label="Other Z-Section"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                  value={values.otherZSection}
                  onChange={(e) =>
                    setFieldValue("otherZSection", e.target.value)
                  }
                />
              )}
            </Grid>

            {/* Coupling Position */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Coupling Position
              </Typography>
              <CustomTabs
                name="couplingPosition"
                options={["Top", "Middle", "Bottom"]}
              />
            </Grid>

            {/* Comment */}
            <Grid size={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Comment
              </Typography>
              <TextField
                label="Comment"
                fullWidth
                multiline
                rows={3}
                size="small"
                value={values.comment}
                onChange={(e) => setFieldValue("comment", e.target.value)}
              />
            </Grid>
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

export default ChassisConfiguration;
