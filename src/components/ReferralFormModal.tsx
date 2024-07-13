import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import SuccessMessage from "./SuccessMessage";
import axios from "axios";

const referralSchema = z.object({
  referrerName: z.string().nonempty({ message: "* Referrer name is required" }),
  referrerEmail: z.string().email({ message: "* Invalid email address" }),
  referrerPhone: z.string().optional(),
  message: z.string().optional(),
  referees: z
    .array(
      z.object({
        refereeName: z
          .string()
          .nonempty({ message: "* Referee name is required" }),
        refereeEmail: z.string().email({ message: "* Invalid email address" }),
        refereePhone: z.string().optional(),
      })
    )
    .nonempty({ message: "* At least one referee is required" }),
});

interface Referee {
  refereeName: string;
  refereeEmail: string;
  refereePhone?: string;
}

interface ReferralData {
  referrerName: string;
  referrerEmail: string;
  referrerPhone?: string;
  message?: string;
  referees: Referee[];
}

interface ReferNowProps {
  open: boolean;
  handleClose: () => void;
}

const ReferralFormModal: React.FC<ReferNowProps> = ({ open, handleClose }) => {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReferralData>({
    resolver: zodResolver(referralSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "referees",
  });

  const onSubmit: SubmitHandler<ReferralData> = async (data: ReferralData) => {
    // console.log(data);
    try {
      // @ts-ignore
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BE_URL}/api/v1/referral`,
        {
          referrerName: data.referrerName,
          referrerEmail: data.referrerEmail,
          referrerPhone: data.referrerPhone,
          message: data.message,
          referees: data.referees.map((referee) => ({
            refereeName: referee.refereeName,
            refereeEmail: referee.refereeEmail,
            refereePhone: referee.refereePhone,
          })),
        }
      );

      // console.log("Referral Response - ", response);

      setSuccessMessage("Referral submitted successfully! 🚀");
      reset();
      setTimeout(() => {
        setSuccessMessage("");
        handleClose();
      }, 5000);
    } catch (error) {
      console.error("Error submitting referral:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ borderRadius: "50px" }}>
      <Box sx={modalStyle}>
        <Button
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "grey",
          }}
        >
          <CloseIcon />
        </Button>
        {successMessage ? (
          <SuccessMessage successMessage={successMessage} />
        ) : (
          <>
            <Typography
              variant="h5"
              component="h1"
              sx={{ mb: 4, textAlign: "center" }}
            >
              Referral Form
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
              <TextField
                variant="filled"
                label="Your Name"
                {...register("referrerName")}
                error={!!errors.referrerName}
                helperText={errors.referrerName?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                variant="filled"
                label="Your Email"
                {...register("referrerEmail")}
                error={!!errors.referrerEmail}
                helperText={errors.referrerEmail?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                variant="filled"
                label="Your Phone Number"
                {...register("referrerPhone")}
                error={!!errors.referrerPhone}
                helperText={errors.referrerPhone?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                variant="filled"
                label="Message"
                defaultValue="Check out this course!"
                multiline
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message?.message}
                fullWidth
                margin="normal"
              />
              {fields.map((field, index) => (
                <Accordion key={field.id} sx={{ marginY: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{`Referee ${index + 1}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ flexDirection: "column" }}>
                    <TextField
                      label="Friend's Name"
                      {...register(`referees.${index}.refereeName` as const)}
                      error={!!errors.referees?.[index]?.refereeName}
                      helperText={
                        errors.referees?.[index]?.refereeName?.message
                      }
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Friend's Email"
                      {...register(`referees.${index}.refereeEmail` as const)}
                      error={!!errors.referees?.[index]?.refereeEmail}
                      helperText={
                        errors.referees?.[index]?.refereeEmail?.message
                      }
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Friend's Phone Number"
                      {...register(`referees.${index}.refereePhone` as const)}
                      error={!!errors.referees?.[index]?.refereePhone}
                      helperText={
                        errors.referees?.[index]?.refereePhone?.message
                      }
                      fullWidth
                      margin="normal"
                    />
                    <Button
                      sx={{
                        display: "block",
                        margin: "auto",
                        textAlign: "center",
                        width: "fit-content",
                        bgcolor: "#ff605c",
                        color: "white",
                        fontWeight: 600,
                        "&:hover": {
                          bgcolor: "#e64c48",
                        },
                        my: 1, // margin on y-axis
                      }}
                      onClick={() => remove(index)}
                    >
                      Remove Referee
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}
              {errors.referees && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {errors.referees.message}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  append({
                    refereeName: "",
                    refereeEmail: "",
                    refereePhone: "",
                  })
                }
                startIcon={<AddIcon sx={{ fontSize: "18px" }} />}
                fullWidth
                sx={{
                  mt: 2,
                  fontWeight: 500,
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "yellow",
                    color: "black",
                    fontWeight: 700,
                  },
                }}
              >
                Add Referee
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 1,
                  fontWeight: 500,
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "green",
                    color: "white",
                    fontWeight: 500,
                  },
                }}
              >
                Submit
              </Button>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  maxHeight: "90vh",
  overflowY: "auto" as "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: 0,
  "@media (max-width: 1100px)": {
    width: "60vw",
    maxHeight: "80vh",
  },
  "@media (max-width: 768px)": {
    width: "80vw",
    maxHeight: "80vh",
  },
};

const formStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  gap: "5px",
};

export default ReferralFormModal;
