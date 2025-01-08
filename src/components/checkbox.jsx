import React, { useState } from 'react';
import styles from './checkbox.module.css';

const CustomCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className={styles.checkboxInput}
      />
      <div className={styles.customCheckbox}></div >
      <div className={styles.text}>Chấp nhận <span className={styles.space}></span> <div className={styles.link}> điều khoản và quy định </div >  <span className={styles.space}></span>khi đặt vé</div>
    </label>
  );
};

export default CustomCheckbox;
