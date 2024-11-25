import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Register = () => {

    //for navigating user

    const navigate = useNavigate();


  useEffect(() => {
    const auth = localStorage.getItem('user_token');

    if(auth){
      navigate('/')
    }
  }, [])



  //state for register new user;
  const [User, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    state: "",
    district: "",
    village: "",
    pincode: ""
  })

  //handlING Register data;

  const handleRegisterChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUser({
      ...User,
      [name]: value
    })
  }

  //Register a new user

  const Register = async (e) => {
    e.preventDefault();
    try {
      if (!User.username || !User.email || !User.phone || !User.password || !User.state || !User.district || !User.village || !User.pincode) {
        toast.error('All field is required')
      } else {
        const res = await fetch(`http://localhost:3000/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(User)
        })

        if (res.status === 402) {
          toast.error('All field is ');
        } else if (res.status === 401) {
          toast.error('User allready Registered, please Login');
          navigate('/userlogin')
        } else if (res.status === 200) {
          toast.success('Register Successfully');
          navigate('/')
        } else {
          toast.error('Somethings went wrong');
          navigate('/')
        }

      }
    } catch (error) {
      console.error('Unable to register user', error);
    }
  }


  return (
    <>
      <div className="container">
        <form className="registration-form">
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input type="text" id="username" name="username" placeholder='Enter Name' required value={User.username} onChange={handleRegisterChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder='Enter Email' value={User.email} onChange={handleRegisterChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="number" id="phone" name="phone" placeholder='Enter Phone' value={User.phone} onChange={handleRegisterChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder='Enter Password' value={User.password} onChange={handleRegisterChange} />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <select name="state" id="state" onChange={handleRegisterChange} value={User.state} >
              <option>Select State..</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <select name="district" id="district" value={User.district} onChange={handleRegisterChange} >
              <option>Select District..</option>
              <option value="Ayodhya">Ayodhya</option>
              <option value="Ambedkar Nagar">Ambedkar Nagar</option>
              <option value="Sultanpur">Sultanpur</option>
              <option value="Lucknow">Lucknow</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Village">Village</label>
            <input type="village" id="village" name="village" placeholder='Enter Village Name' value={User.village} onChange={handleRegisterChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pin Code</label>
            <input type="text" id="pincode" name="pincode" placeholder='Enter Your PinCode' value={User.pincode} onChange={handleRegisterChange} />
          </div>
          <button className='reg_btn' type="submit" onClick={Register}>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Register