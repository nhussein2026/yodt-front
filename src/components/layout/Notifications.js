// Notifications.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Notification from './Notification';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleUpdateStatus = async (notificationId) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/users/notifications/${notificationId}`, { status: 'read' });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, status: 'read' }
            : notification
        )
      );
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <Notification
          key={notification._id}
          notification={notification}
          onUpdateStatus={handleUpdateStatus}
        />
      ))}
    </div>
  );
};

export default Notifications;
