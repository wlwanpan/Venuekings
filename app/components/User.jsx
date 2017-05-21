var React = require('react');
var emailAPI = require('emailAPI');

var User = React.createClass({

    render: function () {

        return (
            <div>
                <a className="button hollow expanded" href="#">
                    {this.props.username} received {this.props.emailCount} emails
                </a>
            </div>
        );

    }
})

module.exports = User;
