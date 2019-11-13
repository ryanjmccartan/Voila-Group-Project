import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminItem from'./AdminItem'

class Admin extends Component {
    componentDidMount() {
        // use component did mount to dispatch an action to request the vendor list from the API
        console.log('this will dispatch an action to request vendor list from api');
    }
    // getAdmin(){
    //     this.props.dispatch({type: 'FETCH_ADMIN'})
    // }
    addAdmin() {
        console.log('hello from the addAdmin button');

    }
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                         
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email </th>
                            <th>Role</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state.adminList.map((admin) => {
                            return (
                                <AdminItem key={admin.id} admin={admin} getAdmin={this.getAdmin} />
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    <button onClick={this.addAdmin}>Add Admin</button>
                </div>
            </div>
        )
    }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
    user: state.user,
    state
});

export default connect(mapStateToProps)(Admin);