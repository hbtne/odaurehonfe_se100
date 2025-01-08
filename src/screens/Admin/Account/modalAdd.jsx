import React, { useState } from "react";
import axios from "axios"; // Đảm bảo đã cài axios
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AddAccountModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    accountId: "", // Người dùng nhập vào Account ID
    phone: "",
    email: "",
    password: "", // Thêm trường password
    role: "Khách hàng",
    address: "",
    hireDate: "",
    driverLicense: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
    
      const data = {
        accountID: formData.accountId, 
        userName: formData.email, 
        status: "active",
        userType: formData.role === "Khách hàng" ? "Customer" :
                 formData.role === "Nhân viên" ? "TicketClerk" : "Driver",
        password: formData.password, 
        name: formData.fullName,
        gender: formData.gender,
        phoneNumber: formData.phone,
        
      
        ...(formData.role === "Khách hàng" && {
          address: formData.address, 
        }),
        ...(formData.role === "Nhân viên" && {
          hireDate: formData.hireDate,
        }),
        ...(formData.role === "Tài xế" && {
          licenseNumber: formData.driverLicense, 
        }),
      };
  
      console.log(data);  
  
     
      const response = await axios.post("http://localhost:5278/api/account", data);
      console.log("Account created:", response.data);
      onClose(); 
    } catch (error) {
      console.error("Có lỗi khi tạo tài khoản:", error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={onClose} sx={{ minWidth: "40px" }}>
          <ArrowBackIosIcon />
        </Button>
        Thêm Một Tài Khoản
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Họ và tên"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Giới tính"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="CCCD (Account ID)"
          name="accountId"
          value={formData.accountId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mật khẩu"
          name="password" 
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <RadioGroup
          row
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Khách hàng"
            control={<Radio />}
            label="Khách hàng"
          />
          <FormControlLabel
            value="Nhân viên"
            control={<Radio />}
            label="Nhân viên"
          />
          <FormControlLabel
            value="Tài xế"
            control={<Radio />}
            label="Tài xế"
          />
        </RadioGroup>
        {formData.role === "Khách hàng" && (
          <TextField
            label="Địa chỉ"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}
        {formData.role === "Nhân viên" && (
          <TextField
            label="Ngày tuyển dụng"
            name="hireDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.hireDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}
        {formData.role === "Tài xế" && (
          <TextField
            label="Bằng lái"
            name="driverLicense"
            value={formData.driverLicense}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}
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

export default AddAccountModal;
