const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../util/passwordComplexityCheck');

const getAll = (req, res) => {
    mongodb
        .getDb()
        .db()
        .collection('employee')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id to find a employee.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db()
        .collection('employee')
        .find({ _id: userId })
        .toArray((err, result) => {
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        });
};

const createEmployees = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
      }
      const password = req.body.password;
      const passwordCheck = passwordUtil.passwordPass(password);
      if (passwordCheck.error) {
        res.status(400).send({ message: passwordCheck.error });
        return;
      }
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday,
        address: req.body.address,
        interest: req.body.interest,
        occupation: req.body.occupation,
        emergencyContact: req.body.emergencyContact
    };

    const response = await mongodb.getDb().db().collection('employee').insertOne(employee);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the employee.');
    }


};

const updateEmployees = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const employee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      address: req.body.address,
      interest: req.body.interest,
      occupation: req.body.occupation,
      emergencyContact: req.body.emergencyContact
    };
    const response = await mongodb
        .getDb()
        .db()
        .collection('employee')
        .replaceOne({ _id: userId }, employee);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the employee.');
    }
};

const deleteEmployees = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('employee').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the employee.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createEmployees,
    updateEmployees,
    deleteEmployees
};
