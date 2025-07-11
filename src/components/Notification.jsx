const Notification = ({ notification }) => {
  if (!notification) return null

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: '#f0f0f0',
    fontSize: 18,
    border: `2px solid ${notification.type === 'error' ? 'red' : 'green'}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
