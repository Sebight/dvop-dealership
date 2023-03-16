function getExample(req, res) {
    console.log('example controller get call');
    res.send('example controller get call');
}

function postExample(req, res) {
    console.log('example controller post call');
    res.send('example controller post call');
}

module.exports = {
    getExample,
    postExample
}