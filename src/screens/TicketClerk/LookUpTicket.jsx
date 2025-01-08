import React, { useState } from 'react';
import styles from './LookUpTicket.module.css';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';
import Monsterrat from'../../assets/fonts/MontserratAlternates-Regular.otf'

const LookUpTicketScreen = () => {
const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketCode, setTicketCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleLookup = async () => {
    try {
      const response = await axios.get(`http://localhost:5278/check-ticket/${ticketCode}/${phoneNumber}`);
      setResult(response.data);  
      setError(null);  
    } catch (error) {
      setError('Không tìm thấy vé hoặc số điện thoại không khớp.');
      setResult(null); 
    }
  };
  const removeVietnameseTones = (str) => {
    const vietKey = [
      'aáàạảãâấầậẩẫăắằặẳẵ',
      'eéèẹẻẽêếềệểễ',
      'iíìịỉĩ',
      'oóòọỏõôốồộổỗơớờợởỡ',
      'uúùụủũôốồộổỗơớờợởỡ',
      'yýỳỵỷỹ',
      'dđ'
    ];
    
    const vietChars = [
      'a', 'e', 'i', 'o', 'u', 'y', 'd'
    ];
  
    for (let i = 0; i < vietKey.length; i++) {
      const re = new RegExp('[' + vietKey[i] + ']', 'g');
      str = str.replace(re, vietChars[i]);
    }
  
    return str;
  };
  

  const handlePrintTicket = () => {
    const noDi = removeVietnameseTones(result.departure);
    const noDen = removeVietnameseTones(result.destination);
    const doc = new jsPDF('p', 'mm', 'a6'); 
    doc.addFileToVFS(" Monsterrat.otf",  Monsterrat);

 
  doc.setFont(" Monsterrat");
   
    doc.setFontSize(12); 
  
    doc.text(`Ma ve: ${result.ticketId}`, 10, 20); 
    doc.text(`So ghe: ${result.seatNumber}`, 10, 30);
    doc.text(`Noi di: ${noDi}`, 10, 40);
    doc.text(`Noi den: ${noDen}`, 10, 50);
    doc.text(`Gio khoi hanh: ${result.departureTime}`, 10, 60);
    doc.text(`So xe: ${result.busNumber}`, 10, 70);
    doc.text(`Bien so xe: ${result.licensePlate}`, 10, 80);
  
    doc.save(`ticket-${result.ticketId}.pdf`);
  };
  
  
  return (
    <div className={styles.container}>
      <div className={styles.backIcon}>
        <Button><ArrowBackIosIcon /></Button>
      </div>
      <div className={styles.container1}>
        <div className={styles.title}>TRA CỨU VÉ XE</div>
        <Box className={styles.formContainer}>
          <Box className={styles.inputGroup}>
            <label className={styles.label}>Số điện thoại</label>
            <input
              type="text"
              className={styles.input}
              placeholder="0xx xxx xxxx"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Box>
          <Box className={styles.inputGroup}>
            <label className={styles.label}>Mã vé xe</label>
            <input
              type="text"
              className={styles.input}
              placeholder="0xx xxx xxxx"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
            />
          </Box>
        </Box>
        <div className={styles.buttonLookup} onClick={handleLookup}>
          <Button   
              variant="contained"
             
              sx={{
                backgroundColor:"#D7987D",
                borderRadius: '15px', 
                width: '160px',
               height: '60px',
              }}>Tra cứu</Button>
              </div>
      </div>
      <div className={styles.bg} />
      <h3 className={styles.resultTitle}>KẾT QUẢ TRUY XUẤT</h3>
      {result && (
          <Box className={styles.resultContainer}>
           <Box className={styles.ticketDetails} id="ticketContent">
  <div className={styles.row}>
    <span className={styles.label}>Mã vé:</span>
    <span className={styles.value}>{result.ticketId}</span>
  </div>
  <div className={styles.row}>
    <span className={styles.label}>Số ghế:</span>
    <span className={styles.value}>{result.seatNumber}</span>
  </div>
  <div className={styles.row}>
    <span className={styles.label}>Nơi đi:</span>
    <span className={styles.value}>{result.departure}</span>
  </div>
  <div className={styles.row}>
    <span className={styles.label}>Nơi đến:</span>
    <span className={styles.value}>{result.destination}</span>
  </div>
  <div className={styles.row}>
    <span className={styles.label}>Giờ khởi hành:</span>
    <span className={styles.value}>{result.departureTime}</span>
  </div>
  <div className={styles.row}>
    <span className={styles.label}>Số xe:</span>
    <span className={styles.value}>{result.busNumber}</span>
  </div>
  <div className={styles.row}>
    <span className={styles.label}>Biển số xe:</span>
    <span className={styles.value}>{result.licensePlate}</span>
  </div>
</Box>
<div className={styles.conbut}>
            <div className={styles.cancelButton}>
              <Button
             
              variant="contained"
              sx={{
                backgroundColor:"#2E6B75",
                borderRadius: '25px', 
              }}
              onClick={handlePrintTicket}
            > In vé
            </Button>
            </div>
            
            <div className={styles.cancelButton}>
              <Button
             
              variant="contained"
              sx={{
                backgroundColor:"#D7987D",
                borderRadius: '25px', 
              }}
            >
              Đổi vé
            </Button>
            </div>
            
            <div className={styles.cancelButton}>
              <Button
            
              variant="contained"
              color="error"
              sx={{
                borderRadius: '25px', 
              }}
            >
              Hủy vé
            </Button>
            </div>
            </div>
          </Box>
        )}
    </div>
  );
};

export default LookUpTicketScreen;
