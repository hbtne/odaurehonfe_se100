import React from 'react';
import styles from './Navbar.module.css';
import { Box } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const NavbarDriver = () => {
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
                <text className={styles.name}>odau</text>
                <text className={styles.name1}>re</text>
                <text className={styles.name}>hon</text>
            </Box>

            <Box className={styles.thanhContainer}>
                <Link to="/driver/viewschedule" className={styles.tchuContainer}>
                    <text className={styles.text}>LỊCH TRÌNH</text>
                </Link>
                <Box className={styles.ava} />
                <Link to="/signin" className={styles.logoutContainer} onClick={handleSignOut}>
                    <text className={styles.text}>ĐĂNG XUẤT</text>
                </Link>
            </Box>
        </Box>
    );
};
export default NavbarDriver;
