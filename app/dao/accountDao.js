var Promise = require('bluebird');

const { Account } = require('../config/sequelize');

var accountDao = {
    getAccounts: getAccounts,
    addAccount: addAccount,
    getAccountByName: getAccountByName
}

function getAccounts() {
    return new Promise((resolve, reject) => {
        Account.findAll()
            .then((accounts, error) => {
                if (!error) {
                    resolve(accounts);
                } else {
                    throw(error);
                }
            }).catch((error) => {
                console.error('Failed to get Accounts (DAO Layer)\n', error);
                reject(new Error("Failed to get all accounts"));
            });
    });
}

function addAccount(account) {
    return new Promise((resolve, reject) => {
        Account.findOrCreate({ where: { name: account } })
            .then((account, created) => {
                resolve(account);
            }).catch((error) => {
                console.error('Failed to add Account (DAO Layer)\n', error);
                reject(new Error("Failed to add account"));
            });
    });
}

function getAccountByName(account) {
    return new Promise((resolve, reject) => {
        Account.findOne({ where: { name: account } })
            .then((account, error) => {
                if (!error) {
                    resolve(account);
                } else {
                    throw(error);
                }
            }).catch((error) => {
                console.error('Failed to get account by name (DAO Layer)', error);
                reject(new Error("Failed to get account by Name"));
            });
    });
}

module.exports = accountDao;