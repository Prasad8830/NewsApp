import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0,
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
            color='#fb8817'
            progress={this.state.progress}
           
          />
          
          <Routes>
              <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="general" pageSize={10} country={'us'} category="general"/>}/>
              <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="general" pageSize={10} country={'us'} category="general"/>}/>
              <Route exact path="/business" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}  key="business" pageSize={10} country={'us'} category="business"/>}/>
              <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="entertainment" pageSize={10} country={'us'} category="entertainment"/>}/>
              <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="health" pageSize={10} country={'us'} category="health"/>}/>
              <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="science" pageSize={10} country={'us'} category="science"/>}/>
              <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="sports" pageSize={10} country={'us'} category="sports"/>}/>
              <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="technology" pageSize={10} country={'us'} category="technology"/>}/>
          </Routes>
       </Router>
      </div> 
    )
  } 
}

