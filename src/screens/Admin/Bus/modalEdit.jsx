import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";  // Import axios nếu chưa có

const EditModal = ({ open, onClose, bus }) => {
  const [formData, setFormData] = useState({
    busID: "",
    numSeat: "",
    plateNum: "",
    type: "Xe thường",
    busRouteIds: "",
    driverIds: ""
  });

  useEffect(() => {
    console.log("selectedbus",bus);
    if (bus) {
      axios.get(`http://localhost:5278/api/bus/${bus.busID}`)
        .then(response => {
          setFormData({
            busID: response.data.busID,
            numSeat: response.data.numSeat,
            plateNum: response.data.plateNum,
            type: response.data.type,
            busRouteIds: response.data.busBusRoutes && response.data.busBusRoutes.length > 0
              ? response.data.busBusRoutes.map(route => route.busRouteID).join(", ")
              : "",
            driverIds: response.data.busDrivers && response.data.busDrivers.length > 0
              ? response.data.busDrivers.map(driver => driver.driverID).join(", ")
              : ""
          });
        })
        .catch(error => {
          console.error("Error fetching bus data:", error);
        });
    }
  }, [open, bus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios.put(`http://localhost:5278/api/bus/${formData.busID}`, formData)
      .then(() => {
        console.log("Bus data updated successfully:", formData);
        onClose();
      })
      .catch(error => {
        console.error("Error updating bus data:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Button onClick={onClose} sx={{ minWidth: "40px" }}>
          <ArrowBackIosIcon />
        </Button>
        Cập Nhật Xe
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Mã xe"
          name="busId"
          value={formData.busID}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Số ghế"
          name="numSeat"
          value={formData.numSeat}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Biển số xe"
          name="plateNum"
          value={formData.plateNum}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
                <TextField
          label="Loại xe"
          name="type"
          value={formData.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tuyến đang vận hành (ID)"
          name="busRouteIds"
          value={formData.busRouteIds}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mã lái xe (ID)"
          name="driverIds"
          value={formData.driverIds}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "#2E6B75",
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#D7987D",
            color: "#ffffff",
          }}
        >
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
