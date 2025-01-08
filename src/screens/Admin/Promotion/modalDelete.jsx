import React from "react";
import { Dialog, DialogContent, Button, Box } from "@mui/material";

const DeleteModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent style={{ textAlign: "center", padding: "20px" }}>
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          Bạn có chắc chắn muốn xóa khuyến mãi này không?
        </p>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <Button
            onClick={onClose}
            style={{
              border: "1px solid #2E6B75",
              color: "#2E6B75",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={onConfirm}
            style={{
              backgroundColor: "#D7987D",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            Xóa
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
