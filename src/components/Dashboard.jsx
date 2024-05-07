
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentLevelAtom } from '../store/atom.js'
import { useNavigate } from 'react-router-dom';
import { isLoggedInAtom } from '../store/atom.js'
import Swal from 'sweetalert2'
import levelsPasswords from '../config.js';
import logo from '../assets/logo.png'

const Dashboard = () => {
  const [password, setPassword] = useState('');
  const [currentLevel , setcurrentLevel] = useRecoilState(currentLevelAtom)
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom)
  const navigate = useNavigate();

  const handleVerifyLevel = async () => {
    if (levelsPasswords[currentLevel - 1] === password) {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.post('https://flagfuryback.onrender.com/test', { level: currentLevel }, {
          headers: {
            'Authorization': `${token}`
          }
        });
        Swal.fire({
          position: "top",
          width:'600px',
          icon: "success",
          title: `${response.data.message}`,
          showConfirmButton: false,
          padding: "1em",
          background: "#00afb0",
          timer: 60000
        });
        // alert(response.data.message);
        setPassword('')
        setcurrentLevel(currentLevel + 1);
      } catch (error) {
        alert('Error updating level');
        Swal.fire({
          position: "top",
          width:'600px',
          icon: "error",
          title: `Error updating level`,
          showConfirmButton: false,
          padding: "3em",
          background: "#00afb0",
          timer: 60000
        });
        setPassword('')
      }
    } else {
      Swal.fire({
        position: "top",
        width:'300px',
        icon: "error",
        title: `wrong password`,
        showConfirmButton: false,
        padding: "1em",
        background: "#00afb0",
        timer: 30000
      });
      setPassword('')
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://flagfuryback.onrender.com/current-level', {
          headers: {
            'Authorization': `${token}`
          }
        });
        const { level } = response.data;
        setcurrentLevel(level+1);
      } catch (error) {
        console.error('Error fetching current level:', error);
      }
    };

    fetchData();
  }, []);

  const Logout =  () =>  {
    localStorage.removeItem("token");
    setIsLoggedIn(false)
     navigate("/");
    console.log("hello")
  }

  return (
    <div className='h-screen font-play flex flex-col justify-start items-center '>
      <div><img src={logo} alt=""  className=' w-48 '/></div>
        <button className=' absolute right-0 m-10 text-white bg-orange px-2 rounded text-2xl' onClick={Logout}>Log out</button>
        {currentLevel === 17 ?(<div className='text-4xl mt-52 text-white'>CONGRATULATIONS ! YOU HAVE CLEARED ALL THE LEVELS</div>) : (<><h2 className='text-4xl text-white mt-20 my-5'>Level Verification</h2>
      <label className='text-6xl text-orange'>Enter Password for Level <span className='text-bluish text-7xl'>{currentLevel}</span></label>
      <input
      required="true"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter Password'
        className='border-b-2 border-orange hover:scale-105 bg-grey mt-10 text-2xl focus:outline-none text-bluish p-2 ' 
      />
      <button onClick={handleVerifyLevel} className='my-5 bg-orange text-white px-4 py-1 rounded-lg hover:scale-95'>Verify</button></>) }
      
    </div>
  );
};

export default Dashboard;

