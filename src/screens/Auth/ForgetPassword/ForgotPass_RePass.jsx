import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {  Box, Button, Table,  TableBody, TableCell,TableContainer, TableHead,TableRow,Paper,TextField,MenuItem,Select,} from "@mui/material";
import { useNavigate } from "react-router-dom";


const ForgetPass_Repass = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmnewpassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Submitted", formData);
  };

  return (
    <div className={styles.container}>
         <div className={styles.backIcon}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
      </div>
    <div className={styles.title}>QUÊN MẬT KHẨU</div>
    <Box className={styles.formContainer}>
  <Box className={styles.inputGroup}>
    <label className={styles.label}>New password</label>
    <input
      type="password"
      name="newpassword"
      value={formData.newpassword}
      onChange={handleInputChange}
      className={styles.input}
      placeholder="abc@gmail.com"
    />
  </Box>
  <Box className={styles.inputGroup}>
    <label className={styles.label}>Confirm new password</label>
    <input
      type="password"
      name="newpassword"
      value={formData.confirmnewpassword}
      onChange={handleInputChange}
      className={styles.input}
      placeholder="abc@gmail.com"
    />
  </Box>

  <Box className={styles.confirm}>
    <div className={styles.paying}>
      <Button>
        <div className={styles.textbutton}>Xác nhận</div>
      </Button>
    </div>
  </Box>
</Box>
          
    </div>
  );
};

export default ForgetPass_Repass;
