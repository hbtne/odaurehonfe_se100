import React from 'react';
import styles from './ConfirmTicket1way.module.css';
const ConfirmTicket1way = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    route, 
    departureTime, 
    selectedSeats=[], 
    totalPrice=0 
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
          <h3 className={styles.title}>Xác nhận đặt vé</h3>
          <div className={styles.content}>
            <h4 className={styles.center}>Thông tin lượt đi</h4>
            <p className={styles.left}><strong>Tuyến xe:</strong> {route}</p>
            <p className={styles.left}><strong>Thời gian xuất bến:</strong> {departureTime}</p>
        <p  className={styles.left}><strong>Số lượng ghế:</strong> {selectedSeats.length}</p>
        <p className={styles.left}><strong>Số ghế:</strong> {selectedSeats.join(', ')}</p>
        <p className={styles.left}><strong>Tổng tiền lượt đi:</strong> {totalPrice.toLocaleString()} đồng</p>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onClose}>Hủy</button>
            <button className={styles.confirmButton} onClick={onConfirm}>Xác nhận</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmTicket1way;