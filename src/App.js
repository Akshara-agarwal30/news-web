
import './App.css';

import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App=()=> {
  const apikey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);
   
 
    return (
      <div>
        <Router>
       <Navbar />
       <LoadingBar
        color='#f11946'
        progress={progress}
       
      />
       <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key="general"  pageSize={5} country="us" category="general"/>}> </Route>
        <Route exact path="/business"  element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={5} country="us" category="business"/>}> </Route>
        <Route exact path="/entertainment"  element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={5} country="us" category="entertainment"/>}> </Route>
        <Route exact path="/general"  element={<News setProgress={setProgress} apikey={apikey} key="general"  pageSize={5} country="us" category="general"/>}> </Route>
        <Route exact path="/health"  element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={5} country="us" category="health"/>}> </Route>
        <Route exact path="/sports"  element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={5} country="us" category="sports"/>}> </Route>
        <Route exact path="/technology"  element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={5} country="us" category="technology"/>}> </Route>
        <Route exact path="/science"  element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={5} country="us" category="science"/>}> </Route>
          
        </Routes>
       </Router>
      </div>
      
    )
  
}

export default App