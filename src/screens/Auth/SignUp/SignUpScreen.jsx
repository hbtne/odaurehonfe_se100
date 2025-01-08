
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpScreen.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button, TextField, MenuItem, Select } from "@mui/material";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    accountID:"",
    userName: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Họ và tên không được để trống";
    if (!formData.accountID) newErrors.accountID = "CCCD không được để trống";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Số điện thoại không được để trống";
    if (!formData.userName) newErrors.userName = "Email không được để trống";
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Mật khẩu không khớp";
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      name: formData.name,
      accountID:formData.accountID,
      gender: formData.gender,
      phoneNumber: formData.phoneNumber,

      address: formData.address,
      password: formData.password,
      status: "active",  
      userName: formData.userName,  
      userType: "Customer",  
    };
    try {
      console.log(userData);
      const response = await axios.post("http://localhost:5278/api/auth/signup", userData);
      console.log("Registration successful:", response.data);
    
      navigate("/signin"); 
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data);
        alert(`Error: ${error.response.data.errors}`);
      } else {
        console.error("Error:", error.message);
        alert("There was an error with your request.");
      }
    }
  };

    return (
    <div className={styles.container}>
         <div className={styles.backIcon}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
      </div>
    <div className={styles.title}>ĐĂNG KÝ TÀI KHOẢN</div>
    <form onSubmit={handleSubmit}>
    <Box className={styles.formContainer}>
  <Box className={styles.row}>
    <Box className={styles.inputGroup}>
      <label className={styles.label}>Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input1}
              placeholder="Nguyễn Văn A"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </Box>
   <Box className={styles.inputGroup}>
      <label className={styles.label}>Giới tính</label>
      <Select
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
        className={styles.input1}
      >
        <MenuItem value="Nam">Nam</MenuItem>
        <MenuItem value="Nữ">Nữ</MenuItem>
        <MenuItem value="Khác">Khác</MenuItem>
      </Select>
    </Box>
  </Box>
  <Box className={styles.inputGroup}>
    <label className={styles.label}>Số điện thoại</label>
    <input
      type="text"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleInputChange}
      className={styles.input}
      placeholder="0xx xxx xxxx"
    />
    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
  </Box>
  <Box className={styles.inputGroup}>
    <label className={styles.label}>Căn cước công dân</label>
    <input
      type="text"
      name="accountID"
      value={formData.accountID}
      onChange={handleInputChange}
      className={styles.input}
      placeholder="0xx xxx xxxx"
    />
    {errors.accountID && <span className={styles.error}>{errors.accountID}</span>}
  </Box>
  <Box className={styles.inputGroup}>
    <label className={styles.label}>Email</label>
    <input
      type="email"
      name="userName"
      value={formData.userName}
      onChange={handleInputChange}
      className={styles.input}
      placeholder="abc@gmail.com"
    />
     {errors.email && <span className={styles.error}>{errors.email}</span>}

  </Box>
       <Box className={styles.inputGroup}>
           <label className={styles.label}>Địa chỉ</label>
           <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Số nhà, đường, quận, thành phố"
            />
          </Box>
  <Box className={styles.row}>
    <Box className={styles.inputGroup}>
      <label className={styles.label}>Mật khẩu</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className={styles.input1}
        placeholder=""
      />
    </Box>
    <Box className={styles.inputGroup}>
      <label className={styles.label}>Xác nhận mật khẩu</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        className={styles.input1}
        placeholder=""
      />
     {errors.password && <span className={styles.error}>{errors.password}</span>}

    </Box>
  </Box>
  <Box className={styles.confirm}>
    <div className={styles.cancel}>
      <Button>Hủy</Button>
    </div>
    <div className={styles.paying}>
      <Button type="submit">
        <div className={styles.textbutton}>Đăng ký</div>
      </Button>
    </div>
  </Box>
</Box>
</form>
          
    </div>
  );
};



export default SignUpScreen;
