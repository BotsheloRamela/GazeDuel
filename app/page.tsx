import Image from 'next/image'

export default function Home() {
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
          <div className='bg-[#7F00FF] h-96 w-96 rounded-md mt-4'></div>
        </div>
        <div className='text-center'>
          <h5 className='font-medium'>You</h5>
          <div className='bg-[#7F00FF] h-96 w-96 rounded-md mt-4'></div>
        </div>
      </div>
    </main>
  )
}
