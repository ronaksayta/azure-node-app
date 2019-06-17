var Promise = require('bluebird');

const { Customer } = require('../config/sequelize');

var customerDao = {
    addCustomer: addCustomer
}

function addCustomer(customer) {
    return new Promise((resolve, reject) => {

        Customer.findOrCreate({ where: { name: customer.name }, defaults: { name: customer.name, details: customer.details } })
            .spread((customer, created) => {
                resolve(customer);
            }).catch((error) => {
                console.log("Failed to add customer {{In DAO}}");
                console.log('Error', error);
                reject(new Error("Failed to add customer {{In DAO}}"));
            });
    });
}

module.exports = customerDao;