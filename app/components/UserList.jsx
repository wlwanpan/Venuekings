var React = require('react');
var emailAPI = require('emailAPI');
var User = require('User');

const USER_LIST_UPDATE_TICK = 100;

var UserList = React.createClass({

    getInitialState: function () {
        return {
            userList: []
        }
    },
    componentDidMount: function () {

        this.interval = setInterval(() => {
            // call update function
            var newList = emailAPI.getUserList();

            if (this.state.userList !== newList) {
                this.setState({
                    userList: newList
                });
            }

        }, USER_LIST_UPDATE_TICK);
    },
    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    componentDidUpdate: function (prevProps, prevState) {

        if (this.state.userList !== prevState.userList) {
            this.renderUserList();
        }

    },
    renderUserList: function () {

        return (
            this.state.userList.map((user) => {

                var { username, emailCount } = user;
                return (
                    <User key={username} username={username} emailCount={emailCount}/>
                );
            })
        )
    },
    render: function () {

        return (
            <div>
                {this.renderUserList()}
            </div>
        );
    }
});

module.exports = UserList;
