
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentLevelAtom } from '../store/atom.js'
import { useNavigate } from 'react-router-dom';
import { isLoggedInAtom } from '../store/atom.js'
import Swal from 'sweetalert2'

const Dashboard = () => {
  const [password, setPassword] = useState('');
  const [currentLevel , setcurrentLevel] = useRecoilState(currentLevelAtom)
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom)
  const navigate = useNavigate();
  const levelsPasswords = [ 'owaspctf', 'heroEIN', 'XYqwert12', 'FXgfF2tQ', 'TideBreaker','rs7P0nyL', 'MOchX934CsD' , 'Fny4#HKh' , 'hundred' , 'GhPank34#lnPr' , 'MuPKinawnzz' , 'ARaR56Go' , 'vEzx89lop456qwu' , 'R3JheXNjYWxlIHdpdGggQWxwaGEK' , 'LndfeOfElsadfria' , 'MRRWM6LBOR3QU==='];
  const handleVerifyLevel = async () => {
    if (levelsPasswords[currentLevel - 1] === password) {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.post('http://localhost:3000/test', { level: currentLevel }, {
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
        const response = await axios.get('http://localhost:3000/current-level', {
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
        <button className=' absolute right-0 m-10 text-white bg-orange px-2 rounded' onClick={Logout}>Log out</button>
        {currentLevel !== 17 ?(<div className='text-4xl mt-80 text-white'>CONGRATULATIONS ! YOU HAVE CLEARED ALL THE LEVELS</div>) : (<><h2 className='text-4xl text-white mt-48 my-5'>Level Verification</h2>
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

