import React from 'react';
import CanvasJSReact from './canvasjs.react'

export default class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedExercise: 'Body Weight',
            selectedInfo: 'Body Weight'
        }

        this.handleExerciseDropDownChange = this.handleExerciseDropDownChange.bind(this);
        this.handleInfoDropDownChange = this.handleInfoDropDownChange.bind(this);

    }

    handleExerciseDropDownChange(event) {
        this.setState({
            selectedExercise: event.target.value,
            selectedInfo: 'Weight'
        });
    }

    handleInfoDropDownChange(event) {
        this.setState({
            selectedInfo: event.target.value
        });
    }

    exercises = {
        values: [
            "Curls",
            "Squats",
            "Pull-Ups"
        ]
    }

    render() {
        const exerciseDropdown = (
            <select value={this.state.selectedExercise} onChange={this.handleExerciseDropDownChange}>
                <option value='Body Weight'>Body Weight</option>
                {
                    this.props.exercises.map(exercise =>
                        <option value={exercise}>{exercise}</option>)
                }
            </select>
        );

        let infoDropdown;
        if (this.state.selectedExercise === 'Body Weight') {
            infoDropdown = (
                <select value={this.state.selectedInfo} onChange={this.handleInfoDropDownChange}>
                    <option value='Body Weight'>Body Weight</option>
                </select>
            )
        } else {
            infoDropdown = (
                <select value={this.state.selectedInfo} onChange={this.handleInfoDropDownChange}>
                    <option value='Weight'>Weight</option>
                    <option value='Sets'>Sets</option>
                    <option value='Reps'>Reps</option>
                </select>
            )
        }

        let dataPoints = [];
        if (this.props && this.props.data && this.props.data.days) {
            let yValue;
            this.props.data.days.forEach(day => {
                if (this.state.selectedExercise === 'Body Weight') {
                    yValue = day.bodyWeight;
                } else {
                    const exercise = day.exercises.find(exercise => {
                        return exercise.exerciseName === this.state.selectedExercise;
                    });
                    if (exercise) {
                        switch (this.state.selectedInfo) {
                            case 'Weight': yValue = exercise.weight;
                                break;
                            case 'Sets': yValue = exercise.sets;
                                break;
                            case 'Reps': yValue = exercise.reps;
                                break;
                        }
                    }
                    
                }
                dataPoints.push({
                    x: new Date(day.date),
                    y: parseFloat(yValue)
                });
            });
        }


        const options = {
            theme: "dark1",
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Progress"
            },
            axisY: {
                title: "Number",
                includeZero: false
            },
            data: [{
                type: "line",
                xValueFormatString: "MM YYYY",
                markerSize: 5,
                dataPoints: dataPoints
            }]
        }

        const CanvasJS = CanvasJSReact.CanvasJS;
        const CanvasJSChart = CanvasJSReact.CanvasJSChart;
        return (
            <div>
                <h2>History</h2>
                <label>Exercise:</label>
                {exerciseDropdown}
                <label>Info:</label>
                {infoDropdown}
                <CanvasJSChart options={options}
                /* onRef = {ref => this.chart = ref} */
                />
            </div>
        );
    }
}
