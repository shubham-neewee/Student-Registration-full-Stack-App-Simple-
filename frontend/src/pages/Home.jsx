import React, { useEffect, useState } from 'react';
import './Home.css';
import Studentcard from '../components/Studentcard';
import Popup from 'reactjs-popup';
import cross from '../assets/cross.png'
import tick from '../assets/check.png'

const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:4000/users');
        const users = await response.json();
        console.log(users);
        setData(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);
const userReg = (close) => {
  console.log("Name:", name);
  console.log("Email:", email);
  fetch('http://localhost:4000/create-user',{
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      "name" : name,
      "e_mail" : email
    })
  })
  setName('');  // clear input
  setEmail('');
  close();      // close modal
  setTimeout(()=>{
    window.location.reload()
  },2000)
  // window.location.reload()
};

  return (
    <>
      <div className='modal-div'  style={{ display: 'flex', justifyContent: 'flex-end', margin:10 }}>
        <Popup trigger={<button className='button'> Register </button>} modal nested>
    {close => (
      <div className="modal">
        <div className="content">Welcome to Registration Form!</div>
        <div>
        <div className='fields'>
        <input
        className='input'
  type='text'
  placeholder='Enter Your Name'
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
<input
  type='email'
  placeholder='Enter Your E-mail ID'
  value={email}
  className='input'
  onChange={(e) => setEmail(e.target.value)}
/>
        </div>
        <div className='btns'>
          <button style={{border: "none"}} onClick={() => userReg(close)}><img style={{width:20,cursor:"pointer"}} src={tick}/></button>
          <button style={{border: "none"}} onClick={() => close()}><img style={{width:20,cursor:"pointer"}} src={cross}/></button>
        </div>
          
        </div>
      </div>
    )}
  </Popup>
      </div>
      <div className='cards'>
          {data.map((user, index) => (
        <Studentcard key={index} name={user.name} email={user.email} />
      ))}
      </div>
    </>
  );
};

export default Home;
