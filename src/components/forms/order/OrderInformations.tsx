import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RefreshOutlined } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { supabase } from "@/lib/supabase";
import SignatureCanvasComponent from "@/components/SignatureCanvas";
import CustomButton from "@/components/ui/CustomButton";

interface FormValues {
  customer: string;
  ssChassisNo: string;
  chassisNo: string;
  orderBy: string;
  modelName: string;
  deliveryDate: Date | null;
  // signature: string;
}

const validationSchema = Yup.object({
  customer: Yup.string().required("Customer is required"),
  ssChassisNo: Yup.string().required("SS Chassis No. is required"),
  chassisNo: Yup.string().required("Chassis No. is required"),
  orderBy: Yup.string().required("Order by is required"),
  modelName: Yup.string().required("Model Name is required"),
  deliveryDate: Yup.date().nullable().required("Delivery Date is required"),
});

const OrderInformation = forwardRef(
  ({ onCustomerIdChange, handleNext }: any, ref) => {
    const formikRef = useRef<any>(null);
    const [allCustomers, setAllCustomers] = useState<any[]>([]);
    const [custumerId, selectedCustomerId] = useState<any>();
    const signatureRef = useRef<any>(null); // ✅ define the ref here

    useImperativeHandle(ref, () => ({
      getValues: () => formikRef.current?.values,
      validateForm: () => formikRef.current?.validateForm(), // Expose validateForm method
      submitForm: () => formikRef.current?.submitForm(), // Expose submitForm method
    }));

    useEffect(() => {
      if (custumerId) {
        onCustomerIdChange?.(custumerId);
      }
    }, [custumerId]);

    const fetchAllCustomers = async () => {
      const { data, error } = await supabase.from("customers").select("*");

      if (error) {
        console.error("Error fetching customers:", error.message);
        return;
      }

      setAllCustomers(data || []);
    };

    useEffect(() => {
      fetchAllCustomers(); // call once on component mount
    }, []);

    return (
      <Formik<FormValues>
        initialValues={{
          customer: "",
          ssChassisNo: "",
          chassisNo: "",
          orderBy: "",
          modelName: "",
          deliveryDate: null,
          // signature: "", // NEW
        }}
        innerRef={formikRef}
        validationSchema={validationSchema}
        onSubmit={() => {
          handleNext();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            <Grid container spacing={2}>
              {[
                { name: "customer", label: "Customer" },
                { name: "ssChassisNo", label: "SS Chassis No." },
                { name: "chassisNo", label: "Chassis No." },
                { name: "orderBy", label: "Order By" },
                { name: "modelName", label: "Model Name" },
              ].map(({ name, label }) => (
                <Grid size={6} sx={{ mb: 2 }} key={name}>
                  {name === "customer" ? (
                    <TextField
                      select
                      label={label}
                      name={name}
                      fullWidth
                      variant="outlined"
                      value={values[name as keyof FormValues]}
                      onChange={(e) => {
                        const selectedName = e.target.value;
                        const selectedCustomer = allCustomers.find(
                          (customer) => customer.name === selectedName
                        );
                        if (selectedCustomer) {
                          selectedCustomerId(selectedCustomer.id);
                        }
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      error={
                        touched[name as keyof FormValues] &&
                        Boolean(errors[name as keyof FormValues])
                      }
                      helperText={
                        touched[name as keyof FormValues] &&
                        errors[name as keyof FormValues]
                      }
                      size="small"
                    >
                      {/* Replace these options with your actual customer list */}
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {/* Dynamically render all customer names */}
                      {allCustomers?.map((customer) => (
                        <MenuItem key={customer.id} value={customer.name}>
                          {customer.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      label={label}
                      name={name}
                      fullWidth
                      variant="outlined"
                      value={values[name as keyof FormValues]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched[name as keyof FormValues] &&
                        Boolean(errors[name as keyof FormValues])
                      }
                      helperText={
                        touched[name as keyof FormValues] &&
                        errors[name as keyof FormValues]
                      }
                      size="small"
                    />
                  )}
                </Grid>
              ))}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Delivery Date"
                    value={values.deliveryDate}
                    onChange={(date) => setFieldValue("deliveryDate", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        error:
                          touched.deliveryDate && Boolean(errors.deliveryDate),
                        helperText: touched.deliveryDate && errors.deliveryDate,
                        size: "small",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={12}>
                <Typography variant="subtitle1">Signature</Typography>
                <SignatureCanvasComponent
                  // value={values.signature}
                  // onChange={(val: string) => {
                  //   console.log("Signature changed:", val);
                  //   setFieldValue("signature", val);
                  // }}
                  ref={signatureRef}
                />

                <Box display="flex" justifyContent="flex-end" mt={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      signatureRef.current?.clear(); // clears canvas
                      // setFieldValue("signature", ""); // clears form value
                    }}
                    startIcon={<RefreshOutlined />}
                  >
                    Clear Signature
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                position: "absolute",
                right: 20,
                pt: 5,
              }}
            >
              <CustomButton type="submit">Next</CustomButton>
            </Box>
          </Form>
        )}
      </Formik>
    );
  }
);

export default OrderInformation;
