import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    //handles change in the input's value
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    //display message and name to user
    event.preventDefault(); 
  }
  render() {
    return (
      <div className="container-fluid" >
        <h1 className="text-danger text-center mt-4 mb-5">Covid-19 Impact Assessment Estimator</h1>
        <main>

        </main>
      </div>
    );
  }
}

export default App;