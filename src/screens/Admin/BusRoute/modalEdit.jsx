
// import React, { useState, useEffect } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import axios from "axios";

// const EditModal = ({ open, onClose, selectedRoute, onRouteUpdate }) => {
//   const [formData, setFormData] = useState({
//     busRouteId: "",
//     departPlace: "",
//     arrivalPlace: "",
//     departureTime: "",
//     duration: "",
//   });

//   useEffect(() => {
//     console.log("selectedRoute trong EditModal:", selectedRoute); // Log giá trị của selectedRoute

//     if (selectedRoute && open) {
//       setFormData({
//         busRouteId: selectedRoute.busRouteId,
//         departPlace: selectedRoute.departPlace,
//         arrivalPlace: selectedRoute.arrivalPlace,
//         departureTime: selectedRoute.departureTime,
//         duration: selectedRoute.duration,
//       });
//     }
//   }, [selectedRoute, open]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     // Kiểm tra busRouteId
//     console.log("BusRouteID trước khi gửi request:", formData.busRouteId); // Log giá trị busRouteId

//     if (!formData.busRouteId) {
//       console.error("BusRouteID is missing or invalid!");
//       alert("BusRouteID is missing or invalid!");
//       return;
//     }
  
//     const updatedRoute = {
//       ...formData,
//       departureTime: new Date(formData.departureTime).toISOString(), // Đảm bảo định dạng ISO
//     };
  
//     try {
//       console.log("Updating route with ID: ", updatedRoute.busRouteId); // Kiểm tra giá trị busRouteId
//       const response = await axios.put(`http://localhost:5278/api/busroute/${updatedRoute.busRouteId}`, updatedRoute);
//       console.log("Tuyến xe đã được cập nhật: ", response.data);
//       onRouteUpdate(response.data); // Cập nhật dữ liệu trong ManageBusRouteScreen
//       onClose(); 
//     } catch (error) {
//       console.error("Có lỗi khi cập nhật tuyến xe: ", error.response ? error.response.data : error.message);
//     }
//   };
  

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>
//         <Button onClick={onClose} sx={{ minWidth: "40px" }}>
//           <ArrowBackIosIcon />
//         </Button>
//         Chỉnh Sửa Tuyến Xe
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Mã tuyến xe"
//           name="busRouteId"
//           value={formData.busRouteId}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Điểm đi"
//           name="departPlace"
//           value={formData.departPlace}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Điểm đến"
//           name="arrivalPlace"
//           value={formData.arrivalPlace}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Thời gian khởi hành"
//           name="departureTime"
//           type="datetime-local"
//           value={formData.departureTime}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Thời gian di chuyển"
//           name="duration"
//           value={formData.duration}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} variant="outlined" sx={{ color: "#2E6B75" }}>
//           Hủy
//         </Button>
//         <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#D7987D", color: "#ffffff" }}>
//           Cập nhật
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditModal;
import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"; // Import DateTimePicker
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";

const EditModal = ({ open, onClose, selectedRoute, onRouteUpdate }) => {
  const [formData, setFormData] = useState({
    busRouteId: "",
    departPlace: "",
    arrivalPlace: "",
    departureTime: null, 
    duration: "",
    pricePerSeat:"",
    pricePerSeatVip:"",
  });

  useEffect(() => {
    if (selectedRoute && open) {
      console.log("selectedRoute inside useEffect: ", selectedRoute);
      setFormData({
        busRouteId: selectedRoute.busRouteID,
        departPlace: selectedRoute.departPlace,
        arrivalPlace: selectedRoute.arrivalPlace,
        departStation: selectedRoute.departStation,
        arrivalStation: selectedRoute.arrivalStation,
        departureTime: selectedRoute.departureTime ? new Date(selectedRoute.departureTime) : null, 
        duration: selectedRoute.duration,
        pricePerSeat: selectedRoute.pricePerSeat,
        pricePerSeatVip:selectedRoute.pricePerSeatVip,
      });
    }
  }, [selectedRoute, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, departureTime: newValue });
  };

  const handleSubmit = async () => {
    console.log("Form Data trước khi gửi request:", formData);
  
    if (!formData.busRouteId) {
      console.error("BusRouteID is missing or invalid!");
      alert("BusRouteID is missing or invalid!");
      return;
    }
  
    const updatedRoute = {
      ...formData,
      departureTime: new Date(formData.departureTime).toISOString(), // Đảm bảo định dạng ISO
    };
  
    try {
      const response = await axios.put(`http://localhost:5278/api/busroute/${updatedRoute.busRouteId}`, updatedRoute);
      console.log("Tuyến xe đã được cập nhật: ", response.data);
      onRouteUpdate(response.data); 
      onClose();
    } catch (error) {
      console.error("Có lỗi khi cập nhật tuyến xe: ", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={onClose} sx={{ minWidth: "40px" }}>
          <ArrowBackIosIcon />
        </Button>
        Chỉnh Sửa Tuyến Xe
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Mã tuyến xe"
          name="busRouteId"
          value={formData.busRouteId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Điểm đi"
          name="departPlace"
          value={formData.departPlace}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Điểm đến"
          name="arrivalPlace"
          value={formData.arrivalPlace}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
                <TextField
          label="Trạm đi"
          name="departStation"
          value={formData.departStation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Trạm đến"
          name="arrivalStation"
          value={formData.arrivalStation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Thời gian khởi hành"
            value={formData.departureTime}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </LocalizationProvider>
        <TextField
          label="Thời gian di chuyển"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Giá vé thường"
          name="pricePerSeat"
          value={formData.pricePerSeat}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Giá vé Vip"
          name="pricePerSeatVip"
          value={formData.pricePerSeatVip}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" sx={{ color: "#2E6B75" }}>
          Hủy
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#D7987D", color: "#ffffff" }}>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
