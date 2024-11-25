import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
// import Context from '../Context/Context';


const UserLogin = () => {




  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user_token');
    if (auth) {
      navigate('/');
    }
  }, []);

  const [Login, setLogin] = useState({
    email: '',
    password: ''
  });

  const HandleLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin({
      ...Login,
      [name]: value
    });
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      if (!Login.email || !Login.password) {
        toast.error('All fields are required');
      } else {
        const res = await fetch(`http://localhost:3000/userlogin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Login)
        });

        if (res.status === 402) {
          toast.error('All fields are required');
        } else if (res.status === 401) {
          toast.error('Invalid Email or password');
          setLogin({
            email: "",
            password: ""
          })
          navigate('/')
        } else if (res.status === 200) {
          const finalres = await res.json();
          localStorage.setItem('user_token', finalres.token);
          toast.success('Login Successfully');
          navigate('/');
        } else if (res.status === 403) {
          toast.error('Invalid Email or password');
          setLogin({
            email: "",
            password: ""
          })
          navigate('/')
        } else {
          toast.error('Server Error');
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error during user login:', error);
    }
  };
  return (
    <>

      <section className="fourth_section">
        <h1 className="login">LOGIN</h1>
        <div className="login_div">
          <form className="login_form">
            <input className='loginemail' type="email" name="email" id="email" value={UserLogin.email} placeholder='Enter Email' onChange={HandleLogin} required />
            <input className='loginpassword' type="password" name="password" id="password" value={UserLogin.password} placeholder='Enter Password' onChange={HandleLogin} required />
            <div className="loginbtn">
              <button type="submit" onClick={handleUserLogin}>LOGIN</button><br />
              <Link className='signup' to={'/register'}>Dont have account ? Signup</Link>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

export default UserLogin