import React from 'react';
import './App.css';
import LogDailyDetails from './LogDailyDetails';
import History from './History';

const data = {
  days: [
    {
      date: '2019-05-03',
      bodyWeight: 59,
      exercises: [
        {
          exerciseName: 'squats',
          sets: 2,
          reps: 10,
          weight: 20
        },
        {
          exerciseName: 'curls',
          sets: 3,
          reps: 15,
          weight: 25
        }
      ]
    },
    {
      date: '2019-05-07',
      bodyWeight: 59,
      exercises: [
        {
          exerciseName: '',
          sets: 0,
          reps: 0,
          weight: 0
        },
        {
          exerciseName: 'curls',
          sets: 3,
          reps: 15,
          weight: 30
        }
      ]
    }
  ]
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseHistory: JSON.parse(localStorage.getItem("exerciseHistory")),
      exercises: JSON.parse(localStorage.getItem("exercises"))
    }
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(submitObject) {
    this.setState({
      exerciseHistory: submitObject
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LogDailyDetails data={this.state.exerciseHistory} exercises={this.state.exercises} handleDataChange={this.handleDataChange} />
          <History data={this.state.exerciseHistory} exercises={this.state.exercises}/>
        </header>

      </div>
    );
  }
}

export default App;
