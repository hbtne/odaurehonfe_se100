
import React, { useState, useEffect } from 'react';
import styles from './chooseSeatScreen1way.module.css';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Confirm from '../../../components/Modal/ConfirmTicket/ConfirmTicket1way';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ChooseSeatScreen1way = () => {
  const { busBusRouteID } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [routeData, setRouteData] = useState({ departPlace: '', arrivalPlace: '', departureTime: '', pricePerSeat: 0 });
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bus, setBus] = useState({ type: '' });


  useEffect(() => {
    const fetchSeats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5278/api/bookticket/bus-bus-routes/${busBusRouteID}`);
        console.log("Route Data:", response.data);
        if (response.data && response.data.bus && response.data.seats) {
          const fetchedSeats = response.data.seats;
          setSeats(fetchedSeats);
          setRouteData({
            departPlace: response.data.departPlace,
            arrivalPlace: response.data.arrivalPlace,
            departureTime: response.data.departureTime,
            price: response.data.price
          });
          setBus({
            type: response.data.bus.type
          });
        } else {
          console.error('Không tìm thấy thông tin ghế.');
          setError('Không có dữ liệu ghế.');
        }
      } catch (err) {
        console.error('Error fetching bus seats:', err);
        setError('Lỗi khi tải dữ liệu ghế.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [busBusRouteID]);


  const toggleSeatSelection = (seat) => {
    if (seat.isBooked) return;

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat.seatID)) {
        return prevSelectedSeats.filter((s) => s !== seat.seatID);
      } else {
        return [...prevSelectedSeats, seat.seatID];
      }
    });
  };


  const handleBookTicket = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế trước khi đặt vé.");
      return;
    }

    const bookingData = {
      BusBusRouteID: busBusRouteID,
      CustomerID: parseInt(localStorage.getItem("accountId")),
      SeatNum: selectedSeats.join(','),
      Type: bus.type || "Thường",
      Price: routeData.price,
    };
    console.log("AccountId in localStorage:", localStorage.getItem("accountId"));

    console.log("CustomerID:", localStorage.getItem("accountId"));
    console.log("bookingData:", bookingData);

    try {
      const response = await axios.post('http://localhost:5278/api/bookticket/create-tickets', bookingData);
      if (response.status === 200) {
        console.log("Tickets created successfully:", response.data.tickets);
        alert("Đặt vé thành công!");
        setSelectedSeats([]);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating tickets:", error.response?.data || error.message);
      alert("Đã xảy ra lỗi khi đặt vé. Vui lòng thử lại.");
    }
  };


  const totalPrice = selectedSeats.length * routeData.price;
  const getSeatNumbers = (selectedSeats, allSeats) => {
    return selectedSeats
      .map((id) => allSeats.find((seat) => seat.seatID === id)?.seatNumber)
      .filter((seatNumber) => seatNumber); 
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
              className={`${styles.seat} ${seat.isBooked ? styles.booked : selectedSeats.includes(seat.seatID) ? styles.selected : styles.available}`}
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
              className={`${styles.seat}  ${seat.isBooked ? styles.booked : selectedSeats.includes(seat.seatID) ? styles.selected : styles.available}`}
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
          <p><strong>Số lượng ghế:</strong>  {selectedSeats.length}</p>
          <p><strong>Số ghế:</strong> {getSeatNumbers(selectedSeats, seats).join(', ')} </p>
          <p><strong>Tổng tiền lượt đi:</strong> {totalPrice.toLocaleString()} đồng</p>
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
      <button className={styles.bookButton} onClick={handleBookTicket}>Đặt vé</button>
      <Confirm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmBooking}
        route={`${routeData.departPlace} - ${routeData.arrivalPlace}`}
        departureTime={routeData.departureTime}
        selectedSeats={getSeatNumbers(selectedSeats, seats)}
        totalPrice={totalPrice}
      />

    </div>
  );
};
export default ChooseSeatScreen1way;