import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StartContainer,ChartContainer,Loading} from '../../components'

const Stats = () => {
  const {showStats, isLoading, monthlyApplications}=useAppContext();
  useEffect(()=>{
   showStats() 
    // eslint-disable-next-line
  }, [])
  if(isLoading){
return <Loading center/>
  }
  return (
    <>
     <StartContainer/> 
     {monthlyApplications.length > 0 && <ChartContainer/>}
     
    </>
  )
}

export default Stats
