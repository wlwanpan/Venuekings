var React = require('react');
var emailAPI = require('emailAPI');

var User = React.createClass({

    render: function () {

        return (
            <div>
                <a className="button hollow expanded" href="#" onClick={() => {
                        emailAPI.deleteUser(this.props.username);
                    }}>
                    {this.props.username} received {this.props.emailCount} emails
                </a>
            </div>
        );

    }
})

module.exports = User;
