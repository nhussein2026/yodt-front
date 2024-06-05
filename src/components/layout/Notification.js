// Notification.js
import React from 'react';

const Notification = ({ notification, onUpdateStatus }) => {
  const handleUpdateStatus = () => {
    onUpdateStatus(notification._id);
  };

  return (
    <>
    <h2>
        this is notification
        {notification}
    </h2>
    </>
    // <div className={`notification-item ${notification.status}`}>
    //   <p>{notification.message}</p>
    //   {notification.status === 'unread' && (
    //     <button onClick={handleUpdateStatus}>Mark as Read</button>
    //   )}
    // </div>
  );
};

export default Notification;
