
// import React, { useRef, useEffect } from 'react';

// const Background = () => {
//   const canvasRef = useRef(null);
//   const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     const handleResize = () => {
//         setCanvasDimensions({ width: window.innerWidth, height: window.innerHeight });
//       };
//       setCanvasDimensions({ width: window.innerWidth, height: window.innerHeight });
//       window.addEventListener('resize', handleResize);

//     // Setting up the letters
//     // let letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
//     let letters = 'OWASP';
//     letters = letters.split('');

//     // Setting up the columns
//     const fontSize = 11;
//     const columns = canvas.width / fontSize;

//     // Setting up the drops
//     const drops = [];
//     for (let i = 0; i < columns; i++) {
//       drops[i] = 1;
//     }

//     // Setting up the draw function
//     const draw = () => {
//     //   ctx.fillStyle = 'rgba(43, 43, 43, .2)';
//       ctx.fillStyle = 'rgba(0, 0, 0, .1)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < drops.length; i++) {
//         const text = letters[Math.floor(Math.random() * letters.length)];
//         ctx.fillStyle = 'rgba(211, 80, 41, .5)';
//         ctx.fillText(text, i * fontSize, drops[i] * fontSize);
//         drops[i]++;
//         if (drops[i] * fontSize > canvas.height && Math.random() > .93) {
//           drops[i] = 0;
//         }
//       }
//     };

//     // Animation loop
//     const animationLoop = setInterval(draw, 100);

//     // Cleanup function to clear the interval on unmount
//     return () => clearInterval(animationLoop);
//   }, []);

//   return <canvas ref={canvasRef} className='z-[-10] h-screen   absolute text-xl '></canvas>;
// };

// export default Background;
import React, { useRef, useEffect, useState } from 'react';

const Background = () => {
  const canvasRef = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      // Update canvas dimensions on window resize
      setCanvasDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial canvas dimensions
    setCanvasDimensions({ width: window.innerWidth, height: window.innerHeight });

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Setting the width and height of the canvas
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;

    // Setting up the letters
    let letters = 'OWASP';
    letters = letters.split('');

    // Setting up the columns
    const fontSize = 11;
    const columns = canvas.width / fontSize;

    // Setting up the drops
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = 'rgba(211, 80, 41, .5)';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .93) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop
    const animationLoop = setInterval(draw, 100);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(animationLoop);
  }, [canvasDimensions]);

  return <canvas ref={canvasRef} className='z-[-10] h-screen   absolute text-xl '></canvas>;
};

export default Background;

