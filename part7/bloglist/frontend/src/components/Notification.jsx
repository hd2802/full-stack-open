import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  
  if (notification.message === "") return <div></div>;

  const alert_type = notification.type === 'error' ? 'warning' : 'success'

  return (
    <Alert variant={alert_type}>{notification.message}</Alert>
  );
}; 

export default Notification;