
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "./HistoryBookingScreen.module.css";
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";

const TicketDetails = ({ ticket }) => {
  const departureDate = new Date(ticket.departureTime);

  const hours = departureDate.getHours();
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedMinutes = departureDate.getMinutes().toString().padStart(2, '0');

  const formattedDepartureTime = `
    ${formattedHours}:${formattedMinutes} ${period} 
    ngày 
    ${departureDate.getDate().toString().padStart(2, '0')}/
    ${(departureDate.getMonth() + 1).toString().padStart(2, '0')}/
    ${departureDate.getFullYear()}
  `.trim().replace(/\s+/g, ' '); 
  return (
    <Box className={styles.ticketDetails}>
      <div className={styles.row}>
        <span className={styles.label}>Mã vé:</span>
        <span className={styles.value}>{ticket.ticketId}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Giá vé:</span>
        <span className={styles.value}>{ticket.price}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Số ghế:</span>
        <span className={styles.value}>{ticket.seatNumber}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Nơi đi:</span>
        <span className={styles.value}>{ticket.departure}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Nơi đến:</span>
        <span className={styles.value}>{ticket.destination}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Giờ khởi hành:</span>
        <span className={styles.value}>{formattedDepartureTime}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Số xe:</span>
        <span className={styles.value}>{ticket.busNumber}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Biển số xe:</span>
        <span className={styles.value}>{ticket.licensePlate}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Tình trạng:</span>
        <span className={styles.value}>{ticket.status}</span>
      </div>
    </Box>
  );
};


const TicketActions = ({ ticket }) => {
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      const response = await axios.post(`http://localhost:5278/cancel-ticket-request/${ticket.ticketId}`);
      if (response.data.message) {
        alert(response.data.message); 
      }
    } catch (error) {
      alert("Error request canceling ticket: " + error.message);
    }
  };

  const handleChangeTicket = () => {
    navigate(`/customer/chooseRouteChange/${ticket.ticketId}`);
  };
  return (
    <div className={styles.conbut}>
      <div className={styles.cancelButton}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#D7987D",
            borderRadius: "25px",
          }}
          onClick={handleChangeTicket}
        >
          Đổi vé
        </Button>
      </div>

      <div className={styles.cancelButton}>
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: "25px",
          }}
          onClick={handleCancel}
        >
          Hủy vé
        </Button>
      </div>
    </div>
  );
};


const HistoryBookingScreen = () => {
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const accountId = localStorage.getItem("accountId");
        const response = await axios.get(
          `http://localhost:5278/booked-tickets/${accountId}`
        );
        
        setResults(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể lấy dữ liệu lịch sử đặt vé.");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const recentTickets = results.filter((ticket) => ticket.isDeparted === "Chưa khởi hành");
  const departedTickets = results.filter((ticket) => ticket.isDeparted === "Đã khởi hành");

  if (loading) {
    return <Typography>Đang tải dữ liệu...</Typography>;
  }

  if (error) {
    return <Typography style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
      {error}
    </Typography>;
  }

    return (
    <div className={styles.container}>
      <div className={styles.backIcon}>
        <Button>
          <ArrowBackIosIcon />
        </Button>
      </div>
      <div className={styles.title}>LỊCH SỬ ĐẶT VÉ</div>

      {results.length > 0 ? (
        <Box className={styles.resultContainer}>
          <div style={{ marginBottom: "20px" }}>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              Gần đây nhất
            </Typography>
            {recentTickets.map((ticket, index) => (
              <Card
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                <CardContent>
                <TicketDetails ticket={ticket} />
                <TicketActions ticket={ticket} />
                </CardContent>
              </Card>
            ))}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              Đã khởi hành
            </Typography>
            {departedTickets.map((ticket, index) => (
              <Card
                key={index}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                }}
              >
                <CardContent>
                  <TicketDetails ticket={ticket} />
                  <Typography
                    style={{
                      marginTop: "10px",
                      fontWeight: "bold",
                      color: "#555",
                    }}
                  >
                    Trạng thái: Đã khởi hành
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>
      ) : (
        <Typography style={{ textAlign: "center", marginTop: "20px" }}>
          Chưa có dữ liệu lịch sử đặt vé.
        </Typography>
      )}
    </div>
  );
};

export default HistoryBookingScreen;