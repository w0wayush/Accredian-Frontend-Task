import { Box, Typography } from "@mui/material";

type Props = {
  successMessage: string;
};

const SuccessMessage = ({ successMessage }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: "#4caf50" }}>
        <span role="img" aria-label="success">
          ✅
        </span>{" "}
        Success!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {successMessage}
      </Typography>
      <Typography variant="body2">
        You will be redirected to the course shortly.
      </Typography>
    </Box>
  );
};

export default SuccessMessage;
