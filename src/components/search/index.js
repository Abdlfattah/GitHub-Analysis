import React, { Component } from 'react'
import { Dropdown, Card, Image, Button } from 'semantic-ui-react'
import style from './style.css'

import Autosuggest from 'react-autosuggest';


export default class SearchComp extends Component {

  state={
    text:'',
    isChosen:false,
  }

  getSuggestionValue = (item) => {
      return this.getSuggestions(item.name)
  }

  onChange = (e,{newValue}) =>{
    this.setState({
      text:typeof newValue !== 'undefined' ? newValue : '',
    })
    
  }

  onSuggestionSelected = (e,{suggestion}) => this.props.getRepo(suggestion)

  getSuggestions = (value) =>value
  onSuggestionsClearRequested = () => {}

  onSuggestionsFetchRequested = () => {
    this.props.filterRep(this.state.text)
  };


  resRender = ({id,description,owner,name}) => (
          <Card fluid key={id}>
            <Card.Content>
              <Image floated='right' size='mini' src={owner.avatar_url} />
              <Card.Header>{name}</Card.Header>
              <Card.Meta>{owner.login}</Card.Meta>
              <Card.Description>
                {description}
              </Card.Description>
            </Card.Content>
          </Card>
  )
  render() {
    const inputProps = {
      placeholder: 'Search...',
      value:this.state.text,
      onChange: this.onChange
    };
    return (
      <div className={style.container}>
          <Autosuggest 
            renderSuggestion={this.resRender}
            suggestions={this.props.results}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            inputProps={inputProps}
            getSuggestionValue={this.getSuggestionValue}
            onSuggestionSelected={this.onSuggestionSelected}
          />
          <Dropdown 
              placeholder='Select Friend' 
              selection 
              options={this.props.markedlist} 
              onChange={this.props.showRepo}
            />
          <Button 
            color='blue'
            content='Add'
            icon='plus'
            onClick={this.props.markRepo}
          />
      </div>
    );
  }
}
