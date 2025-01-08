import React, { useState, useEffect } from 'react';
import styles from './ChangeTicket.module.css';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Confirm from '../../../components/Modal/ConfirmTicket/ConfirmUpdate';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ChangeTicket = () => {
  const { notificationId } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [routeData, setRouteData] = useState({
    departPlace: '',
    arrivalPlace: '',
    departureTime: '',
    price: 0,
  });
  
  const [seats, setSeats] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5278/api/bookticket/bus-bus-route-change/${notificationId}`);
        
        const busRouteData = response.data[0]; 
        
        setRouteData({
          departPlace: busRouteData.departPlace,
          arrivalPlace: busRouteData.arrivalPlace,
          departureTime: busRouteData.departureTime,
          price: busRouteData.pricePerSeat,
        });
  
        setSeats(busRouteData.seats);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []); 
  useEffect(() => {
    console.log('Route Data:', routeData);
    console.log('Seats:', seats);
  }, [routeData, seats]);
  

  const toggleSeatSelection = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeat(seat.seatID === selectedSeat ? null : seat.seatID);
  };
  

  const handleUpdateSeat = async () => {
    if (!selectedSeat) {
      alert('Vui lòng chọn một ghế trước khi cập nhật.');
      return;
    }

    const requestData = {
      ClerkID: parseInt(localStorage.getItem("accountId")),
      NewSeatID: selectedSeat,
      NotificationID: notificationId,
    };

    try {
      const response = await axios.put('http://localhost:5278/update-ticket', requestData);

      if (response.status === 200) {
        alert('Cập nhật ghế thành công!');
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error updating seat:', error);
      alert('Đã xảy ra lỗi khi cập nhật ghế. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.backIcon}><Button><ArrowBackIosIcon /></Button></div>
      <div className={styles.texttilte}><h4>{routeData.departPlace} - {routeData.arrivalPlace}</h4></div>
      <div className={styles.title1}>Tầng dưới</div>
      <div className={styles.title2}>Tầng trên</div>
      <Box className={styles.seatLayout}>
        <Box></Box>

        <Box className={styles.seatColumn}>
          {seats.slice(0, 19).map((seat) => (
            <Box
              key={seat.seatID}
              className={`${styles.seat} ${seat.isBooked ? styles.booked : selectedSeat === seat.seatID ? styles.selected : styles.available}`}
              onClick={() => toggleSeatSelection(seat)}
            >
              {seat.seatNumber}
            </Box>
          ))}
        </Box>
        <Box className={styles.seatColumn}>
          {seats.slice(19).map((seat) => (
            <Box
              key={seat.seatID}
              className={`${styles.seat} ${seat.isBooked ? styles.booked : selectedSeat === seat.seatID ? styles.selected : styles.available}`}
              onClick={() => toggleSeatSelection(seat)}
            >
              {seat.seatNumber}
            </Box>
          ))}
        </Box>

        <Box className={styles.details}>
          <h2 className={styles.center}>Thông tin lượt đi</h2>
          <p><strong>Tuyến xe:</strong> {routeData.departPlace} - {routeData.arrivalPlace} </p>
          <p><strong>Thời gian xuất bến:</strong>  {routeData.departureTime}</p>
          <p><strong>Số ghế:</strong> {selectedSeat ? seats.find((seat) => seat.seatID === selectedSeat)?.seatNumber : 'Chưa chọn ghế'}</p>
          <p><strong>Giá tiền:</strong> {routeData.price} đồng</p>
        </Box>
      </Box>
      <div className={styles.statusContainer}>
        <div className={styles.statusItem}>
          <div className={`${styles.statusBox} ${styles.bookedStatus}`} />
          <span className={styles.statusText}>Đã đặt</span>
        </div>
        <div className={styles.statusItem}>
          <div className={`${styles.statusBox} ${styles.availableStatus}`} />
          <span className={styles.statusText}>Còn trống</span>
        </div>
      </div>
      <Button className={styles.updateButton} onClick={() => setIsDialogOpen(true)}>Cập nhật ghế</Button>

      <Confirm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleUpdateSeat}
        route={`${routeData.departPlace} - ${routeData.arrivalPlace}`}
        departureTime={routeData.departureTime}
        selectedSeats={seats.find((seat) => seat.seatID === selectedSeat)?.seatNumber}
        totalPrice={routeData.price}
      />
    </div>
  );
};

export default ChangeTicket;
