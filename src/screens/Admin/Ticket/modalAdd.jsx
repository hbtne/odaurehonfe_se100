import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, RadioGroup, FormControlLabel, Radio,} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AddModal = ({ open, onClose }) => {
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
        Thêm Một Loại Vé
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Tuyến xe"
          name="busRoute"
          value={formData.busRouteId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Điểm đi"
          name="departure"
          value={formData.departure}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Điểm đến"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Thời gian khởi hành"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quãng thời gian"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <RadioGroup
          row
          name="type"
          value={formData.role}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Ghế thường"
            control={<Radio />}
            label="Ghế thường"
          />
          <FormControlLabel
            value="Ghế VIP"
            control={<Radio />}
            label="Ghế VIP"
          />
        </RadioGroup>

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
