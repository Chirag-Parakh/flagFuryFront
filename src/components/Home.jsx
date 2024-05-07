import React from 'react'
import '../styles/home.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedInAtom } from '../store/atom.js'
import { useSetRecoilState, useRecoilState } from "recoil";
import Swal from 'sweetalert2';
import logo from '../assets/logo.png'
import { Audio } from 'react-loader-spinner';

function Home() {
    const [loader , setloader ] = useState(false)
    const [username, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [IsLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
    const navigate = useNavigate();
    useEffect(() => {
        if (IsLoggedIn) {
            navigate('/dashboard')
        }
    }, [])
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://flagfuryback.onrender.com/login', {
                username: username,
                password: password
            })
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true)
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Logged In Successfully",
                showConfirmButton: false,
                padding: "3em",
                background: "#00afb0",
                timer: 60000
              });
            if (data.token) {
                setloader(false);
                navigate('/dashboard');
            }
        }
        catch (error) {
            setloader(false);
            console.log(error);
            if (error.response && (error.response.status == 401 || error.response.status == 404)) {
                if (error.response.data && error.response.data.message) {
                    
                    Swal.fire({
                        position: "top",
                        width:'300px',
                        icon: "error",
                        title: `${error.response.data.message}`,
                        showConfirmButton: false,
                        padding: "1em",
                        background: "#00afb0",
                        timer: 30000
                      });
                      
                }
                else {
                    
                    alert('unkown erroe occured')
                }
            }
            else {
                Swal.fire({
                    position: "top",
                    width:'300px',
                    icon: "error",
                    title: `Network error or server is down`,
                    showConfirmButton: false,
                    padding: "1em",
                    background: "#00afb0",
                    timer: 30000
                  });
            }
        }
    }
    return (
        <div className='flex font-play flex-col justify-start items-center h-screen '>
            {loader ? (<div className='absolute bg-[#00000099] h-screen w-screen flex justify-center items-center'>
                <Audio
                height='160'
                width='160'
                radius='8'
                color='#00afb0'
                ariaLabel='loading'
                wrapperStyle
                wrapperClass
                />
            </div>) : (<></>)}
            <div><img src={logo} alt=""  className=' w-48 '/></div>
            <div className='text-white text-4xl my-2 mt-26'>WELCOME</div>
            <div className='text-orange text-7xl my-[20px] sm:text-8xl'> FLAG FURY</div>
            <div className='text-4xl text-white my-2 sm:text-5xl'>CAPTURE THE <span className='text-bluish'>FLAG</span></div>
            <form action="" onSubmit={handleFormSubmit} className='flex flex-col justify-center items-center mt-10'>
                <input
                    type="text"
                    placeholder='Username'
                    className=' text-lg text-orange bg-transparent focus:outline-none my-3 border-b-2 border-orange hover:scale-105'
                    value={username}
                    onChange={(e) => { setuserName(e.target.value) }}
                    required
                />
                <input
                    type="text"
                    placeholder='Password'
                    className=' text-lg text-orange bg-transparent focus:outline-none my-3 border-b-2 border-orange hover:scale-105'
                    value={password}
                    onChange={(e) => { setpassword(e.target.value) }}
                    required
                />

                <button type='submit' className='bg-bluish text-xl hover:scale-105 px-2 py-0.5 br-2 rounded-md my-2 ' onClick={() => {setloader(true)}}>Log In</button>

            </form>
        </div>
    )
}

export default Home
