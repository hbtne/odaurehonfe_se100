import React, { useState, useEffect, useCallback } from 'react';
import styles from './fillInforScreen1way.module.css';
import { Box, Button, MenuItem, Select } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Checkbox from '../../../components/checkbox';
import Payment from '../../../components/Modal/Payment/ConfirmPay';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import Countdown from 'react-countdown';

const FillInforScreen1way = () => {
  const [paymentMethod, setPaymentMethod] = useState('VNPay');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0); 
  const [routeData, setRouteData] = useState({});
  const [showQR, setShowQR] = useState(false);
  const location = useLocation();

  const { busBusRouteID, CustomerID, SeatNum, Type, Price } = location.state;

  const [bookingData, setBookingData] = useState({
    BusBusRouteID: busBusRouteID,
    CustomerID: CustomerID,
    SeatNum: SeatNum,
    Type: Type,
    Price: Price,
  });

  const [tickets, setTickets] = useState([]);

  const pricePerSeat = Price - (discount * Price) / 100;
  const seatArray = SeatNum.split(',');
  const totalPrice = pricePerSeat * seatArray.length;
  const originPrice = Price * seatArray.length;

  const handlePayment = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5278/api/payment', {
        params: {
          busBusRouteId: busBusRouteID,
          customerId: CustomerID,
        },
      });
      setRouteData({
        departPlace: response.data.departPlace,
        arrivalPlace: response.data.arrivalPlace,
        Name: response.data.customerName,
        Phone: response.data.customerPhoneNumber,
        Mail: response.data.customerEmail,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [busBusRouteID, CustomerID]);

  const fetchLoyaltyData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5278/api/loyalty/${CustomerID}/loyalty`);
      setDiscount(response.data.Discount); 
    } catch (error) {
      console.error('Error fetching loyalty data:', error);
    }
  }, [CustomerID]);

  const handlePromotionChange = async (event) => {
    const selectedPromoId = event.target.value;
    try {
      const response = await axios.get(`http://localhost:5278/api/payment/promo`, {
        params: { promoId: selectedPromoId },
      });
      const promoDiscount = response.data.DiscountPercentage;
      const totalDiscount = Math.min(discount + promoDiscount, 20);
      setDiscount(totalDiscount);
      setPromo(selectedPromoId);
    } catch (error) {
      console.error('Error fetching promotion data:', error);
    }
  };

  const handleConfirmBooking = useCallback(async () => {
    setIsDialogOpen(false);
    const updatedBookingData = {
      ...bookingData,
      Price: pricePerSeat,
    };

    try {
      const response = await axios.post('http://localhost:5278/api/bookticket/create-tickets', updatedBookingData);
      if (response.status === 200) {
        const { tickets } = response.data;
        if (Array.isArray(tickets)) {
          setTickets(tickets);
          setShowQR(true);
          setIsDialogOpen(false);
        } else {
          alert('Dữ liệu vé không hợp lệ. Vui lòng thử lại.');
        }
      }
    } catch (error) {
      alert(`Đã xảy ra lỗi khi đặt vé: ${error.response?.data?.message || 'Vui lòng thử lại.'}`);
    }
  }, [bookingData, pricePerSeat]);

  useEffect(() => {
    fetchData();
    fetchLoyaltyData();
  }, [fetchData, fetchLoyaltyData]);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>Hết thời gian thanh toán!</span>;
    } else {
      return <span>{minutes}:{seconds}</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backIcon}><Button><ArrowBackIosIcon /></Button></div>
      <div className={styles.container1}>
        <div className={styles.title}>{routeData.departPlace} - {routeData.arrivalPlace}</div>
        <Box className={styles.formContainer}>
          <h2 className={styles.sectionTitle}>Thông tin khách hàng</h2>
          <Box className={styles.inputGroup}>
            <label className={styles.label}>Tên:</label>
            <input type="text" className={styles.input} value={routeData.Name} readOnly />
          </Box>
          <Box className={styles.inputGroup}>
            <label className={styles.label}>Số điện thoại:</label>
            <input type="text" className={styles.input} value={routeData.Phone} readOnly />
          </Box>
          <Box className={styles.inputGroup}>
            <label className={styles.label}>Email:</label>
            <input type="email" className={styles.input} value={routeData.Mail} readOnly />
          </Box>
          <Box className={styles.inputGroup}>
            <label className={styles.label}>Chọn khuyến mãi</label>
            <Select
              value={promo}
              onChange={handlePromotionChange}
              className={styles.select}
            >
              {promotions.map((promotion) => (
                <MenuItem key={promotion.id} value={promotion.id}>
                  {promotion.name} - Giảm {promotion.discount}%
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </div>
      <div className={styles.container2}>
        <div className={styles.container3}>
          <Box className={styles.payInfor}>
            <div className={styles.tilteBox1}>Thông tin thanh toán</div>
            <div className={styles.text}>Giá lượt đi: {(originPrice).toLocaleString()} VND</div>
            <div className={styles.text}>Giảm giá: {discount}%</div>
            <div className={styles.text}><strong>Thành tiền: {totalPrice.toLocaleString()} VND</strong></div>
          </Box>
          <div><Checkbox /></div>
        </div>
        <Box className={styles.rule}>
          <div className={styles.tilteBox1}>Quy định đặt vé</div>
          <div className={styles.text1}>Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống.</div>
          <div className={styles.text1}>Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.</div>
        </Box>
      </div>
      <Box className={styles.confirm}>
        <div className={styles.text2}>Tổng tiền: </div>
        <div className={styles.total}>{totalPrice.toLocaleString()} VND</div>
        <div className={styles.cancel}><Button>Hủy</Button></div>
        <div className={styles.paying}><Button><div className={styles.textbutton} onClick={handlePayment}>Thanh toán</div></Button>
          {showQR && (
            <div className={styles.qrContainer}>
              <QRCodeCanvas value="http://example.com/payment" />
              <Countdown date={Date.now() + 600000} renderer={renderer} />
              <Button variant="contained" color="#2E6B75" className={styles.apply} onClick={handlePaymentDetail}>Đã thanh toán</Button>
            </div>
          )}
        </div>
      </Box>
      <Payment
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmBooking}
        totalPrice={totalPrice}
        originPrice={originPrice}
        discount={discount}
        onPaymentMethodChange={setPaymentMethod}
      />
      <div className={styles.bg} />
    </div>
  );
};

export default FillInforScreen1way;