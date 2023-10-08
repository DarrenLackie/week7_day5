import { useState } from 'react'
import './App.css'
import ArtworkContainer from './containers/artworkContainer'
import Navbar from './components/NavBar'

function App() {

  return (
    <>
      <Navbar />
      <ArtworkContainer />
    </>
  )
}

export default App
