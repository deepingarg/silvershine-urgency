import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Formik, Form } from "formik";
import { Grid, Typography, Button, TextField, Box } from "@mui/material";
import CustomButton from "@/components/ui/CustomButton";

const CustomiseSuspension = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  return (
    <Formik
      initialValues={{
        coilSpring: "",
        airbags: "",
        airbagStage: "",
        brakeType: "",
        comment: "",
      }}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={2}>
            {/* Coil Spring */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Coil Spring
              </Typography>
              <Grid display="flex" gap={2}>
                {["YES", "NO"].map((label) => (
                  <Button
                    key={label}
                    sx={{
                      backgroundColor:
                        values.coilSpring === label ? "#cc2e2b" : "#f3f3f3",
                      color: values.coilSpring === label ? "#fff" : "black",
                    }}
                    onClick={() => {
                      setFieldValue(
                        "coilSpring",
                        values.coilSpring === label ? "" : label
                      );
                      if (label === "YES") {
                        setFieldValue("airbags", "");
                        setFieldValue("airbagStage", "");
                      }
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Grid>
            </Grid>

            {/* Airbags (Only if Coil Spring is NO) */}
            {values.coilSpring === "NO" && (
              <Grid size={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Airbags
                </Typography>
                <Grid display="flex" gap={2}>
                  {["YES", "NO"].map((label) => (
                    <Button
                      key={label}
                      sx={{
                        backgroundColor:
                          values.airbags === label ? "#cc2e2b" : "#f3f3f3",
                        color: values.airbags === label ? "#fff" : "black",
                      }}
                      onClick={() => {
                        setFieldValue(
                          "airbags",
                          values.airbags === label ? "" : label
                        );
                        if (label === "NO") {
                          setFieldValue("airbagStage", "");
                        }
                      }}
                    >
                      {label}
                    </Button>
                  ))}
                </Grid>
              </Grid>
            )}

            {/* Airbag Stages (Only if Airbags is YES) */}
            {values.airbags === "YES" && (
              <Grid size={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Select Airbag Stage
                </Typography>
                <Grid display="flex" gap={2}>
                  {["Stage 1", "Stage 2", "Stage 3", "Stage 4"].map((stage) => (
                    <Button
                      key={stage}
                      sx={{
                        backgroundColor:
                          values.airbagStage === stage ? "#cc2e2b" : "#f3f3f3",
                        color: values.airbagStage === stage ? "#fff" : "black",
                      }}
                      onClick={() =>
                        setFieldValue(
                          "airbagStage",
                          values.airbagStage === stage ? "" : stage
                        )
                      }
                    >
                      {stage}
                    </Button>
                  ))}
                </Grid>
              </Grid>
            )}

            {/* Brake Type (Independent Section) */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Brake Type
              </Typography>
              <Grid display="flex" gap={2}>
                {["Disk", "Drum"].map((label) => (
                  <Button
                    key={label}
                    sx={{
                      backgroundColor:
                        values.brakeType === label ? "#cc2e2b" : "#f3f3f3",
                      color: values.brakeType === label ? "#fff" : "black",
                    }}
                    onClick={() =>
                      setFieldValue(
                        "brakeType",
                        values.brakeType === label ? "" : label
                      )
                    }
                  >
                    {label}
                  </Button>
                ))}
              </Grid>
            </Grid>

            {/* Comment */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
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

export default CustomiseSuspension;
