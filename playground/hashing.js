const {SHA3} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
}


var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded',decoded);

/*

var message = 'I am user number 3';
var hash = SHA3(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash:${hash}`);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA3(JSON.stringify(data) + 'somesecret').toString()
};

//token.data.id = 4;
//token.hash = SHA3(JSON.stringify(token.data)).toString();

var resultHash = SHA3(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust!');
}

*/