import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import logo1 from "../../../../public/assets/logo-1-gtMnTXqJ.jpg";
import logo2 from "../../../../public/assets/logo-2-B_Y7VMks.jpg";
import logo3 from "../../../../public/assets/logo-3-DtfmQg6p.jpg";
import logo4 from "../../../../public/assets/logo-4-7KT6Jd4s.jpg";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import CustomButton from "@/components/ui/CustomButton";

const Suspension = forwardRef(({ handleNext }: any, ref) => {
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getValues: () => formikRef.current?.values,
  }));

  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);

  const offRoadLogos = [
    {
      name: "Logo1",
      src: logo1,
      atms: [
        "2750kg ATM",
        "3000kg ATM",
        "3300kg ATM",
        "3500-4500kg ATM",
        "Custom ATM",
      ],
    },
    {
      name: "Logo2",
      src: logo2,
      atms: [
        "2800kg ATM",
        "3000kg ATM",
        "3300kg ATM",
        "3500-4500kg ATM",
        "Custom ATM",
      ],
    },
    {
      name: "Logo3",
      src: logo3,
      atms: [
        "CROSS COUNTRY",
        "ENDURO X",
        "ENDURO2.7",
        "3300kg ATM",
        "3500-4500kg ATM",
        "Custom ATM",
      ],
    },
    {
      name: "Logo4",
      src: logo4,
      atms: [
        "None",
        "2750kg ATM",
        "3000kg ATM",
        "3300kg ATM",
        "3500kg ATM",
        "3500-4500kg ATM",
        "Custom ATM",
      ],
    },
  ];

  const torflexOptions = ["2000kg", "2200kg", "2500kg", "Custom"];
  const rollerRockerOptions = [
    "1450kg",
    "1600kg",
    "2000kg",
    "2200kg",
    "2500kg",
    "3200kg",
    "3500kg",
    "Custom",
  ];
  const axleOptions = ["Single", "Tandem"];

  return (
    <Formik
      initialValues={{
        suspensionType: "",
        offRoadLogo: "",
        atmOption: "",
        onRoadType: "",
        axleType: "",
        comment: "",
        customATM: "",
        customAxle: "",
      }}
      innerRef={formikRef}
      onSubmit={() => handleNext()}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={2}>
            {/* Suspension Type Selection */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Suspension Type
              </Typography>
              <Grid display="flex" gap={2}>
                {["OFF ROAD", "ON ROAD"].map((label) => (
                  <Button
                    key={label}
                    variant="contained"
                    sx={{
                      backgroundColor:
                        values.suspensionType === label ? "#cc2e2b" : "#f3f3f3",
                      color: values.suspensionType === label ? "#fff" : "black",
                    }}
                    onClick={() => {
                      setFieldValue(
                        "suspensionType",
                        values.suspensionType === label ? "" : label
                      );
                      setSelectedTab(
                        values.suspensionType === label ? null : label
                      );
                      setSelectedLogo(null);
                      setFieldValue("offRoadLogo", "");
                      setFieldValue("atmOption", "");
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Grid>
            </Grid>

            {/* OFF ROAD Section */}
            {selectedTab === "OFF ROAD" && (
              <>
                <Grid size={12}>
                  <Grid display="flex" gap={2}>
                    {offRoadLogos.map((logo) => (
                      <Button
                        key={logo.name}
                        onClick={() => {
                          setSelectedLogo(
                            selectedLogo === logo.name ? null : logo.name
                          );
                          setFieldValue(
                            "offRoadLogo",
                            selectedLogo === logo.name ? "" : logo.name
                          );
                          setFieldValue("atmOption", "");
                        }}
                        sx={{
                          border: "1px solid #ccc",
                          padding: 1,
                          minWidth: "80px",
                          backgroundColor:
                            selectedLogo === logo.name ? "red" : "transparent",
                        }}
                      >
                        <img
                          src={logo.src}
                          alt={logo.name}
                          style={{
                            width: "180px",
                            height: "90px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </Button>
                    ))}
                  </Grid>
                </Grid>

                {/* ATM Options based on Selected Logo */}
                {selectedLogo && (
                  <Grid size={12}>
                    <Grid display="flex" gap={2}>
                      {offRoadLogos
                        .find((logo) => logo.name === selectedLogo)
                        ?.atms.map((atm) => (
                          <Button
                            key={atm}
                            sx={{
                              backgroundColor:
                                values.atmOption === atm
                                  ? "#cc2e2b"
                                  : "#f3f3f3",
                              color:
                                values.atmOption === atm ? "#fff" : "black",
                            }}
                            onClick={() =>
                              setFieldValue(
                                "atmOption",
                                values.atmOption === atm ? "" : atm
                              )
                            }
                          >
                            {atm}
                          </Button>
                        ))}
                    </Grid>
                  </Grid>
                )}
              </>
            )}

            {/* Show TextField for Custom ATM in Off Road */}
            {values.atmOption === "Custom ATM" && (
              <TextField
                label="Enter Custom ATM"
                fullWidth
                size="small"
                sx={{ mt: 2 }}
                value={values.customATM}
                onChange={(e) => setFieldValue("customATM", e.target.value)}
              />
            )}

            {/* ON ROAD Selection */}
            {values.suspensionType === "ON ROAD" && (
              <>
                {/* On Road Type */}
                <Grid size={12}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    ON Road Type
                  </Typography>
                  <Grid display="flex" gap={2}>
                    {["Torflex", "Roller Rocker"].map((label) => (
                      <Button
                        key={label}
                        sx={{
                          backgroundColor:
                            values.onRoadType === label ? "#cc2e2b" : "#f3f3f3",
                          color: values.onRoadType === label ? "#fff" : "black",
                        }}
                        onClick={() => {
                          setFieldValue(
                            "onRoadType",
                            values.onRoadType === label ? "" : label
                          );
                          setFieldValue("atmOption", "");
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </Grid>
                </Grid>

                {/* Torflex Options */}
                {values.onRoadType === "Torflex" &&
                  torflexOptions.map((option) => (
                    <Grid container display="flex" gap={2} flexWrap="wrap">
                      <Grid key={option} size={12}>
                        <Button
                          sx={{
                            backgroundColor:
                              values.atmOption === option
                                ? "#cc2e2b"
                                : "#f3f3f3",
                            color:
                              values.atmOption === option ? "#fff" : "black",
                          }}
                          onClick={() =>
                            setFieldValue(
                              "atmOption",
                              values.atmOption === option ? "" : option
                            )
                          }
                        >
                          {option}
                        </Button>
                      </Grid>
                    </Grid>
                  ))}

                {values.onRoadType === "Torflex" &&
                  values.atmOption === "Custom" && (
                    <TextField
                      label="Enter Custom Torflex ATM"
                      fullWidth
                      size="small"
                      sx={{ mt: 2 }}
                      value={values.customATM}
                      onChange={(e) =>
                        setFieldValue("customATM", e.target.value)
                      }
                    />
                  )}

                {/* Roller Rocker Options */}
                {values.onRoadType === "Roller Rocker" && (
                  <Grid container display="flex" gap={2} flexWrap="wrap">
                    {rollerRockerOptions.map((option) => (
                      <Button
                        key={option}
                        sx={{
                          backgroundColor:
                            values.atmOption === option ? "#cc2e2b" : "#f3f3f3",
                          color: values.atmOption === option ? "#fff" : "black",
                        }}
                        onClick={() =>
                          setFieldValue(
                            "atmOption",
                            values.atmOption === option ? "" : option
                          )
                        }
                      >
                        {option}
                      </Button>
                    ))}
                  </Grid>
                )}

                {/* Show TextField for Custom ATM in Roller Rocker */}
                {values.onRoadType === "Roller Rocker" &&
                  values.atmOption === "Custom" && (
                    <TextField
                      label="Enter Custom Roller Rocker ATM"
                      fullWidth
                      size="small"
                      sx={{ mt: 2 }}
                      value={values.customATM}
                      onChange={(e) =>
                        setFieldValue("customATM", e.target.value)
                      }
                    />
                  )}

                {/* Axle Type */}
                <Grid size={12}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Axle Type
                  </Typography>
                  <Grid display="flex" gap={2}>
                    {axleOptions.map((label) => (
                      <Button
                        key={label}
                        sx={{
                          backgroundColor:
                            values.axleType === label ? "#cc2e2b" : "#f3f3f3",
                          color: values.axleType === label ? "#fff" : "black",
                        }}
                        onClick={() =>
                          setFieldValue(
                            "axleType",
                            values.axleType === label ? "" : label
                          )
                        }
                      >
                        {label}
                      </Button>
                    ))}
                  </Grid>
                </Grid>
              </>
            )}

            {/* Comment Section (Independent) */}
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

export default Suspension;
