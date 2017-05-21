// Database object to store registered users
var localDB = {};
// Rate of emailCount updates in ms
const SERVER_TICK = 100;

var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Json to Arr conversion helper functions
var objToEmailCountArr = () => {
    return Object.keys(localDB).map(key => localDB[key].emailCount )
};
var objToUsernameArr = () => {
    return Object.keys(localDB).map(key => localDB[key].username )
};
var objToKeyArr = () => {
    return Object.keys(localDB).map(key => key )
};

// Email updater loop
var ServerLoop = (() => {
    setInterval(() => {
        // call update server tick function
        var emailCountArr = objToEmailCountArr();
        var keyArr = objToKeyArr();

        if (emailCountArr && keyArr) {

            var totalEmail = emailCountArr.reduce((prev, curr) => {
                return prev + curr
            }, 0);

            if ( emailCountArr.length === 0 || keyArr.length === 0 ) {
                // do nothing
            } else if ( totalEmail === 0 ) {
                // randomizing according to key value
                var RandomizedIndex = getRandomInt(0, keyArr.length-1);
                localDB[keyArr[RandomizedIndex]].emailCount += 1;

            } else {
                // create a weighted array such as the more emailCount a user handleAddUser
                // the lesser is the weighted value (weighted value is directly proportional
                // to p(receiving an email))
                var weightedEmailArr = emailCountArr.map(count => totalEmail - count);
                var UpperRandomLimit = weightedEmailArr.reduce((prev, curr) => {
                    return prev + curr
                }, 0);

                // Generate random value from the weighted array
                var RandomizedIndex = getRandomInt(0, UpperRandomLimit-1);

                // updating the emailCount of the user randomized
                for (var i = 0; i < weightedEmailArr.length; i++) {

                    if ( RandomizedIndex - weightedEmailArr[i] <= 0 ) {
                        // Email sent to randomized user
                        localDB[keyArr[i]].emailCount += 1;
                        break;
                    } else {
                        RandomizedIndex -= weightedEmailArr[i];
                    }

                }
            }
        }
    }, SERVER_TICK);
})();

module.exports = {

    // Generate a random ID and add new user to localDB
    addNewUser: function (data) {

        var { username, email } = data;
        var usernameArr = objToUsernameArr();

        if (usernameArr && usernameArr.indexOf(username) < 0) {

            var newID = getRandomInt(10000, 99999);
            localDB[newID] = {
                email,
                username,
                emailCount: 0
            }
            return 'User Added';

        } else {
            return 'User already exist';
        }

    },
    // returns an array of obj {username, emailCount}
    getUserList: function () {
        var returnArr = [];

        for (var i in localDB) {

            var { username, emailCount } = localDB[i];
            returnArr.push({
                username,
                emailCount
            })

        }
        return returnArr;
    },
    // delete user from localDB
    deleteUser: function (name) {

        var keyArr = objToKeyArr();

        for (var i = 0; i < keyArr.length; i++) {
            
            var key = keyArr[i];
            if (localDB[key].username === name) {
                delete localDB[key];
                break;
            }
        }
    }
}
