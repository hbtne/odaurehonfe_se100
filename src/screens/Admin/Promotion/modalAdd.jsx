import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios"; // Import axios

const AddModal = ({ open, onClose, fetchPromotions }) => {
  const [formData, setFormData] = useState({
    promoID: "",
    name: "",
    startDate: "",
    endDate: "",
    discountPercent: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu POST để tạo khuyến mãi mới
      const response = await axios.post("http://localhost:5278/api/promotion", formData);
      console.log("Khuyến mãi đã được tạo:", response.data);
      // Cập nhật danh sách khuyến mãi sau khi thêm mới
      fetchPromotions();
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo khuyến mãi:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={onClose} sx={{ minWidth: "40px" }}>
          <ArrowBackIosIcon />
        </Button>
        Thêm Một Khuyến Mãi
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Mã khuyến mãi"
          name="promoID"
          value={formData.promoID}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tên khuyến mãi"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ngày bắt đầu"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Ngày kết thúc"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Phần trăm khuyến mãi"
          name="discountPercent"
          value={formData.discountPercent}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Khuyến mãi"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#2E6B75",
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#D7987D",
            color: "#ffffff",
          }}
        >
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
