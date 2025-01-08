import React, { useState, useEffect } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import styles from "./manageTicketScreen.module.css";
import AddAccountModal from "./modalAdd";
import ActionModal from "./modalAction";
import DeleteModal from "./modalDelete";
import EditModal from "./modalEdit";

const ManagePromotionScreen = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:5278/api/promotion");
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const handleFilter = () => {
    let filteredResults = promotions;

    if (searchQuery) {
      filteredResults = filteredResults.filter(
        (promotion) =>
          promotion.promotionId.includes(searchQuery) ||
          promotion.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setPromotions(filteredResults);
  };

  const handleRowClick = (promotion) => {
    setSelectedPromotion(promotion);
    setActionModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5278/api/promotion/${selectedPromotion.promoID}`);
      setPromotions(promotions.filter((promotion) => promotion.promoID !== selectedPromotion.promoID));
      setDeleteModalOpen(false);
      setActionModalOpen(false);
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backIcon}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
      </div>
      <div className={styles.title}>QUẢN LÝ KHUYẾN MÃI</div>

      <Box className={styles.filter}>
        <TextField
          label="Tìm theo tên/ID"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "200px", marginRight: "16px" }}
        />
        <Button
          sx={{ color: "#ffffff", backgroundColor: "#D7987D", borderRadius: "30px", width: "140px", height: "60px" }}
          onClick={handleFilter}
        >
          Tìm kiếm
        </Button>
        <Button
          sx={{ color: "#ffffff", backgroundColor: "#2E6B75", borderRadius: "30px", width: "140px", height: "60px" }}
          onClick={() => setAddModalOpen(true)}
        >
          Thêm
        </Button>
      </Box>

      <AddAccountModal open={isAddModalOpen} onClose={() => setAddModalOpen(false)} />

      {promotions.length > 0 ? (
        <TableContainer component={Paper} className={styles.resultContainer} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Mã khuyến mãi</strong></TableCell>
                <TableCell><strong>Tên khuyến mãi</strong></TableCell>
                <TableCell><strong>Ngày bắt đầu</strong></TableCell>
                <TableCell><strong>Ngày kết thúc</strong></TableCell>
                <TableCell><strong>Khuyến mãi</strong></TableCell>
                <TableCell><strong>Khuyến mãi theo phần trăm</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promotions.map((promotion, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(promotion)}
                  className={styles.tablerow}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{promotion.promoID}</TableCell>
                  <TableCell>{promotion.name}</TableCell>
                  <TableCell>{promotion.startDate}</TableCell>
                  <TableCell>{promotion.endDate}</TableCell>
                  <TableCell>{promotion.discount}</TableCell>
                  <TableCell>{promotion.discountPercent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Không tìm thấy dữ liệu.</p>
      )}

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
        selectedPromotion={selectedPromotion}
      />

      <EditModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        promotion={selectedPromotion}
        fetchPromotions={fetchPromotions}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManagePromotionScreen;
