import React from 'react';
import styles from './ConfirmTicket1way.module.css';
const ConfirmUpdate = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    route, 
    departureTime, 
    selectedSeats,
    totalPrice=0 
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
          <h3 className={styles.title}>Xác nhận cập nhật vé</h3>
          <div className={styles.content}>
            <h4 className={styles.center}>Thông tin vé</h4>
            <p className={styles.left}><strong>Tuyến xe:</strong> {route}</p>
            <p className={styles.left}><strong>Thời gian xuất bến:</strong> {departureTime}</p>
        <p className={styles.left}><strong>Số ghế:</strong> {selectedSeats}</p>
        <p className={styles.left}><strong>Giá vé</strong> {totalPrice.toLocaleString()} đồng</p>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onClose}>Hủy</button>
            <button className={styles.confirmButton} onClick={onConfirm}>Xác nhận</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmUpdate;