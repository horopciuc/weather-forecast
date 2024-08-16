/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from "@mui/material";

export default function ErrorModal({ open, onClose, message }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "35%",
          bgcolor: "white",
          boxShadow: 10,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Error
        </Typography>
        <Typography sx={{ mb: 3 }}>{message}</Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
