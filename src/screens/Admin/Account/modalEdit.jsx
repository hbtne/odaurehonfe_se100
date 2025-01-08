import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";

const EditAccountModal = ({ open, onClose, selectedAccount }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    accountID: "",
    phoneNumber: "",
    userName: "",
    password: "",
    userType: "Customer", // Default value
    address: "",
    hireDate: "",
    licenseNumber: "",
    status: "",
  });

  useEffect(() => {
    if (selectedAccount && open) {
      console.log(selectedAccount)
      axios
        .get(`http://localhost:5278/api/account/${selectedAccount.accountID}`)
        .then((response) => {
          setFormData({
            name: selectedAccount.name || "",
            gender: selectedAccount.gender || "",
            accountID: selectedAccount.accountID || "",
            phoneNumber: selectedAccount.phoneNumber || "",
            userName: selectedAccount.userName || "",
            password: selectedAccount.password || "",
            userType: mapRole(selectedAccount.userType) || "Customer",
            address: selectedAccount.address || "",
            hireDate: selectedAccount.hireDate || "",
            licenseNumber: selectedAccount.licenseNumber || "",
            status: selectedAccount.status || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching account data:", error.message);
        });
    }
  }, [selectedAccount, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const updatedAccount = {
      name: formData.name,
      gender: formData.gender,
      accountID: formData.accountID,
      phoneNumber: formData.phoneNumber,
      userName: formData.userName,
      password: formData.password,
      userType: formData.userType,
      status: formData.status,
      ...(formData.userType === "Customer" && { address: formData.address }),
      ...(formData.userType === "Ticketclerk" && { hireDate: formData.hireDate }),
      ...(formData.userType === "Driver" && { licenseNumber: formData.licenseNumber }),
    };

    axios
      .put(`http://localhost:5278/api/account/${formData.accountID}`, updatedAccount)
      .then((response) => {
        console.log("Account updated successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating account:", error.message);
      });
  };

  const mapRole = (userType) => {
    switch (userType) {
      case "Tài xế":
        return "Driver";
      case "Khách hàng":
        return "Customer";
      case "Nhân viên":
        return "Ticketclerk";
      default:
        return "Customer";
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={onClose} sx={{ minWidth: "40px" }}>
          <ArrowBackIosIcon />
        </Button>
        Chỉnh sửa Tài Khoản
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Họ và tên"
          name="name"
          value={formData.name}
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
          label="CCCD"
          name="accountID"
          value={formData.accountID}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Số điện thoại"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="userName"
          value={formData.userName}
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
        <RadioGroup row name="userType" value={formData.userType} onChange={handleChange}>
          <FormControlLabel value="Customer" control={<Radio />} label="Khách hàng" />
          <FormControlLabel value="Ticketclerk" control={<Radio />} label="Nhân viên" />
          <FormControlLabel value="Driver" control={<Radio />} label="Tài xế" />
        </RadioGroup>
        {formData.userType === "Customer" && (
          <TextField
            label="Địa chỉ"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}
        {formData.userType === "Ticketclerk" && (
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
        {formData.userType === "Driver" && (
          <TextField
            label="Bằng lái"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={formData.status} onChange={handleChange} label="Status">
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" sx={{ color: "#2E6B75" }}>
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#D7987D", color: "#ffffff" }}>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAccountModal;
