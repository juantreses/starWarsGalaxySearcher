import React from 'react';
import axios from 'axios'
import Form from './components/Form'
import Loading from './components/Loading'
import Results from './components/Results'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      swCharacters : {
        loading : false,
        error : false,
        data : []
      }
    }
  }

  searchChar = (str) => {
    this.setState({
      ...this.state,
      swCharacters : {
        ...this.state.swCharacters,
        loading: true
      }
    })
    axios.get("https://swapi.co/api/people/?search=" + str)
    .then(result => {
      this.setState({
        ...this.state,
        swCharacters : {
          ...this.swCharacters,
          data : [...result.data.results]
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Star Wars Galaxy Searcher</h1>
        <Form searchChar={this.searchChar}/>
        {this.state.swCharacters.loading && <Loading />}
        {Object.keys(this.state.swCharacters.data).length !==0 && <Results data={this.state.swCharacters.data}/>}
      </div>
    );
  }
}

export default App;
