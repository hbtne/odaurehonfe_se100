import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import styles from "./ReportScreen.module.css";

const ReportScreen = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    id: "",
    departure: "",
    destination: "",
    date: "",
  });

  const fetchBusRoutes = async () => {
    try {
      const params = {
        id: searchQuery.id,
        departure: searchQuery.departure,
        destination: searchQuery.destination,
        date: searchQuery.date,
      };
  
      const response = await axios.get(
        "http://localhost:5278/api/busroute/bus-route-report",
        { params } 
      );
  
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching bus routes:", error);
    }
  };
  
  useEffect(() => {
    fetchBusRoutes(); 
  }, []);

  const handleFilter = () => {
    fetchBusRoutes();
  };
  

  const calculateTotalRevenue = () => {
    return results.reduce((sum, route) => sum + route.totalRevenue, 0);
  };
  const handleExport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5278/api/busroute/bus-route-report-export",
        {
          params: searchQuery, 
          responseType: "blob", 
        }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "BusRouteReport.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting file:", error);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.backIcon}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
      </div>
      <div className={styles.title}>BÁO CÁO</div>

      <Box className={styles.filter}>
        <TextField
          label="Tìm theo mã tuyến"
          onChange={(e) =>
            setSearchQuery((prev) => ({ ...prev, id: e.target.value }))
          }
          sx={{ width: "200px", marginRight: "16px" }}
        />
        <TextField
          label="Điểm đi"
          onChange={(e) =>
            setSearchQuery((prev) => ({ ...prev, departure: e.target.value }))
          }
          sx={{ width: "200px", marginRight: "16px" }}
        />
        <TextField
          label="Điểm đến"
          onChange={(e) =>
            setSearchQuery((prev) => ({ ...prev, destination: e.target.value }))
          }
          sx={{ width: "200px", marginRight: "16px" }}
        />
        <TextField
          label="Ngày"
          type="date"
          onChange={(e) =>
            setSearchQuery((prev) => ({ ...prev, date: e.target.value }))
          }
          InputLabelProps={{ shrink: true }}
          sx={{ width: "200px", marginRight: "16px" }}
        />
        <Button
          sx={{
            color: "#ffffff",
            backgroundColor: "#D7987D",
            borderRadius: "30px",
            width: "140px",
            height: "60px",
          }}
          onClick={handleFilter}
        >
          Tìm kiếm
        </Button>
        <Button
          sx={{
            color: "#ffffff",
            backgroundColor: "#2E6B75",
            borderRadius: "30px",
            width: "140px",
            height: "60px",
          }}
          onClick={handleExport}
        >
          Xuất file
        </Button>
      </Box>

      {results.length > 0 ? (
        <TableContainer
          component={Paper}
          className={styles.resultContainer}
          sx={{ overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Mã tuyến</strong></TableCell>
                <TableCell><strong>Thời gian khởi hành</strong></TableCell>
                <TableCell><strong>Điểm đi</strong></TableCell>
                <TableCell><strong>Điểm đến</strong></TableCell>
                <TableCell><strong>Các bus đang vận hành</strong></TableCell>
                <TableCell><strong>Số vé</strong></TableCell>
                <TableCell><strong>Số vé đã bán</strong></TableCell>
                <TableCell><strong>Tổng thu</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((busRoute, index) => (
                <TableRow key={index} className={styles.tablerow}>
                  <TableCell>{busRoute.busRouteId}</TableCell>
                  <TableCell>{busRoute.departureTime}</TableCell>
                  <TableCell>{busRoute.departure}</TableCell>
                  <TableCell>{busRoute.destination}</TableCell>
                  <TableCell>{busRoute.busIds}</TableCell>
                  <TableCell>{busRoute.totalTickets}</TableCell>
                  <TableCell>{busRoute.soldTickets}</TableCell>
                  <TableCell>{busRoute.totalRevenue.toLocaleString()} VNĐ</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={7} align="right">
                  <strong>Tổng doanh thu:</strong>
                </TableCell>
                <TableCell>
                  <strong>{calculateTotalRevenue().toLocaleString()} VNĐ</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Không tìm thấy dữ liệu.</p>
      )}
    </div>
  );
};

export default ReportScreen;
