
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
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./manageAccScreen.module.css";
import AddAccountModal from "./modalAdd"; // Modal Thêm tài khoản
import ActionModal from "./modalAction"; // Modal Hành động
import DeleteModal from "./modalDelete"; // Modal Xóa
import EditModal from "./modalEdit"; // Modal Chỉnh sửa

const ManageAccScreen = () => {
  const navigate = useNavigate();

  // States
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:5278/api/account", {
        params: { searchQuery },
      });
      console.log("Dữ liệu nhận được từ API:", response.data); // Log ra dữ liệu nhận được từ API
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleSearch = async (searchQuery ) => {
    try {
      const response = await axios.get(`http://localhost:5278/api/account`, {
        params: {searchQuery },
    });
      console.log("Dữ liệu tìm kiếm:", response.data); // Log dữ liệu tìm được từ API
      setResults(response.data); // Cập nhật kết quả
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };
  

  const handleRowClick = (account) => {
    setSelectedAccount(account);
    setActionModalOpen(true);
  };

  const handleEdit = (updatedAccount) => {
    setResults((prevResults) =>
      prevResults.map((account) =>
        account.accountID === updatedAccount.accountID ? updatedAccount : account
      )
    );
    setEditModalOpen(false); // Close modal after update
    fetchAccounts();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5278/api/account/${selectedAccount.accountID}`);
      setResults(results.filter((account) => account.accountID !== selectedAccount.accountID));
      setDeleteModalOpen(false);
      setActionModalOpen(false);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchAccounts(); // Tải lại tất cả tài khoản nếu không nhập gì
    }
  }, [searchQuery]);
  
  return (
    <div className={styles.container}>
      {/* Back Button */}
      <div className={styles.backIcon}>
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
        </Button>
      </div>

      {/* Title */}
      <div className={styles.title}>QUẢN LÝ TÀI KHOẢN</div>

      {/* Filters */}
      <Box className={styles.filter}>
        <TextField
          label="Tìm theo tài khoản"
    
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
          onClick={handleSearch}
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

      {/* Results Table */}
      {results.length > 0 ? (
        <TableContainer component={Paper} className={styles.resultContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Họ và tên</strong></TableCell>
                <TableCell><strong>Giới tính</strong></TableCell>
                <TableCell><strong>Số điện thoại</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Mật khẩu</strong></TableCell>
                <TableCell><strong>Loại</strong></TableCell>
                <TableCell><strong>Trạng thái</strong></TableCell>
                <TableCell><strong>Thông tin bổ sung</strong></TableCell>
                <TableCell><strong>Số điểm thành viên</strong></TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((user, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(user)}
                  className={styles.tablerow}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{user.accountID}</TableCell> {/* ID */}
                  <TableCell>{user.name}</TableCell> {/* Họ và tên */}
                  <TableCell>{user.gender}</TableCell> {/* Loại */}
                  <TableCell>{user.phoneNumber}</TableCell> {/* Số điện thoại */}
                  <TableCell>{user.userName}</TableCell> {/* Email */}
                  <TableCell>{user.password}</TableCell> {/* Số điện thoại */}
                  <TableCell>
                    {user.userType=="Driver" && `Tài xế`}
                    {user.userType=="TicketClerk"  && `Nhân viên`}
                    {user.userType=="Customer"  && `Khách hàng `}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: user.status === "active" ? "#D7987D" : "#2E6B75",
                        fontWeight: "bold",
                      }}
                    >
                      {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.licenseNumber!=null && `Bằng lái: ${user.licenseNumber}`}
                    {user.hireDate!=null  && `Ngày tuyển dụng: ${user.hireDate}`}
                    {user.address!=null  && `Địa chỉ: ${user.address}`}
                  </TableCell>
                        <TableCell>{user.loyaltyPoints != null ? user.loyaltyPoints : 0}</TableCell> {/* Hiển thị số điểm thành viên */}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Không tìm thấy dữ liệu.</p>
      )}

      {/* Modals */}
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
        selectedAccount={selectedAccount}
      />
      <EditModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        selectedAccount={selectedAccount}
        onAccountUpdate={handleEdit}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ManageAccScreen;
