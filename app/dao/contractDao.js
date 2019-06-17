var Promise = require('bluebird');

const { Contract } = require('../config/sequelize');

var contractDao = {
    addContract: addContract,
    getContractByName: getContractByName,
    getContracts: getContracts
}

function addContract(contract) {
    return new Promise((resolve, reject) => {
        Contract.findOrCreate({ where: { name: contract } })
            .then((contract, created) => {
                resolve(contract);
            }).catch((error) => {
                console.error('Failed to add Contract (DAO Layer)\n', error);
                reject(new Error("Failed to add contract"));
            });
    });
}

function getContractByName(contract) {
    return new Promise((resolve, reject) => {
        Contract.findOne({ where: { name: contract } })
            .then((contract, error) => {
                if (!error) {
                    resolve(contract);
                } else {
                    throw(error);
                }
            }).catch((error) => {
                console.error('Failed to get contract by name (DAO Layer)\n', error);
                reject(new Error("Failed to get contract by Name"));
            });
    });
}

function getContracts() {
    return new Promise((resolve, reject) => {
        Contract.findAll()
            .then((contract, error) => {
                if (!error) {
                    resolve(contract);
                } else {
                    throw(error);
                }
            }).catch((error) => {
                console.error('Failed to get contracts (DAO Layer)\n', error);
                reject(new Error("Failed to get contracts"));
            });
    });
}

module.exports = contractDao;