import React from 'react';
import './App.scss';
import {elementContext, findElements} from 'bungenix-akn-context';
import Autosuggest from 'react-autosuggest';
import { Viewer } from './Viewer';

class App extends React.Component {

    state={
      value: '',
      suggestionValue : '',
      suggestions: []
    };

    getSuggestions = value => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
    
      return inputLength === 0 ? [] : findElements(inputValue);
    };

    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
    };

    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

    getSuggestionValue = (value) => {
      return value;
    }

    onChange  = (evt, {newValue}) => {
      this.setState({value: newValue});
    }
    
    renderSuggestion = suggestion => (
      <div>
        {suggestion}
      </div>
    );

    renderElementInfo = (value) => {
      if (value != '') {
        const valueJson = elementContext(value);
        if ("error" in valueJson)  {
          return null;
        } else {
          const link = "http://schema.akomantoso.com/element/" + value;
          return [
            <p>Querying: <b><a target="_blank" href={link}>{value}</a></b></p>,
            <Viewer json={valueJson} />
          ];
        }
      } else {
        return null;
      }
    }

    render(){
      const {value, suggestions, suggestionValue} = this.state;
      const inputProps = {
        placeholder: 'Type a programming language',
        value,
        onChange: this.onChange
      };
      
      return (
        <div className="App">
          <h1>bungenix-akn-context - query the context of Akoma Ntoso elements</h1> 
          <p>This is a very fast library to query Akoma Ntoso elements in terms of what are the allowed child elements, allowed parent elements and allowed attributes. Its mapped to the general schema, but does not itself make use of any JS XML apis or introspect the schema.</p>
          <div className="full-col">
            <h2>Type the first few letters of a AKN element</h2>
            <div style={{width: "90%", marginLeft: "42%"}}>
            <Autosuggest suggestions={suggestions} 
            getSuggestionValue={this.getSuggestionValue}
            inputProps={inputProps} 
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} 
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            renderSuggestion={this.renderSuggestion}
            />
            {
                this.renderElementInfo(value)
            }
            </div>
          </div>
          <div style={{width: "100%", display: "inline-block"}}>
            <a href="https://github.com/bungenix/bungenix-akn-context">@github</a>, <a href="https://twitter.com/ashokharix">@twitter</a>
          </div>
        </div>
      );
    }
}


export default App;
/* 
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
</header>
 */