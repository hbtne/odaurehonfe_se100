import React, { useState, useEffect,useCallback } from 'react';
import styles from './fillInforScreen1way.module.css';
import { Box, Button } from '@mui/material';
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
                      
});const [tickets,setTickets] = useState([]);


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

  const handlePaymentDetail = useCallback(async () => {
   
    const paymentData = {
        Tickets: tickets,       
        TotalFee: totalPrice,               
        PaymentMethod: 'VNPay', 
        PromoID:promo,      
    };
    alert('Thanh toán thành công!');
    // try {
    //     const response = await axios.post('http://localhost:5278/api/payment/create', paymentData, {
    //         params: { id: bookingData.CustomerID }, 
    //     });

    //     if (response.status === 200) {
    //         console.log('Payment created successfully:', response.data.paymentId);
    //         alert('Thanh toán thành công!');
    //         setShowQR(false); 


    //         setIsDialogOpen(false);
         
    //     }
    // } catch (error) {
    //     console.error('Error creating payment:', error.response?.data || error.message);
    //     alert(`Đã xảy ra lỗi khi thanh toán: ${error.response?.data?.message || 'Vui lòng thử lại.'}`);
    // }
}, [bookingData, totalPrice]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5278/api/payment', {
        params: {
          busBusRouteId: busBusRouteID,
          customerId: CustomerID,
        },
      });
      console.log('Route Data:', response.data);
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

  useEffect(() => {
    console.log('Fetching data with:', { busBusRouteID, CustomerID, SeatNum, Type, Price });
    fetchData();
  }, [fetchData]);

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
                console.log('Tickets created successfully:', tickets);
                setTickets(tickets); 
                setShowQR(true);
                setIsDialogOpen(false);
            } else {
                console.error('Dữ liệu vé không hợp lệ:', tickets);
                alert('Dữ liệu vé không hợp lệ. Vui lòng thử lại.');
            }
        }
    } catch (error) {
        console.error('Error creating tickets:', error.response?.data || error.message);
        alert(`Đã xảy ra lỗi khi đặt vé: ${error.response?.data?.message || 'Vui lòng thử lại.'}`);
    }
}, [bookingData, pricePerSeat]);



  const handlePromotion = async () => {
    try {
      const response = await axios.get('http://localhost:5278/api/payment/promo', {
        params: {
          promoId: promo,
        },
      });
      setDiscount(response.data.discountPercentage);
    } catch (error) {
      console.error('Error fetching promotion data:', error);
    }
  };

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
            <label className={styles.label}>Mã khuyến mãi</label>
            <input type="text" className={styles.input} value={promo} onChange={(e) => setPromo(e.target.value)} />
            <Button variant="contained" color="#2E6B75" className={styles.apply} onClick={handlePromotion}>Áp dụng</Button>
          </Box>
        </Box>
      </div>
      <div className={styles.container2}>
        <div className={styles.container3}>
          <Box className={styles.payInfor}>
            <div className={styles.tilteBox1}>Thông tin thanh toán</div>
            <div className={styles.text}>Giá lượt đi: {(originPrice).toLocaleString()} VND</div>
            <div className={styles.text}>Giảm giá: {(discount).toLocaleString()}%</div>
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