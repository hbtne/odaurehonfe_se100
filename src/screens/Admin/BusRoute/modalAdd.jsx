
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"; 
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";

const AddModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    busRouteId: "",
    departPlace: "",
    arrivalPlace: "",
    departureTime: null, 
    duration: "",
    pricePerSeat:"",
    pricePerSeatVip:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, departureTime: newValue });
  };

  const handleSubmit = async () => {
    try {
      const newRoute = {
        busRouteId: formData.busRouteId,
        departPlace: formData.departPlace,
        arrivalPlace: formData.arrivalPlace,
        departStation: formData.departStation,
        arrivalStation: formData.arrivalStation,
        departureTime: formData.departureTime ? formData.departureTime.toISOString() : null, 
        duration: formData.duration,
        pricePerSeat: formData.pricePerSeat,
        pricePerSeatVip: formData.pricePerSeatVip,
      };
  
      const response = await axios.post("http://localhost:5278/api/busroute", newRoute);
      console.log("Tuyến xe đã được thêm thành công: ", response.data);
      onClose(); 
      setFormData({
        busRouteId: "",
        departPlace: "",
        arrivalPlace: "",
        departureTime: null,
        departStation: "",
        arrivalStation: "",
        duration: "",
        pricePerSeat:"",
        pricePerSeatVip:"",
      });
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm tuyến xe: ", error);
      if (error.response) {
        console.log("Lỗi từ server: ", error.response.data);
      }
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={onClose} sx={{ minWidth: "40px" }}>
          <ArrowBackIosIcon />
        </Button>
        Thêm Một Tuyến Xe
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Mã tuyến xe"
          name="busRouteId"
          value={formData.busRouteId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Điểm đi"
          name="departPlace"
          value={formData.departPlace}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
       
            <TextField
          label="Trạm đi"
          name="departStation"
          value={formData.departStation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
           <TextField
          label="Điểm đến"
          name="arrivalPlace"
          value={formData.arrivalPlace}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Trạm đến"
          name="arrivalStation"
          value={formData.arrivalStation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Thời gian khởi hành"
            value={formData.departureTime}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <TextField
          label="Thời gian di chuyển (HH:mm)"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Giá vé thường"
          name="pricePerSeat"
          value={formData.pricePerSeat}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Giá vé Vip"
          name="pricePerSeatVip"
          value={formData.pricePerSeatVip}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ color: "#2E6B75" }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#D7987D", color: "#ffffff" }}
        >
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
