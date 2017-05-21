var React = require('react');
var emailAPI = require('emailAPI');

export var AddUser = React.createClass({

    handleAddUser: function (e) {

        e.preventDefault();
        var username = this.refs.username.value;
        var email = this.refs.email.value;

        if (username.length > 0 && email.length > 0) {
            // IMPLEMENT ADD NEW USER
            //console.log(`${username} with ${email} added`);
            emailAPI.addNewUser({
                username,
                email
            });
            this.refs.username.value = '';
            this.refs.email.value = '';
        }

    },
    render: function () {

        return (

            <form onSubmit={this.handleAddUser}>

                <input type="text" ref="username" placeholder="Enter Username"/>
                <input type="text" ref="email" placeholder="Enter Email Address"/>
                <button className="button expanded">Create User</button>

            </form>

        );
    }
});

module.exports = AddUser;
