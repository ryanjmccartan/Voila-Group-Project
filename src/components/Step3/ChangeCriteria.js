import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ChangeCriteria extends Component {

    state = {
        buyer_first_name: this.props.buyerFirstName,
        buyer_last_name: this.props.buyerLastName,
        user_step_id: this.props.userStepId.id,
        bedroom_count: '',
        bathroom_count: '',
        square_feet: '',
        location: '',
        notes: ''
    }

    componentDidMount = () => {
        this.props.dispatch({type: 'GET_JOURNEY'});
    } 



    addCriteria = () => {
        this.props.dispatch({type: 'POST_CRITERIA', payload: this.state});
        axios({
            method: 'POST',
            url: '/nodemailer',
            data: this.state
        }).then(response => {
            console.log('message sent', response);
        }).catch(error => {
            console.log('error with sending message', error);
        });
    }

    updateCriteria = () => {
        this.props.dispatch({type: 'UPDATE_CRITERIA', payload: this.state})
    }

    handleChange = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value
        })
    }

    cancel = () => {
        console.log('in cancel');
    }



    render() {
        return( 
            <div className="criteriaChange">
                    <input value={this.state.bedroom_count} onChange={(event) => this.handleChange(event, 'bedroom_count')} placeholder="bedroom count"/>
                    <input value={this.state.bathroom_count} onChange={(event) => this.handleChange(event, 'bathroom_count')} placeholder="bathroom count"/>
                    <input value={this.state.square_feet} onChange={(event) => this.handleChange(event, 'square_feet')} placeholder="square feet"/>
                    <input value={this.state.location} onChange={(event) => this.handleChange(event, 'location')} placeholder="location/zip code"/>
                    <input value={this.state.notes} onChange={(event) => this.handleChange(event, 'notes')} placeholder="Any notes for your realtor?"/>
                    <br/>
                    {this.props.criteria != '' ? <button onClick={this.updateCriteria}>Update Criteria</button> :  
                    <button onClick={this.addCriteria}>Add Criteria</button>
                        }
                    <button onClick={this.cancel}>Cancel</button>

            </div>
                
        )
    }
}

const mapStateToProps = state => ({
    userStepId: state.userJourney.find(step => {return step.order === 3}),
    criteria: state.criteria
});

export default connect(mapStateToProps)(ChangeCriteria);    