import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from 'axios';

const AddModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    busId: "",
    numSeat: "",
    plateNum: "",
    type: "Thường",
    busRouteIds: "",  // Nhiều busRouteId cách nhau bởi dấu phẩy
    driverIds: "",    // Nhiều driverId cách nhau bởi dấu phẩy
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        busId: formData.busId,
        numSeat: formData.numSeat,
        plateNum: formData.plateNum,
        type: formData.type,
        busRouteIds: formData.busRouteIds, // Chuỗi cách nhau bởi dấu phẩy
        driverIds: formData.driverIds, // Chuỗi cách nhau bởi dấu phẩy
      };
  
      // Gửi yêu cầu POST với dữ liệu đã nhập
      const response = await axios.post("http://localhost:5278/api/bus",  data );
  
      if (response.status === 201) {
        console.log("Xe đã được thêm thành công: ", response.data);
        onClose();
      }
    } catch (error) {
      console.error("Lỗi khi thêm xe: ", error.response ? error.response.data : error.message);
    }
  };
  
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={onClose} sx={{ minWidth: "40px" }}>
          <ArrowBackIosIcon />
        </Button>
        Thêm Một Xe
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Mã xe"
          name="busId"
          value={formData.busId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Số ghế"
          name="numSeat"
          value={formData.numSeat}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Biển số xe"
          name="plateNum"
          value={formData.plateNum}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tuyến đang vận hành (nhiều tuyến cách nhau bởi dấu phẩy)"
          name="busRouteIds"
          value={formData.busRouteIds}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mã tài xế (nhiều tài xế cách nhau bởi dấu phẩy)"
          name="driverIds"
          value={formData.driverIds}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <RadioGroup
          name="type"
          value={formData.type}
          onChange={handleChange}
          row
          sx={{ marginTop: "16px" }}
        >
          <FormControlLabel value="Thường" control={<Radio />} label="Xe Thường" />
          <FormControlLabel value="VIP" control={<Radio />} label="Xe VIP" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" sx={{ color: "#2E6B75" }}>
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#D7987D", color: "#ffffff" }}>
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
