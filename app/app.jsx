var React = require('react');
var ReactDOM = require('react-dom');

// Load Foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

var AddUser = require('AddUser');
var UserList = require('UserList');

ReactDOM.render(
    <div id="main-wrapper" className="row">
        <div className="small-6 small-offset-3 columns">

            <div className="row">

                <div className="small-6 columns">
                    <p>DISTRIBUTION EMAIL SYSTEM</p>
                    <AddUser/>
                </div>
                <div className="small-6 columns">
                    <p>USERS ONLINE</p>
                    <UserList/>
                </div>

            </div>

        </div>
        <div className="small-3 columns"></div>
    </div>,
    document.getElementById('app')
);
