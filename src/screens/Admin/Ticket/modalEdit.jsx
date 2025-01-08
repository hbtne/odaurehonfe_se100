import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, RadioGroup, FormControlLabel, Radio,} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const EditModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    busRouteId:"",
    departure: "",
    destination:"",
    departureTime: "",
    duration:"",
    price:"",
    type:"Ghế thường",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={onClose} sx={{ minWidth: "40px" }}>
          <ArrowBackIosIcon />
        </Button>
Cập nhật giá vé
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Giá"
          name="price"
          value={formData.price}
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
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
