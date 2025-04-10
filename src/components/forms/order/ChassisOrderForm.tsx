"use client";
import CustomButton from "@/components/ui/CustomButton";
import BumpersAndExterior from "./BumpersAndExterior";
import ChassisConfiguration from "./ChassisConfiguration";
import ChassisDimensions from "./ChassisDimensions";
import ChassisFrame from "./ChassisFrame";
import CustomiseSuspension from "./CustomiseSuspension";
import ModelType from "./ModelType";
import OrderInformations from "./OrderInformations";
import StepLocations from "./StepLocations";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Suspension from "./Suspension";
import WheelsAndTyres from "./WheelsAndTyres";
import toLowerCaseValues from "@/components/toLowerCaseValues";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import Silvershinelogo from "../../../../public/assets/Silvershine.webp";
import fetchAllChassisData from "@/utils/fetchAllChassisData";
import ChassisOrderFormPdf from "@/components/ChassisOrderForm";
import PersonalInfo from "./PersonalInfo";
import Extras from "./Extras";
import WaterTankandGasholders from "./WaterTankandGasholders";

// Logo component
const Logo = () => (
  <Box className="w-[100px] h-[100px] bg-white rounded-md flex items-center justify-center">
    <img
      src={Silvershinelogo}
      alt="Silver Shine Chassis"
      className="w-[80px] h-[80px]"
    />
  </Box>
);

// Step data
const steps = [
  "Order Informations",
  "Model Type",
  "Chassis Dimensions",
  "Step Locations",
  "Chassis Frame and a-frame",
  "Chassis Configuration",
  "Suspension",
  "Customise Suspension",
  "Wheels and Tyres",
  "Bumpers and exterior",
  "Water Tank and Gas holders",
  "Extras",
  "Personal Info",
];

// Main component
export default function () {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<any[]>([]);
  const [customerid, setCustomerId] = useState("");
  const [chassisData, setChassisData] = useState<any>(null);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const navigate = useNavigate();
  const getCustomerId = localStorage.getItem("custumer_Id") as string;

  useEffect(() => {
    if (customerid) {
      localStorage.setItem("custumer_Id", customerid);
    }
  }, [customerid]);

  const handleSubmit = async (table: string) => {
    const currentForm = stepRefs.current[activeStep];
    if (currentForm && currentForm.getValues) {
      const values = currentForm.getValues();
      const lowerCasedValues = toLowerCaseValues(values);

      const payload = {
        ...lowerCasedValues,
        customer_id: getCustomerId,
      };
      // console.log("payloadData", payload);
      const { error } = await supabase.from(table).insert(payload);
      if (error) {
        console.error(`Error inserting data into ${table}:`, error.message);
      } else {
        console.log(`${table} data inserted successfully.`);
      }
    }
  };

  const handleNext = async () => {
    switch (steps[activeStep]) {
      case "Order Informations":
        await handleSubmit("order_informations");
        break;
      case "Model Type":
        await handleSubmit("model_type_details");
        break;
      case "Chassis Dimensions":
        await handleSubmit("chassisdetails");
        break;
      case "Step Locations":
        await handleSubmit("steplocation");
        break;
      case "Chassis Frame and a-frame":
        await handleSubmit("chassiframe");
        break;
      case "Chassis Configuration":
        await handleSubmit("chassiconfiguration");
        break;
      case "Suspension":
        await handleSubmit("suspension");
        break;
      case "Customise Suspension":
        await handleSubmit("customsuspension");
        break;
      case "Wheels and Tyres":
        await handleSubmit("wheelsandtyres");
        break;
      case "Bumpers and exterior":
        await handleSubmit("bumpersandexterior");
        break;
      case "Water Tank and Gas holders":
        await handleSubmit("tankdetails");
        break;
      case "Extras":
        await handleSubmit("extrasdetails");
        break;
      case "Personal Info":
        await handleSubmit("contactdetails");
        setActiveStep(0);
        navigate("/orders"); // 👈 Redirect to home page
        return;
      default:
        break;
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepClick = (step: number) => {
    // setActiveStep(step);
    // Prevent navigation to the next step if the form is not completed
    if (!completedSteps[step] && step !== activeStep) {
      // alert("Please complete the current step before moving to the next one.");
      return;
    }
    setActiveStep(step);
  };

  // Render the current step content
  const getStepContent = (step: number) => {
    // const props = { ref: (el: any) => (stepRefs.current[step] = el) };

    const props = {
      ref: (el: any) => (stepRefs.current[step] = el),
      errors: stepRefs.current[step]?.formik?.errors,
      touched: stepRefs.current[step]?.formik?.touched,
      handleSubmit,
      handleNext,
    };

    switch (steps[step]) {
      case "Order Informations":
        return (
          <OrderInformations
            {...props}
            onCustomerIdChange={(id: string) => setCustomerId(id)}
          />
        );
      case "Model Type":
        return <ModelType {...props} />;
      case "Chassis Dimensions":
        return <ChassisDimensions {...props} />;
      case "Step Locations":
        return <StepLocations {...props} />;
      case "Chassis Frame and a-frame":
        return <ChassisFrame {...props} />;
      case "Chassis Configuration":
        return <ChassisConfiguration {...props} />;
      case "Suspension":
        return <Suspension {...props} />;
      case "Customise Suspension":
        return <CustomiseSuspension {...props} />;
      case "Wheels and Tyres":
        return <WheelsAndTyres {...props} />;
      case "Bumpers and exterior":
        return <BumpersAndExterior {...props} />;
      case "Water Tank and Gas holders":
        return <WaterTankandGasholders {...props} />;
      case "Extras":
        return <Extras {...props} />;
      case "Personal Info":
        return <PersonalInfo {...props} />;
      default:
        return null;
    }
  };

  const handlePreview = async () => {
    const allData = await fetchAllChassisData(getCustomerId);

    if (allData) {
      setChassisData(allData);
    }
    setOpenPreview(true);
  };

  const componentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const element = componentRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 10; // mm

    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;

    // Convert px to mm (1px = 0.264583 mm)
    const imgWidth = canvas.width * 0.264583;
    const imgHeight = canvas.height * 0.264583;

    // Scale image to fit within A4 margins
    let scaledWidth = availableWidth;
    let scaledHeight = (imgHeight / imgWidth) * scaledWidth;

    if (scaledHeight > availableHeight) {
      scaledHeight = availableHeight;
      scaledWidth = (imgWidth / imgHeight) * scaledHeight;
    }

    const x = (pageWidth - scaledWidth) / 2;
    const y = (pageHeight - scaledHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
    pdf.save("Chassis_Order_Form.pdf");
  };

  return (
    <>
      <Box className="min-h-screen bg-gray-100 flex flex-col">
        <Container maxWidth={false} className="flex-1 py-6 px-8 flex flex-col">
          <Box className="flex justify-between items-center mb-3">
            <Logo />
            <Typography
              variant="h4"
              className="text-gray-800 font-medium text-right flex-1 ml-5"
            >
              Silver Shine Chassis Order Form
            </Typography>
          </Box>

          <Box className="flex flex-1 gap-8">
            {/* Left sidebar */}
            <Box className="w-[240px] flex-shrink-0">
              {steps.map((label, index) => (
                <Box
                  key={label}
                  onClick={() => handleStepClick(index)}
                  className={`cursor-pointer py-3 border-b border-gray-400/30 ${
                    activeStep === index
                      ? "border-gray-700"
                      : "border-gray-400/30"
                  }`}
                >
                  <Typography
                    className={`${
                      activeStep === index
                        ? "text-gray-900 font-medium"
                        : "text-gray-600 font-normal"
                    }`}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Paper className="flex-1 p-6 rounded-lg relative shadow-lg bg-white flex flex-col">
              {getStepContent(activeStep)}

              <Box display="flex" mt={4}>
                <CustomButton
                  // customColor="#0d47a1"
                  // customBgColor="#e3f2fd"
                  // customHoverColor="#bbdefb"
                  // textTransform="uppercase"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Prev
                </CustomButton>
                <Box
                  display="flex"
                  gap={2}
                  sx={{ marginLeft: "auto", marginRight: 10 }}
                >
                  {activeStep === 12 && (
                    <CustomButton
                      variant="outlined"
                      color="primary"
                      onClick={handlePreview}
                    >
                      Preview
                    </CustomButton>
                  )}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Chassis Order Form Preview
            <Tooltip title="Download Order PDF" arrow>
              <IconButton onClick={() => handleDownload?.()} size="small">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {chassisData ? (
            <ChassisOrderFormPdf ref={componentRef} chassisData={chassisData} />
          ) : (
            <Typography>Loading preview...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => setOpenPreview(false)}>
            Close
          </CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
