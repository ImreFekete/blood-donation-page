import { useState } from 'react'

import './App.css'
import CalendarComp from "./Components/CalendarComp.jsx";

function App() {


  return (
    <>
    <div>Main Page</div>
        <button className='reservationButton' >Reserve an appointment
        </button>
       <div>
        <CalendarComp/>
    </div>
    </>
  )
}

export default App
