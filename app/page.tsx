"use client";
import { useEffect, useRef } from 'react'

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 h-[100vh]">
      <div className='text-center'>
        <h1 className='text-4xl font-medium pb-3 tracking-wider text-[#7F00FF]'>GazeDuel</h1>
        <h3 className='text-sm'>by</h3>
        <h3 className='text-sm'><a href="https://github.com/BotsheloRamela" target='_blank' className='underline'>Botshelo Ramela</a></h3>
      </div>

      <div className='flex flex-row p-12 gap-64'>
        <div className='text-center'>
          <h5 className='font-medium'>Computer</h5>
          <div className='bg-[#7F00FF] flex flex-col items-center justify-evenly h-96 w-96 rounded-md mt-4 p -12'>
            <p className='text-8xl'>🤖</p>
            <div className='bg-[#28282B] rounded-lg h-20 w-80 '></div>
          </div>
        </div>
        <div className='text-center'>
          <h5 className='font-medium'>You</h5>
          <div className='bg-[#7F00FF] flex flex-col items-center justify-evenly h-96 w-96 rounded-md mt-4 p -12'>
            {/* Camera   */}
            <div className='bg-violet-950 h-60 w-72 rounded-lg'>
              <div>
                <video ref={videoRef} autoPlay className='h-60'></video>
              </div>
            </div>
            <div className='bg-[#28282B] rounded-lg h-20 w-80 '></div>
          </div>
        </div>
      </div>
    </main>
  )
}
