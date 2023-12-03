import React from 'react';
import '../assets/styles/App.css'
import LandinPage from '../profile/LandingPage'
import Navbar from './Navbar'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <React.Fragment>
        <Navbar/>
      </React.Fragment>

      <LandinPage/>

      <Footer/>
    </>
  )
}

export default App
