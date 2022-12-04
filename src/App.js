
import React from "react";
import './Style/App.css'

import About from "./Pages/About";
import Posts from "./Pages/Posts";
import {BrowserRouter,Link, Route, Routes} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";


function App(){
  return (
    <BrowserRouter>
        <Navbar/>

            <Routes>
                <Route path="/about" element={<About/>}/>
                <Route path="/posts" element={<Posts/>}/>
            </Routes>


    </BrowserRouter>
  )
}

export default App;
