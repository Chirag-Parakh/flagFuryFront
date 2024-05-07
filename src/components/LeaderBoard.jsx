import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";


const LeaderBoard = () => {
  const targetDate = new Date("2024-05-08T13:15:00");
  const [showleader , setshowleader] = useState(true)
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const timeDifference = targetDate - now;
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  }, [targetDate]);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);
  console.log(timeRemaining)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeRemaining]);
  function Countdown(props) {
    return (
      <CountdownCircleTimer
        isPlaying
        strokeWidth="6"
        duration={props.duration}
        size="130"
        initialRemainingTime={props.initialRemainingTime}
        colors="#00afb0"
        trailColor="#1f2937"
        onComplete={() => {
          return { shouldRepeat: true, delay: 0 };
        }}
      >
        {({ remainingTime }) => (
          <div className="flex flex-col items-center justify-center ">
            <span className="text-2xl">{props.remainingTime}</span>
            <span className="countdownName">{props.name}</span>
          </div>
        )}
      </CountdownCircleTimer>
    );
  }

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('https://flagfuryback.onrender.com/leaderboard');
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    console.log("user board updated")
    fetchLeaderboard();
    setInterval(() => {
      const fetchLeaderboard = async () => {
        try {
          const response = await axios.get('https://flagfuryback.onrender.com/leaderboard');
          setLeaderboard(response.data);
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        }
      };
      console.log("user board updated")
      fetchLeaderboard();
    }, 15000);
  }, []);

  return (
    <div className='absolute flex flex-col w-full font-play justify-start items-center h-screen z-30 overflow-auto'>
      <div className='text-7xl font-bold  text-white my-7 '>
        FLAG FURY
      </div>
      {showleader ? ( <button className='text-white bg-orange text-4xl p-2 mt-52 rounded-xl' onClick={() => {setshowleader(false)}}>START CAPTURING THE FLAG</button>) : (<div className='w-screen flex flex-col justify-center items-center'><div className=' w-[32rem] block'>
        <div className="flex text-white items-center flex-col">
          <div className='text-4xl font-bold text-bluish'>TIME REMAINING</div>
          <div className='flex'>
            <div className='m-4'>
              <Countdown
                duration={90 * 60}
                initialRemainingTime={timeRemaining.minutes * 60 +timeRemaining.hours * 60 * 60 }
                remainingTime={timeRemaining.minutes + timeRemaining.hours * 60}
                name="Minutes"
              />
            </div>
            <div className='m-4'>
              <Countdown
                duration={60}
                initialRemainingTime={timeRemaining.seconds}
                remainingTime={timeRemaining.seconds}
                name="Seconds"
              />
            </div>
          </div>
        </div>

      </div>
      <div className='text-4xl font-bold text-orange mb-4 '> Leaderboard</div>
      {leaderboard.map((team, index) => (
        <div key={index} className='flex w-[80%] justify-start items-center' >
          <div style={{ width: `${68 / 16 * (team.levelReached) + 12}%`, background: `linear-gradient(to right, #2a2a2a, #d35029)` }} className='bg-grey rounded-sm text-3xl text-bluish my-1 py-1 pl-2 rounded-l-lg'>
            {team.TeamName[0]}{team.TeamName[1]}{team.TeamName[2]}{team.TeamName[3]} {team.TeamName[4]}{team.TeamName[5]}</div>
          <div className='pl-2 text-bluish text-2xl'> level {team.levelReached + 1}</div>
        </div>
      ))}</div>) }
     
      

    </div>
  );
};

export default LeaderBoard;
0