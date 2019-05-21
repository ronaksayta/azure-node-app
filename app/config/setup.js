var Promise = require('bluebird');

var data = require('../constant_data/data');

var subVerticalDao = require('../dao/subVerticalDao');
var subPracticeDao = require('../dao/subPracticeDao');
var practiceDao = require('../dao/practiceDao');
var contractDao = require('../dao/contractDao');
var offeringDao = require('../dao/offeringDao');
var verticalDao = require('../dao/verticalDao');
var accountDao = require('../dao/accountDao');

function addConstantData() {
    return new Promise(function (resolve, reject) {
        const subVerical = data.sub_vertical.map(sub_vertical => subVerticalDao.addSubVertical(sub_vertical));
        const practice = data.practice.map(practice => practiceDao.addPractice(practice));
        const contract = data.contract.map(contract => contractDao.addContract(contract));
        const offering = data.offering.map(offering => offeringDao.addOffering(offering));
        const vertical = data.vertical.map(vertical => verticalDao.addVertical(vertical));
        const account = data.account.map(account => accountDao.addAccount(account));

        Promise.all([subVerical, practice, contract, offering, vertical, account])
            .then(async (values) => {
                const subPractices = data.sub_practice.map(subPractice => {
                    practiceDao.getPracticeByName(subPractice.practice)
                        .then((practice) => {
                            return subPracticeDao.addSubPractice(subPractice.name, practice.id)
                                .then((sub_practice) => {
                                    return sub_practice;
                                })
                                .catch((err) => {
                                    console.log("Failed to add Constant Data: ", err);
                                    reject(err);
                                });
                        })
                        .catch((err) => {
                            console.log("Failed to add Constant Data: ", err);
                            reject(err);
                        });
                });

                Promise.all(subPractices)
                    .then(async (values) => {
                        await console.log("Constant Data added!");
                        await resolve(values);
                    })
                    .catch((err) => {
                        console.log("Failed to add Constant Data: ", err);
                        reject(err);
                    });
            })
            .catch(function (err) {
                console.log("Failed to add Constant Data: ", err);
                reject(err);
            });
    })
}

module.exports = addConstantData;