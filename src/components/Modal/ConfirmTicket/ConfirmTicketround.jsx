import React from 'react';
import styles from './ConfirmTicketround.module.css';
const ConfirmTicketround = ({ 
    isOpen,
    onClose,
    onConfirm,
    routeOutbound,
    routeReturnbound,
    departureTimeOutbound,
    departureTimeReturnbound,
    selectedReturnSeats=[],
    selectedOutboundSeats=[],
    totalReturnPrice,
    totalOutboundPrice,
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
          <h3 className={styles.title}>Xác nhận đặt vé</h3>
          <div className={styles.content}>
            <h4 className={styles.center}>Thông tin lượt đi</h4>
            <p className={styles.left}><strong>Tuyến xe:</strong> {routeOutbound}</p>
            <p className={styles.left}><strong>Thời gian xuất bến:</strong> {departureTimeOutbound}</p>
        <p  className={styles.left}><strong>Số lượng ghế:</strong> {selectedOutboundSeats.length}</p>
        <p className={styles.left}><strong>Số ghế:</strong> {selectedOutboundSeats.join(', ')}</p>
        <p className={styles.left}><strong>Tổng tiền lượt đi:</strong> {totalOutboundPrice.toLocaleString()} đồng</p>
          </div>
          <div className={styles.content}>
            <h4 className={styles.center}>Thông tin lượt về</h4>
            <p className={styles.left}><strong>Tuyến xe:</strong> {routeReturnbound}</p>
            <p className={styles.left}><strong>Thời gian xuất bến:</strong> {departureTimeReturnbound}</p>
        <p  className={styles.left}><strong>Số lượng ghế:</strong> {selectedReturnSeats.length}</p>
        <p className={styles.left}><strong>Số ghế:</strong> {selectedReturnSeats.join(', ')}</p>
        <p className={styles.left}><strong>Tổng tiền lượt về:</strong> {totalReturnPrice.toLocaleString()} đồng</p>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onClose}>Hủy</button>
            <button className={styles.confirmButton} onClick={onConfirm}>Xác nhận</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmTicketround;