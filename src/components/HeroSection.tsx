import { Button, Typography, Box } from "@mui/material";

interface HeroSectionProps {
  onReferNow: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onReferNow }) => (
  <div>
    <Box
      sx={{
        backgroundColor: "#011522",
        color: "#fff",
        width: "40vw",
        padding: "50px 0",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "8px",
        maxWidth: "80%",
        zIndex: 100,
        "@media (max-width: 1200px)": {
          width: "60vw",
          padding: "30px 0",
        },
        "@media (max-width: 768px)": {
          width: "80vw",
          padding: "30px 0",
        },
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        className="text-3xl font-bold text-center mb-4"
      >
        Refer & Earn
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        className="text-lg text-center mb-6"
      >
        Refer a friend and earn rewards when they enroll in a course.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onReferNow}
        sx={{
          mt: 2,
          fontWeight: 800,
          lineHeight: 2,
          "&:hover": { bgcolor: "yellow", color: "black", fontWeight: 800 },
        }}
      >
        Refer Now
      </Button>
    </Box>
  </div>
);

export default HeroSection;
