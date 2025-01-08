import React from 'react';
import styles from './Navbar.module.css';
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarTicketClerk = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const response = await axios.post('http://localhost:5278/api/auth/signout');

            if (response.status === 200) {
                localStorage.clear();
            } else {
                console.error(response.data.message || 'Signout failed.');
            }
        } catch (error) {
            console.error('Error signing out:', error.response?.data || error.message);
        }
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.nameContainer} style={{ pointerEvents: 'none' }}>
                <span className={styles.name}>odau</span>
                <span className={styles.name1}>re</span>
                <span className={styles.name}>hon</span>
            </Box>

            <Box className={styles.thanhContainer}>
                <Link to="/ticketclerk/searchScreen" className={styles.tchuContainer}>
                    <span className={styles.text}>ĐẶT VÉ</span>
                </Link>
                <Link to="/ticketclerk/lookupticketstaff" className={styles.tchuContainer}>
                    <span className={styles.text}>TRA CỨU VÉ</span>
                </Link>
                <Link to="/ticketclerk/notification" className={styles.tchuContainer}>
                    <span className={styles.text}>THÔNG BÁO</span>
                </Link>

                <Box className={styles.ava} />
                <Link to="/signin" className={styles.logoutContainer} onClick={handleSignOut}>
                    <span className={styles.text}>ĐĂNG XUẤT</span>
                </Link>
            </Box>
        </Box>
    );
};

export default NavbarTicketClerk;
