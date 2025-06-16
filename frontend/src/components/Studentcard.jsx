import React,  { useState }  from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './studentcard.css'
import userImg from "../assets/user.png";
import user2 from '../assets/user2.png'
const Studentcard = (props) => {
// const [count, setCount] = useState(0);

const OnClickBtn = async () => {
  try {
    const response = await fetch(
      `http://localhost:4000/delete-user?email=${props.email}`,
      {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
      }
    );
    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res_msg = await response.json();
    console.log('Response:', res_msg);
    // setCount(count + 1);
    window.location.reload()
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
const showToaster = () => {
  console.log("jdniewdew")
  toast.success(`Taped on ${props.name}'s Card !`);
}

  return (
    <div className='border' onClick={showToaster}>
    <img className='common-img' src={user2}/>
    <div className='name'>Name: {props.name}</div>
    <div>E-mail: {props.email}</div>
    {/* <h3>{count}</h3> */}
    <div>
        <button style={{backgroundColor:"white",color:"white", borderRadius:5,marginTop:50, marginLeft:220,  border: "none", cursor:"pointer"}} onClick={OnClickBtn}><img style={{width:20}} src={userImg}/></button>
    </div>
    <ToastContainer />
    </div>
    
  )
}

export default Studentcard 