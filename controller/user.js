const knex = require('../config/db');
const bcrypt = require('bcrypt')
const { generateAccessToken } = require('../auth/auth');

// HomePage
exports.HomePage = (req, res) => {
    console.log({ "message": "hello this is home page" });
    res.send({ "message": "hello this is home page" })
};

// RestistionUser
exports.RestistionUser = (req, res) => {
    var encoded = bcrypt.hashSync(req.body.Password, 10)
    knex.select('*').from('user').where({ "email": req.body.Email })
        .then((data) => {
            if (data.length < 1) {
                knex('user').insert({
                        "firstname": req.body.FirstName,
                        "lastname": req.body.lastName,
                        "email": req.body.Email,
                        "password": encoded,
                        "OrganizationName": req.body.OrganizationName
                    })
                    .then((data) => {
                        res.send({ "message": "successfull iserted data" })
                    }).catch((err) => {
                        console.log(err);
                    })
            } else {
                res.send({ "exist": "this user alredy exists.." })
            }
        })
};

// LoginUser
exports.LoginUser = (req, res) => {
    if (req.body.Email === undefined || req.body.Password === undefined) {
        console.log({ "suggetion": "email and password both are require!" })
    } else {
        knex.select('*').from('user').where('email', req.body.Email).then((data) => {
            // console.log(data);
            if (data.length > 0) {
                const match = bcrypt.compareSync(req.body.Password, data[0].Password)
                if (match) {
                    var token_data = { "id": data[0].employee_id, "name": data[0].FirstName, "email": data[0].Email, "password": data[0].Password };
                    const token = generateAccessToken(token_data)
                        // console.log({ "Login Success": token });
                    res.cookie("key", token);
                    console.log({ "Login success!": data, token });
                    res.send({ "Login success!": data });
                } else { res.send({ "Error": "Password is invalid" }); }
            } else { res.send({ "Error": "This user doesn't exists! please Signup....." }) }
        }).catch((err) => {
            console.log(err);
        })
    }
};

// GetAllData
exports.GetAllData = (req, res) => {
    knex.select('*').from('user').then((data) => {
        console.log(data);
        res.send(data)
    }).catch((err) => {
        console.log(err);
        res.send(err)

    });
};

// GetById
exports.GetById = (req, res) => {
    knex.select('*').from('user').where('employee_id', req.params.employee_id)
        .then((data) => {
            console.log({ 'Userdata': data })
            res.send({ 'serdata': data })
        }).catch((err) => {
            res.send({ err: err.message })
            console.log(err)
        })
};

// UpdateById
exports.UpdateById = (req, res) => {
    knex('user')
        .where('employee_id', req.params.employee_id)
        .update(req.body)
        .then((data) => {
            console.log(data);
            res.send("updated successfully")
        })
        .catch((er) => {
            console.log(er);
            res.json({ "message": er })
        });
}

// DeleteById
exports.DeleteById = (req, res) => {
    knex('user')
        .where('employee_id', req.params.employee_id)
        .del()
        .then((data) => {
            console.log(data);
            res.send("deleted successfully")
        })
        .catch((er) => {
            console.log(er);
            res.json({ "message": er })
        });
};

// GetAllBySearch
exports.GetAllBySearch = (req, res) => {
    const search = req.query.search_data
    knex.select('firstname', "lastname", "employee_id").from('user')
        .where("firstname", 'like', `%${search}%`)
        .orWhere('lastname', 'like', `%${search}%`)
        .orWhere('employee_id', 'like', `%${search}%`)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
};

// SortByFirstName
exports.SortByFirstName = (req, res) => {
    knex('user').orderBy('firstname')
        .then((data) => {
            console.log(data);
            res.send(data)

        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
};

//  SortByLastName
exports.SortByLastName = (req, res) => {
    knex('user').orderBy('lastname')
        .then((data) => {
            console.log(data);
            res.send(data)

        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
};

// SortByEmail
exports.SortByEmail = (req, res) => {
    knex('user').orderBy('email')
        .then((data) => {
            console.log(data);
            res.send(data)

        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
};

// SortByEmployeeId
exports.SortByEmployeeId = (req, res) => {
    knex('user').orderBy('employee_id')
        .then((data) => {
            console.log(data);
            res.send(data)

        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
};

// SortByOrganizationName
exports.SortByOrganizationName = (req, res) => {
    knex('user').orderBy('OrganizationName')
        .then((data) => {
            console.log(data);
            res.send(data)

        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
};