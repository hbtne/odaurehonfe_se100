import React, { useState ,useEffect} from 'react';
import NotificationModal from '../../../components/Modal/Notification/NotificationModal'; 
import styles from './NotificationList.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NotificationList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5278/api/notificaton');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    

    fetchNotifications();
  }, []);
  const handleOpenModal = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  const handleConfirm = () => {
    if (selectedNotification) {
      if (selectedNotification.message.includes('Request to cancel ticket')) {
        const notificationId = selectedNotification.notificationID;
        cancelTicket(notificationId); 
      } else if (selectedNotification.message.includes('Request to change ticket')) {
        if (selectedNotification.notificationID) {
          navigate(`/ticketclerk/changeTicket/${selectedNotification.notificationID}`);
        } else {
          console.error('Missing notificationID');
        }
      }
  
      handleCloseModal();
    }
  };
  
  const cancelTicket = async (notificationId) => {
    try {
      const response = await axios.delete(`http://localhost:5278/cancel-ticket/${notificationId}`);
      
      if (response.status === 200) {
        console.log(response.data.message);  
        alert("Ticket has been canceled");
      } else {
        console.error('Error canceling ticket:', response.data.error);
      }
    } catch (error) {
      console.error('Error canceling ticket:', error);
    }
  };
  
  

  return (
    <div className={styles.notificationList}>
      <h2>Danh sách thông báo</h2>
      {notifications.length === 0 ? (
        <p>Không có thông báo nào.</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li
              key={index}
              className={styles.notificationItem}
              onClick={() => handleOpenModal(notification)}
            >
              <p><strong>Thông báo #{notification.notificationID}</strong></p>
              <p>{notification.message}</p>
              <p><em>{notification.isHandled ? 'Đã xử lý' : 'Đang chờ'}</em></p>
            </li>
          ))}
        </ul>
      )}

      {/* Modal thông báo */}
      <NotificationModal
        isOpen={isModalOpen}
        message={selectedNotification?.message || ''}
        isHandled={selectedNotification?.isHandled || false}
        onClose={handleCloseModal}
        onHandle={handleConfirm}
      />
    </div>
  );
};

export default NotificationList;
