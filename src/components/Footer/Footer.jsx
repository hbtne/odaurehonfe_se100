import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.left}>
          <h3 className={styles.brand}>odau<span className={styles.highlight}>re</span>hon</h3>
          <p className={styles.support}>TRUNG TÂM HỖ TRỢ: <span className={styles.phone}>1900 1213</span></p>
          <p className={styles.companyName}>CÔNG TY CỔ PHẦN XE KHÁCH ODAUREHON</p>
          <p>Địa chỉ: đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</p>
          <p>Email: <a href="mailto:hotro.odaurehon@gmail.com">hotro.odaurehon@gmail.com</a></p>
          <p>Điện thoại: 0938.472.853</p>
          <p>Liên hệ với chúng tôi</p>
          <div className={styles.icons}>
            <i className={`fa fa-envelope ${styles.icon}`}></i>
            <i className={`fa fa-facebook ${styles.icon}`}></i>
            <i className={`fa fa-youtube ${styles.icon}`}></i>
          </div>
        </div>

 
        <div className={styles.center}>
          <h4 className={styles.sectionTitle}>odaurehon Bus Lines</h4>
          <ul className={styles.linkList}>
            <li><a href="#about">Về chúng tôi</a></li>
            <li><a href="#schedule">Lịch trình</a></li>
            <li><a href="#careers">Tuyển dụng</a></li>
            <li><a href="#news">Tin tức và sự kiện</a></li>
            <li><a href="#promotions">Khuyến mãi</a></li>
          </ul>
        </div>


        <div className={styles.right}>
          <h4 className={styles.sectionTitle}>Hỗ trợ khách hàng</h4>
          <ul className={styles.linkList}>
            <li><a href="#ticket-info">Tra cứu thông tin đặt vé</a></li>
            <li><a href="#terms">Điều khoản sử dụng</a></li>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
