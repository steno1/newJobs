import React from 'react'
import StartItem from './StartItem'
import { useAppContext } from '../context/appContext'
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';

const StartContainer = () => {
    const {stats}=useAppContext();
    const defaultStats=[
    {
        title: "Pending applications",
        count:stats.Pending || 0,
        color: "#e9b949",
        bcg: "#fceffc7",
        icon: <FaSuitcaseRolling/>

    },
    {
        title: "Interview scheduled",
        count: stats.Interview || 0,
        color: "#647acb",
        bcg: "#e0e8f9",
        icon: <FaCalendarCheck/>
    },
    {
        title: "Jobs declined",
        count:stats.Declined || 0,
        color: "#d66a6a",
        bcg: "#ffeeee",
        icon:<FaBug/>
    }
]
  return (
    <div>
      <Wrapper>
{defaultStats.map((item, index)=>{
return <StartItem key={index} {...item}/>
})}
      </Wrapper>
    </div>
  )
}

export default StartContainer
