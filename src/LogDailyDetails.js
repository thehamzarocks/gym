import React from 'react';

class LogDailyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
                {
                    exerciseName: 'bench press',
                    sets: 0,
                    reps: 0,
                    weight: 0
                }
            ],
            bodyWeight: 0
        }
        this.handleChange.bind(this);
        this.addRow.bind(this);
        this.handleSubmit.bind(this);
    }

    GetFormattedDate() {
        var todayTime = new Date();
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        return year + '-' + month + '-' + day;
    }

    handleChange(event, index, field) {
        if (field === 'bodyWeight') {
            this.setState({
                bodyWeight: event.target.value
            });
            return;
        }

        const updatedRows = this.state.rows.slice();
        updatedRows[index] = { ...updatedRows[index], [field]: event.target.value };
        this.setState({
            rows: updatedRows
        });
    }

    addRow(event) {
        event.preventDefault();
        const newRow = { exerciseName: '', sets: '', reps: '', weight: '' };
        const newArray = this.state.rows.slice();
        newArray.push(newRow);

        this.setState({
            rows: newArray
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state.rows);
        console.log(this.props);

        const currentData = { ... this.props };
        const submitObject = currentData.data;
        const dayDetail = {
            date: this.GetFormattedDate(),
            bodyWeight: this.state.bodyWeight,
            exercises: this.state.rows

        }
        submitObject.days.push(dayDetail);
        localStorage.setItem("exerciseHistory", JSON.stringify(submitObject));

        this.props.handleDataChange(submitObject);
    }

    render() {

        const exerciseRows = (
            this.state.rows.map((exerciseRow, index) => {
                const exerciseDropdown = (
                    <select value={exerciseRow.exerciseName} onChange={(event) => this.handleChange(event, index, 'exerciseName')}>
                        {
                            this.props.exercises.map(exercise =>
                                <option value={exercise}>{exercise}</option>)
                        }
                    </select>
                );
                return (
                    <div>
                        <label>Exercise:</label>
                        {exerciseDropdown}
                        <label>Sets:</label>
                        <input type='number' value={exerciseRow.sets} onChange={(event) => this.handleChange(event, index, 'sets')} />
                        <label>Reps:</label>
                        <input type='number' value={exerciseRow.reps} onChange={(event) => this.handleChange(event, index, 'reps')} />
                        <label>Weight:</label>
                        <input type='number' value={exerciseRow.weight} onChange={(event) => this.handleChange(event, index, 'weight')} />
                        <button onClick={(event) => this.addRow(event)}>+</button>
                    </div>
                );
            }
            )
        )

        return (
            <div>
                <h2>Log Daily Details</h2>
                <form>
                    {exerciseRows}
                    <label>Body Weight:</label>
                    <input type='number' value={this.state.bodyWeight} onChange={(event) => this.handleChange(event, 0, 'bodyWeight')} />
                    <input type='submit' onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        );
    }
}

export default LogDailyDetails;