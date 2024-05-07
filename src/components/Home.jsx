import React from 'react'
import '../styles/home.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedInAtom } from '../store/atom.js'
import { useSetRecoilState, useRecoilState } from "recoil";
import bg from '../assets/bg.svg';
// const Swal = require('sweetalert2')
import Swal from 'sweetalert2';

function Home() {
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
            const { data } = await axios.post('http://localhost:3000/login', {
                username: username,
                password: password
            })
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true)
            Swal.fire({
                position: "top",
                icon: "success",
                title: "logged in successfully",
                showConfirmButton: false,
                padding: "3em",
                background: "#00afb0",
                timer: 60000
              });
            if (data.token) {
                navigate('/dashboard');
            }
        }
        catch (error) {
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
        <div className='flex flex-col justify-start pt-8 items-center h-screen '>
          
            <div className='text-white text-4xl my-2 mt-32'>WELCOME</div>
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

                <button type='submit' className='bg-bluish px-2 py-0.5 br-2 rounded-md my-2 '>Log In</button>

            </form>
        </div>
    )
}

export default Home
