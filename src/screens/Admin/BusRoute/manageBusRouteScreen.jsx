
import React, { useState, useEffect } from "react";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import styles from "./manageBusRouteScreen.module.css";
import AddAccountModal from "./modalAdd"; 
import ActionModal from "./modalAction"; 
import DeleteModal from "./modalDelete"; 
import EditModal from "./modalEdit"; 
import axios from "axios";

const ManageBusRouteScreen = () => {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedBusRoute, setSelectedBusRoute] = useState(null);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [selectedTimeFrames, setSelectedTimeFrames] = useState({
  //   "0:00 - 6:00": false,
  //   "6:00 - 12:00": false,
  //   "12:00 - 18:00": false,
  //   "18:00 - 0:00": false,
  // });

   useEffect(() => {
    const fetchBusRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:5278/api/busroute", {
          params: {
            searchQuery
           
          },
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching bus routes:", error);
      }
    };
    fetchBusRoutes();
    }, []);


  const handleFilter = async () => {
    console.log("Searching for:", searchQuery); 
    try {
      const response = await axios.get("http://localhost:5278/api/busroute", {
        params: { searchQuery: searchQuery }
      });
      
      setResults(response.data); 
    } catch (error) {
      console.error("Error filtering bus routes:", error);
    }
  };
  
  

  

  const handleRowClick = (busRoute) => {
    setSelectedBusRoute(busRoute);
    setActionModalOpen(true);
  };

  const handleEdit = (updatedRoute) => {
    setResults((prevResults) =>
      prevResults.map((route) =>
        route.busRouteID === updatedRoute.busRouteID ? updatedRoute : route
      )
    );
    setEditModalOpen(false); 
  };

 
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5278/api/busroute/${selectedBusRoute.busRouteID}`
      );
      setResults(
        results.filter(
          (busRoute) => busRoute.busRouteID !== selectedBusRoute.busRouteID
        )
      );
      setDeleteModalOpen(false);
      setActionModalOpen(false);
    } catch (error) {
      console.error("Error deleting bus route:", error);
    }
  };

  
  
  // const handleTimeFrameChange = (timeFrame) => {
  //   console.log("Selected timeFrames:", timeFrame);
  //   setSelectedTimeFrames((prev) => ({
  //     ...prev,
  //     [timeFrame]: !prev[timeFrame],
  //   }));
  // };
  

  return (
    <div className={styles.container}>
      <div className={styles.backIcon}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
      </div>

      <div className={styles.title}>QUẢN LÝ TUYẾN XE</div>

      <Box className={styles.filter}>
        <TextField
          label="Tìm theo tuyến"
          onChange={(e) => setSearchQuery(e.target.value)}
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
          onClick={() => setAddModalOpen(true)}
        >
          Thêm
        </Button>
      </Box>

      {/* <Box className={styles.timeFilter}>
  <strong>Khung thời gian</strong>
  {Object.keys(selectedTimeFrames).map((timeFrame) => (
    <FormControlLabel
      key={timeFrame}
      control={
        <Checkbox
          checked={selectedTimeFrames[timeFrame]}
          onChange={() => handleTimeFrameChange(timeFrame)}
        />
      }
      label={timeFrame}
    />
  ))}
</Box> */}


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
                <TableCell><strong>Quãng thời gian đi </strong></TableCell>
                <TableCell><strong>Điểm đi</strong></TableCell>
                <TableCell><strong>Điểm đến</strong></TableCell>
                <TableCell><strong>Trạm đi</strong></TableCell>
                <TableCell><strong>Trạm đến</strong></TableCell>
                <TableCell><strong>Giá vé thường</strong></TableCell>
                <TableCell><strong>Giá vé vip</strong></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((busRoute, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(busRoute)}
                  className={styles.tablerow}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{busRoute.busRouteID}</TableCell>
                  <TableCell>{busRoute.departureTime}</TableCell>
                  <TableCell>{busRoute.duration}</TableCell>
                  <TableCell>{busRoute.arrivalPlace}</TableCell>
                  <TableCell>{busRoute.departPlace}</TableCell>
                  <TableCell>{busRoute.arrivalStation}</TableCell>
                  <TableCell>{busRoute.departStation}</TableCell>
                  <TableCell>{busRoute.pricePerSeat}</TableCell>
                  <TableCell>{busRoute.pricePerSeatVip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Không tìm thấy dữ liệu.</p>
      )}

      <AddAccountModal open={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      <ActionModal
        open={isActionModalOpen}
        onClose={() => setActionModalOpen(false)}
        onEdit={() => {
          setEditModalOpen(true);
          setActionModalOpen(false);
        }}
        onDelete={() => {
          setDeleteModalOpen(true);
          setActionModalOpen(false);
        }}
        selectedBusRoute={selectedBusRoute}
      />
      <EditModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        selectedRoute={selectedBusRoute}
        onRouteUpdate={handleEdit}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManageBusRouteScreen;
