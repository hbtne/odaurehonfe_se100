import React, { useState } from 'react';
import styles from './ConfirmPay.module.css';

const ConfirmPay = ({
  isOpen,
  onClose,
  onConfirm,
  discount,
  totalPrice,
  originPrice,
  onPaymentMethodChange,  
}) => {
  const [paymentMethod, setPaymentMethod] = useState('VNPay');

  if (!isOpen) return null;

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    onPaymentMethodChange(e.target.value);  
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>THÔNG TIN THANH TOÁN</h3>

        <div className={styles.paymentMethod}>
          <label>
            <input
              type="radio"
              value="VNPay"
              checked={paymentMethod === 'VNPay'}
              onChange={handlePaymentChange}
            />
            VNPay
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="Momo"
              checked={paymentMethod === 'Momo'}
              onChange={handlePaymentChange}
            />
            Momo
          </label>
        </div>
        <hr />

        <div className={styles.priceInfo}>
          <span>Giá vé:</span>
          <span>{originPrice.toLocaleString()} VND</span>
        </div>
        <div className={styles.priceInfo}>
          <span>Giảm giá:</span>
          <span>{discount} %</span>
        </div>

        <hr />

        <div className={styles.totalPrice}>
          <strong>Thành tiền:</strong> {totalPrice.toLocaleString()} VND
        </div>

        <p className={styles.warning}>
          Khách hàng phải thanh toán trước khi xe khởi hành
        </p>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Hủy
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPay;