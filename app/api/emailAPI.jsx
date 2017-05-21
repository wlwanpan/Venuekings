
var localDB = {};
const SERVER_TICK = 100;

var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var objToEmailCountArr = () => {
    return Object.keys(localDB).map(key => localDB[key].emailCount )
};
var objToUsernameArr = () => {
    return Object.keys(localDB).map(key => localDB[key].username )
};
var objToKeyArr = () => {
    return Object.keys(localDB).map(key => key )
};

var ServerLoop = (() => {
    setInterval(() => {
        //console.log('updating');
        // call update server tick function
        var emailCountArr = objToEmailCountArr();
        var keyArr = objToKeyArr();

        if (emailCountArr && keyArr) {

            var totalEmail = emailCountArr.reduce((prev, curr) => {
                return prev + curr
            }, 0);

            if ( emailCountArr.length === 0 || keyArr.length === 0 ) {

            } else if ( totalEmail === 0 ) {
                var RandomizedIndex = getRandomInt(0, keyArr.length-1);
                //console.log(localDB[keyArr[RandomizedIndex]]);
                localDB[keyArr[RandomizedIndex]].emailCount += 1;
            } else {

                var weightedEmailArr = emailCountArr.map((count) => {
                    return totalEmail - count;
                });
                var UpperRandomLimit = weightedEmailArr.reduce((prev, curr) => {
                    return prev + curr
                }, 0);
                var RandomizedIndex = getRandomInt(0, UpperRandomLimit-1);

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

    addNewUser: function (data) {

        var { username, email } = data;
        var usernameArr = objToUsernameArr();
        console.log(usernameArr)
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
    deleteUser: function (name) {

    }
}
