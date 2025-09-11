import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(notification.message === '') return <div></div>

  const baseStyle = {
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
  }
  
  const typeStyle = notification.type === 'error' 
    ? { color: 'red' }
    : { color: 'green' }
  
  return (
    <div style={{...baseStyle, ...typeStyle}}>
      {notification.message}
    </div>
  )
}

export default Notification