import React, { useState } from 'react';
import styles from './fillInforScreenround.module.css';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Checkbox from '../../../components/checkbox';
import Payment from '../../../components/Modal/Payment/ConfirmPay';
const FillInforScreenround = () => {
const [isDialogOpen, setIsDialogOpen] = useState(false);

const handlePayment = () => {
  setIsDialogOpen(true);
};

const handleCloseDialog = () => {
  setIsDialogOpen(false);
};

const handleConfirmBooking = () => {
  alert('Thanh toán thành công! Kiểm tra email của bạn để xem thông tin vé!');
  setIsDialogOpen(false);
};
    const totalReturnPrice = 125000;
    const totalOutboundPrice = 125000;

const disCount=0.2;
const totalPrice = (totalOutboundPrice- disCount*totalOutboundPrice) + (totalReturnPrice- disCount*totalReturnPrice);
  return (
      <div className={styles.container}>
             <div className={styles.backIcon}><Button><ArrowBackIosIcon/></Button></div>
        <div className={styles.container1}>
          <div className={styles.title}>TP. Hồ Chí Minh - Thốt Nốt</div>
          <Box className={styles.formContainer}>
              <h2 className={styles.sectionTitle}>Thông tin khách hàng</h2>
              <Box className={styles.inputGroup}>
                  <label className={styles.label}>Họ và tên</label>
                  <input type="text" className={styles.input} placeholder="Nguyễn Văn A" />
              </Box>
              < Box className={styles.inputGroup}>
                  <label className={styles.label}>Số điện thoại</label>
                  <input type="text" className={styles.input} placeholder="0xx xxx xxxx" />
              </Box>
              <Box className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input type="email" className={styles.input} placeholder="abc@gmail.com" />
              </Box>
          </Box>
      </div>
      <div className={styles.container2}>
        <div className={styles.container3}>
            <Box className={styles.payInfor}>
                <div className={styles.tilteBox1}> Thông tin thanh toán</div>
                <div className={styles.text}>Giá lượt đi:          {totalOutboundPrice.toLocaleString()}  VND</div>
                <div className={styles.text}>Giá lượt về:          {totalReturnPrice.toLocaleString()}  VND</div>
                <div className={styles.text}>Giảm giá:          {(disCount*100).toLocaleString()}%</div>
                <div className={styles.text}><strong>Thành tiền:          {totalPrice.toLocaleString()}  VND</strong></div>
            </Box>
            <div><Checkbox/></div>
        </div>
        <Box className={styles.rule}>
            <div className={styles.tilteBox1}> Quy định đặt vé</div>
        <div className={styles.text1}>Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống.</div>
        <div className={styles.text1}>Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.</div>
        </Box>
      </div>
      <Box className={styles.confirm}>
        <div className={styles.text2}>Tổng tiền: </div>
        <div className={styles.total}>{totalPrice.toLocaleString()}VND</div>
        <div className={styles.cancel}><Button>Hủy</Button></div>
        <div className={styles.paying}><Button><div className={styles.textbutton} onClick={handlePayment}>Thanh toán</div></Button></div>
      </Box>
      <Payment
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmBooking}
        totalPrice={totalPrice}
      />
      <div className={styles.bg}/>
      </div>
  );
};

  export default FillInforScreenround;