"use client";
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const startVideo = () => {
      if (videoElement && !videoElement.srcObject) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            videoElement.srcObject = stream;
          })
          .catch((error) => {
            console.error('Error accessing webcam:', error);
          });
      }
    };

    startVideo();

    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }
    };

  }, [])

  enum Move {
    ROCK = "ROCK",
    PAPER = "PAPER",
    SCISSORS = "SCISSORS",
  }

  enum GameState {
    NULL = "NULL",
    TIE = "TIE",
    LOSS = "LOSS",
    WIN = "WIN",
  }

  const [gameState, setGameState] = useState(GameState.NULL);

  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  function determineWinner(_playerMove : Move, _cpuMove : Move) {
    switch (_playerMove) {
      case _cpuMove:
        setGameState(GameState.TIE);
        break;
      case Move.ROCK:
        if (_cpuMove === Move.PAPER) {
          setGameState(GameState.LOSS);
        } else {
          setGameState(GameState.WIN);
        }
        break;
      case Move.PAPER:
        if (_cpuMove === Move.SCISSORS) {
          setGameState(GameState.LOSS);
        } else {
          setGameState(GameState.WIN);
        }
        break;
      case Move.SCISSORS:
        if (_cpuMove === Move.ROCK) {
          setGameState(GameState.LOSS);
        } else {
          setGameState(GameState.WIN);
        }
        break;
      default:
        setGameState(GameState.NULL);
        break;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 h-[100vh] bg-[#25274d]">
      <div className='text-center'>
        <h1 className='text-5xl font-extrabold pb-2 tracking-wider'>GazeDuel</h1>
        <h3 className='text-sm'>by</h3>
        <h3 className='text-sm font-semibold text-[#aaabb8]'><a href="https://github.com/BotsheloRamela" target='_blank' className='underline'>Botshelo Ramela</a></h3>
      </div>

      <div className='flex flex-row p-12 gap-48'>
        <div className='text-center'>
          <h5 className='font-medium'>Computer</h5>
          <div className='bg-[#464866] flex flex-col items-center justify-evenly h-96 w-96 rounded-md mt-4 p -12'>
            <p className='text-8xl'>🤖</p>
            <div className='bg-[#aaabb8] rounded-lg h-20 w-80 flex justify-evenly items-center'>
              <div className='h-16 w-16 bg-[#282828] rounded-md text-4xl flex justify-center items-center'>🪨</div>
              <div className='h-16 w-16 bg-[#282828] rounded-md text-4xl flex justify-center items-center'>📃</div>
              <div className='h-16 w-16 bg-[#282828] rounded-md text-4xl flex justify-center items-center'>✂️</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-evenly items-center w-40'>
          <h1 className='text-6xl'>{cpuScore} - {playerScore}</h1>
          <h2 className='text-5xl'>{gameState}!</h2>
          </div>
        <div className='text-center'>
          <h5 className='font-medium'>You</h5>
          <div className='bg-[#464866] flex flex-col items-center justify-evenly h-96 w-96 rounded-md mt-4 p -12'>
            {/* Camera   */}
            <div className='bg-violet-950 h-60 w-72 rounded-lg'>
              <div>
                {/* <video ref={videoRef} autoPlay className='h-60'></video> */}
              </div>
            </div>
            <div className='bg-[#aaabb8] rounded-lg h-20 w-80 flex justify-evenly items-center'>
            <div className='h-16 w-16 bg-[#282828] rounded-md text-4xl flex justify-center items-center'>🪨</div>
              <div className='h-16 w-16 bg-[#282828] rounded-md text-4xl flex justify-center items-center'>📃</div>
              <div className='h-16 w-16 bg-[#282828] rounded-md text-4xl flex justify-center items-center'>✂️</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
