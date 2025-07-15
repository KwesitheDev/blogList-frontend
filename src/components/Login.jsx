const Login = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} data-testid="login-form">
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
