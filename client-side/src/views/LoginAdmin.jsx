import React, { useState } from 'react'
import useHookAdmin from '../hooks/useHookAdmin'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginAdmin() {
  const { login } = useHookAdmin()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const notify = (string) => toast(string)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(form)
      notify('Login Success')
      setTimeout(() => {
        navigate('/adminpanel/dashboard');
      }, 2000)
    } catch (error) {
      notify('Login Failed')
    }
  }

  const registerPage = () => {
    navigate('/register')
  }
  return (
    <div className='p-5' style={{ minHeight: '100vh', minWidth: '100vw' }}>
      <h1 className="text-center m-5 p-2">ADMIN PANEL</h1>
      <form style={{ margin: 'auto', width: 'fit-content' }} onSubmit={handleLogin} >
        <div className="mb-3">
          <label  className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleInputUsername" placeholder="username" name='username' value={form.username} onChange={handleForm} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name='password' value={form.password} onChange={handleForm} />
            <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </form>
    </div>
  )
}
