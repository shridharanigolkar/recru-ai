import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOption from './_components/CreateOption'
import LatestInterview from './_components/LatestInterview'

function Dashboard() {
  return (
    <div >
    <WelcomeContainer/>
    <h2 className='pl-5 font-bold text-2xl'> Dashboard</h2>
    <CreateOption/>
    <LatestInterview />


    </div>
  )
}

export default Dashboard
