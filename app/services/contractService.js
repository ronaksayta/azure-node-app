var Promise = require('bluebird');

var contractDao = require('../dao/contractDao');


var contractService = {
    addContract: addContract,
    getContractByName: getContractByName
}

function addContract(contract) {
    return new Promise((resolve, reject) => {
        contractDao.addContract(contract).then(function (contract) {
            console.log("Contract added! {{In Service}}");
            resolve(contract);
        }).catch(function (err) {
            console.log("Failed to add contract {{In Service}}", err);
            reject(err);
        });
    });
}

function getContractByName(contract) {
    return new Promise((resolve, reject) => {
        contractDao.getContractByName(contract).then(function (contract) {
            console.log("Contract retrieved by name! {{In Service}}");
            resolve(contract);
        }).catch(function (err) {
            console.log("Failed to get contract by name {{In Service}}", err);
            reject(err);
        });
    });
}

module.exports = contractService;