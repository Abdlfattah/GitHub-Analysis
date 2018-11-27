import React, { Component } from 'react'

import axios from 'axios'

import Search from './components/search'
import Timeline  from './components/timeline'

import Committers from './components/committers'
import Card from './components/card'

import style from './style.css'

export default class App extends Component {

  state={
    results:[],
    repo:null,
    committers:[],
    commits:[],
    markedlist:[],
  }

  filterRep = (text) =>{
    if(text!==''){
      setTimeout(() => {
        axios.get(`https://api.github.com/search/repositories?q=${text}`)
        .then( response => {
          this.setState({results: response.data.items}) 
        })
      }, 300)
    }
    else{
      this.setState({results:[]})
    }
  }
  getRepo = (repo) => {
    this.setState({repo})
    axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/stats/contributors?page=1&per_page=100`)
    .then( response => {
      this.setState({committers: response.data}) 
    })
    axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?page=1&per_page=100`)
    .then( response => {
      this.setState({commits: response.data}) 
    })
  }

  resetResults = () => this.setState({results:[]})
  
  markRepo = () => {
    const info={
      key:this.state.repo.id,
      text:this.state.repo.name,
      value:this.state.markedlist.length,
      repo:this.state.repo,
      commits:this.state.commits,
      committers:this.state.committers
    }
    let exist=false
    this.state.markedlist.forEach(element => {
        if(this.state.repo.id===element.key){
          exist=true
        }
    });
    if(!exist){
      this.setState({
        markedlist:[...this.state.markedlist,info]
      })
    }
    
  }

  showRepo = (e,data) => {
    this.setState({
      repo:this.state.markedlist[data.value].repo,
      commits:this.state.markedlist[data.value].commits,
      committers:this.state.markedlist[data.value].committers
    })
  }
  render() {
    return (
      <div className={style.container}>
          <Search 
              filterRep={this.filterRep} 
              results={this.state.results}
              getRepo={this.getRepo}
              repo={this.state.repo}
              markRepo={this.markRepo}
              markedlist={this.state.markedlist}
              showRepo={this.showRepo}
          />
          <Card repo={this.state.repo} />
          <Committers 
              committers={this.state.committers} 
              commits={this.state.commits}
          />
          <Timeline commits={this.state.commits}/>
      </div>
    )
  }
}

