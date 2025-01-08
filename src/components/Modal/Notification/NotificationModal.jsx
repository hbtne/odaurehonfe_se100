import React from 'react';
import styles from './NotificationModal.module.css';

const NotificationModal = ({ isOpen, message, isHandled, onClose, onHandle }) => {
  if (!isOpen) return null;

  const statusMessage = isHandled ? "Đã xử lý" : "Đang chờ";

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Thông báo</h3>
        <div className={styles.content}>
          <p className={styles.left}><strong>Nội dung:</strong> {message}</p>
          <p className={styles.left}><strong>Trạng thái:</strong> {statusMessage}</p>
        </div>
        <button className={styles.cancelButton} onClick={onClose}>Đóng</button>
        <button className={styles.confirmButton} onClick={ onHandle}>Xử lý</button>
      </div>
    </div>
  );
};

export default NotificationModal;
