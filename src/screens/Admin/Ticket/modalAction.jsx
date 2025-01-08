import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ActionModal = ({ open, onClose, onEdit, onDelete, selectedUser }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chọn hành động</DialogTitle>
      <DialogContent>
        Bạn muốn làm gì với vé này <strong>{selectedUser?.busRouteId}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={onEdit}  style={{ backgroundColor: "#2E6B75", color: "#ffffff" }}>Chỉnh Sửa</Button>
        <Button
          onClick={onDelete}
          style={{ backgroundColor: "#D7987D", color: "#ffffff" }}
        >
          Xóa
        </Button>
        <Button onClick={onClose}  style={{ backgroundColor: "#FFDDC1", color: "#000" }} >Hủy</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
