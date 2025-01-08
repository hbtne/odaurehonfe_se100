import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './chooseSeatScreenround.module.css';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Confirm from '../../../components/Modal/ConfirmTicket/ConfirmTicketround';
import { useParams } from 'react-router-dom';

const ChooseSeatScreenRound = () => {
  const { busBusRouteDepartureID, busBusRouteReturnID } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSeatsDeparture, setSelectedSeatsDeparture] = useState([]);
  const [selectedSeatsReturn, setSelectedSeatsReturn] = useState([]);
  const [routeDataDeparture, setRouteDataDeparture] = useState({ departPlace: '', arrivalPlace: '', departureTime: '', price: 0 });
  const [routeDataReturn, setRouteDataReturn] = useState({ departPlace: '', arrivalPlace: '', departureTime: '', price: 0 });
  const [seatsReturn, setSeatsReturn] = useState([]);
  const [seatsDeparture, setSeatsDeparture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busReturn, setBusReturn] = useState({ type: '' });
  const [busDeparture, setBusDeparture] = useState({ type: '' });

  useEffect(() => {
    const fetchSeatsData = async () => {
      setLoading(true);
      try {
        const responseDeparture = await axios.get(`http://localhost:5278/api/bookticket/bus-bus-routes/${busBusRouteDepartureID}`);
        if (responseDeparture.data) {
          setSeatsDeparture(responseDeparture.data.seats);
          setRouteDataDeparture({
            departPlace: responseDeparture.data.departPlace,
            arrivalPlace: responseDeparture.data.arrivalPlace,
            departureTime: responseDeparture.data.departureTime,
            price: responseDeparture.data.price
          });
          setBusDeparture({ type: responseDeparture.data.bus.type });
        }

        const responseReturn = await axios.get(`http://localhost:5278/api/bookticket/bus-bus-routes/${busBusRouteReturnID}`);
        if (responseReturn.data) {
          setSeatsReturn(responseReturn.data.seats);
          setRouteDataReturn({
            departPlace: responseReturn.data.departPlace,
            arrivalPlace: responseReturn.data.arrivalPlace,
            departureTime: responseReturn.data.departureTime,
            price: responseReturn.data.price
          });
          setBusReturn({ type: responseReturn.data.bus.type });
        }
      } catch (err) {
        console.error('Error fetching seats data:', err);
        setError('Không thể tải dữ liệu ghế.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeatsData();
  }, [busBusRouteDepartureID, busBusRouteReturnID]);

  const toggleDepartureSeatSelection = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeatsDeparture((prevSelectedSeats) => {
      return prevSelectedSeats.includes(seat.seatID)
        ? prevSelectedSeats.filter((s) => s !== seat.seatID)
        : [...prevSelectedSeats, seat.seatID];
    });
  };

  const toggleReturnSeatSelection = (seat) => {
    if (seat.isBooked) return;
    setSelectedSeatsReturn((prevSelectedSeats) => {
      return prevSelectedSeats.includes(seat.seatID)
        ? prevSelectedSeats.filter((s) => s !== seat.seatID)
        : [...prevSelectedSeats, seat.seatID];
    });
  };

  const handleBookTicket = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmBooking = async () => {
    if (selectedSeatsDeparture.length === 0 || selectedSeatsReturn.length === 0) {
      alert('Vui lòng chọn ít nhất một ghế ở cả lượt đi và lượt về.');
      return;
    }

    const bookingData = [
      {
        BusBusRouteID: busBusRouteDepartureID,
        CustomerID: parseInt(localStorage.getItem('accountId')),
        SeatNum: selectedSeatsDeparture.join(','),
        Type: busDeparture.type,
        Price: routeDataDeparture.price,
      },
      {
        BusBusRouteID: busBusRouteReturnID,
        CustomerID: parseInt(localStorage.getItem('accountId')),
        SeatNum: selectedSeatsReturn.join(','),
        Type: busReturn.type,
        Price: routeDataReturn.price,
      },
    ];

    try {
      const response = await axios.post('http://localhost:5278/api/bookticket/create-multiple-tickets', bookingData);
      if (response.status === 200) {
        alert('Đặt vé thành công!');
        setSelectedSeatsDeparture([]);
        setSelectedSeatsReturn([]);
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating round tickets:', error);
      alert('Đã xảy ra lỗi khi đặt vé. Vui lòng thử lại.');
    }
  };

  const totalDeparturePrice = selectedSeatsDeparture.length * routeDataDeparture.price;
  const totalReturnPrice = selectedSeatsReturn.length * routeDataReturn.price;
  const getSeatNumbers = (selectedSeats, allSeats) => {
    return selectedSeats
      .map((id) => allSeats.find((seat) => seat.seatID === id)?.seatNumber)
      .filter((seatNumber) => seatNumber); 
  };
  
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <div className={styles.backIcon}><Button><ArrowBackIosIcon /></Button></div>
        <div className={styles.texttilte}><h4>{routeDataDeparture.departPlace} - {routeDataDeparture.arrivalPlace}</h4></div>
        <div className={styles.title1}>Tầng dưới</div>
        <div className={styles.title2}>Tầng trên</div>
        <Box className={styles.seatLayout}>
        <Box></Box>
          <Box className={styles.seatColumn}>
            {seatsDeparture.slice(0, 19).map((seat) => (
              <Box
                key={seat.seatID}
                className={`${styles.seat} ${seat.isBooked? styles.booked : selectedSeatsDeparture.includes(seat.seatID) ? styles.selected : styles.available}`}
                onClick={() => toggleDepartureSeatSelection(seat)}
              >
                {seat.seatNumber}
              </Box>
            ))}
          </Box>
          <Box className={styles.seatColumn}>
            {seatsDeparture.slice(19).map((seat) => (
              <Box
                key={seat.seatID}
                className={`${styles.seat} ${seat.isBooked ? styles.booked : selectedSeatsDeparture.includes(seat.seatID) ? styles.selected : styles.available}`}
                onClick={() => toggleDepartureSeatSelection(seat)}
              >
                {seat.seatNumber}
              </Box>
            ))}
          </Box>
        
        <Box className={styles.details}>
          <h2 className={styles.center}>Thông tin lượt đi</h2>
          <p><strong>Tuyến xe:</strong>{routeDataDeparture.departPlace} - {routeDataDeparture.arrivalPlace}</p>
          <p><strong>Thời gian xuất bến:</strong> {routeDataDeparture.departureTime}</p>
          <p><strong>Số lượng ghế:</strong> {selectedSeatsDeparture.length}</p>
          <strong>Số ghế:</strong> {getSeatNumbers(selectedSeatsDeparture, seatsDeparture).join(', ')}      
          <p><strong>Tổng tiền lượt đi:</strong> {totalDeparturePrice.toLocaleString()} VND</p>
        </Box>
        </Box>
        <div className={styles.statusContainer}>
        <div className={styles.statusItem}>
            <div className={`${styles.statusBox} ${styles.bookedStatus}`}/>
            <span className={styles.statusText}>Đã đặt</span>
        </div>
        <div className={styles.statusItem}>
            <div className={`${styles.statusBox} ${styles.availableStatus}`} />
            <span className={styles.statusText}>Còn trống</span>
        </div>
    </div>
        <button className={styles.bookButton} onClick={handleBookTicket}>Đặt vé</button>
      </div>

      <div className={styles.container2}>
        <div className={styles.texttilte}><h4>{routeDataReturn.departPlace} - {routeDataReturn.arrivalPlace}</h4></div>
        <div className={styles.title1}>Tầng dưới</div>
        <div className={styles.title2}>Tầng trên</div>
        <Box className={styles.seatLayout}>
        <Box></Box>
          <Box className={styles.seatColumn}>
            {seatsReturn.slice(0, 19).map((seat) => (
              <Box
                key={seat.seatID}
                className={`${styles.seat} ${seat.isBooked ? styles.booked : selectedSeatsReturn.includes(seat.seatID) ? styles.selected : styles.available}`}
                onClick={() => toggleReturnSeatSelection(seat)}
              >
                {seat.seatNumber}
              </Box>
            ))}
          </Box>
          <Box className={styles.seatColumn}>
            {seatsReturn.slice(19).map((seat) => (
              <Box
                key={seat.seatID}
                className={`${styles.seat} ${seat.isBooked ? styles.booked : selectedSeatsReturn.includes(seat.seatID) ? styles.selected : styles.available}`}
                onClick={() => toggleReturnSeatSelection(seat)}
              >
                {seat.seatNumber}
              </Box>
            ))}
          </Box>
       
        <Box className={styles.details}>
          <h2 className={styles.center}>Thông tin lượt về</h2>
          <p><strong>Tuyến xe:</strong> {routeDataReturn.departPlace} - {routeDataReturn.arrivalPlace}</p>
          <p><strong>Thời gian xuất bến:</strong> {routeDataReturn.departureTime}</p>
          <p><strong>Số lượng ghế:</strong> {selectedSeatsReturn.length}</p>
          <p><strong>Số ghế:</strong> {getSeatNumbers(selectedSeatsReturn, seatsReturn).join(', ')}</p>
          <p><strong>Tổng tiền lượt về:</strong> {totalReturnPrice.toLocaleString()} VND</p>
        </Box>
        </Box>
        <div className={styles.statusContainer}>
        <div className={styles.statusItem}>
            <div className={`${styles.statusBox} ${styles.bookedStatus}`}/>
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
          routeOutbound={routeDataDeparture.departPlace  + " - " + routeDataDeparture.arrivalPlace}
          routeReturnbound={routeDataReturn.departPlace + " - " + routeDataReturn.arrivalPlace}
          departureTimeOutbound={routeDataDeparture.departureTime}
          departureTimeReturnbound={routeDataReturn.departureTime}
          totalPrice={totalDeparturePrice + totalReturnPrice}
          selectedReturnSeats={getSeatNumbers(selectedSeatsReturn, seatsReturn)}
          selectedOutboundSeats={getSeatNumbers(selectedSeatsDeparture, seatsDeparture)}

          totalReturnPrice={totalReturnPrice}
          totalOutboundPrice={totalDeparturePrice}
      
        />
      </div>
    </div>
  );
};

export default ChooseSeatScreenRound;
