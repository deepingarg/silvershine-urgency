import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Formik, Form } from "formik";
import {
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CustomButton from "@/components/ui/CustomButton";

const WheelsAndTyres = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  const [wheelTypeOptions, setWheelTypeOptions] = useState<string[]>([]);

  const tyreOptions = ["Tyre A", "Tyre B", "Tyre C"];
  const wheelTypeMapping: Record<string, string[]> = {
    "Tyre A": ["Wheel Type A1", "Wheel Type A2"],
    "Tyre B": ["Wheel Type B1", "Wheel Type B2"],
    "Tyre C": ["Wheel Type C1", "Wheel Type C2"],
  };

  const wheelSizeOptions = ["15 inch", "16 inch", "17 inch"];
  const spareWheelOptions = ["YES", "NO"];
  const spareWheelPositionOptions = [
    "UNDERSLUNG",
    "ON AFRAME",
    "ON BUMPER BAR",
  ];
  const noOfSpareWheelOptions = ["1", "2"];

  return (
    <Formik
      initialValues={{
        tyre: "",
        wheelType: "",
        wheelSize: "",
        spareWheel: "",
        noOfSpareWheel: "",
        spareWheelPosition: "",
        comment: "",
      }}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={2}>
            {/* Tyres */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Tyres
              </Typography>
              <Select
                fullWidth
                size="small"
                value={values.tyre}
                onChange={(e) => {
                  const selectedTyre = e.target.value;
                  setFieldValue("tyre", selectedTyre);
                  setWheelTypeOptions(wheelTypeMapping[selectedTyre] || []);
                  setFieldValue("wheelType", ""); // Reset Wheel Type
                  setFieldValue("wheelSize", ""); // Reset Wheel Size
                }}
              >
                <MenuItem value="">None</MenuItem>
                {tyreOptions.map((tyre) => (
                  <MenuItem key={tyre} value={tyre}>
                    {tyre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Wheel Type (Only shown if Tyre is selected) */}
            {values.tyre && (
              <Grid size={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Wheel Type
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  value={values.wheelType}
                  onChange={(e) => {
                    setFieldValue("wheelType", e.target.value);
                    setFieldValue("wheelSize", ""); // Reset Wheel Size
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {wheelTypeOptions.map((wheel) => (
                    <MenuItem key={wheel} value={wheel}>
                      {wheel}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}

            {/* Wheel Size (Only shown if Wheel Type is selected) */}
            {values.wheelType && (
              <Grid size={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Wheel Size
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  value={values.wheelSize}
                  onChange={(e) => setFieldValue("wheelSize", e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  {wheelSizeOptions.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}

            {/* Spare Wheel */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Spare Wheel
              </Typography>
              <Grid display="flex" gap={2}>
                {spareWheelOptions.map((label, index) => (
                  <Button
                    key={index}
                    sx={{
                      backgroundColor:
                        values.spareWheel === label ? "#cc2e2b" : "#f3f3f3",
                      color: values.noOfSpareWheel === label ? "#fff" : "black",
                    }}
                    onClick={() =>
                      setFieldValue(
                        "spareWheel",
                        values.spareWheel === label ? "" : label
                      )
                    }
                  >
                    {label}
                  </Button>
                ))}
              </Grid>
            </Grid>

            {/* Number of Spare Wheels */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                No. of Spare Wheel
              </Typography>
              <Grid display="flex" gap={2}>
                {noOfSpareWheelOptions.map((label, index) => (
                  <Button
                    key={index}
                    sx={{
                      backgroundColor:
                        values.noOfSpareWheel === label ? "#cc2e2b" : "#f3f3f3",
                      color: values.noOfSpareWheel === label ? "#fff" : "black",
                    }}
                    onClick={() =>
                      setFieldValue(
                        "noOfSpareWheel",
                        values.noOfSpareWheel === label ? "" : label
                      )
                    }
                  >
                    {label}
                  </Button>
                ))}
              </Grid>
            </Grid>

            {/* Spare Wheel Position */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Spare Wheel Position
              </Typography>
              <Grid display="flex" gap={2}>
                {spareWheelPositionOptions.map((label, index) => (
                  <Button
                    key={index}
                    sx={{
                      backgroundColor:
                        values.spareWheelPosition === label
                          ? "#cc2e2b"
                          : "#f3f3f3",
                      color:
                        values.spareWheelPosition === label ? "#fff" : "black",
                    }}
                    onClick={() =>
                      setFieldValue(
                        "spareWheelPosition",
                        values.spareWheelPosition === label ? "" : label
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

export default WheelsAndTyres;
