const User = require('../model/user');
const Role = require('../model/role')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");


const signup =  async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({message: 'User validation failed'});
    }
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({where:{email}});
    }
    catch(err) {
        res.status(500).json({message: 'Sign up failed'})
    }

    if(existingUser) {
        res.status(401).json({message: 'User already exists'})
    } 

    let newUser;

    try {
        newUser = await  User.create({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 8)
        })
    }
    catch(err) {
        return res.status(500).json({message: "Creating user failed"});
    }
    
    let roles;
    
    try {
        roles = await Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
        })
    }
    catch(err) { return}

    if(roles) {
        newUser.setRoles(roles);
        return res.status(200).json(newUser);
    }
    else {
        newUser.setRoles([1])
        return res.status(200).json(newUser);
    }
                          
};


const login = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({message: 'User validation failed'});
    }
    
    let user;

    try {
         user = await User.findOne({where: {email: req.body.email}});
    }
    catch(err) {
        res.status(401).json({message: 'No user'});
        res.redirect('/login');
        return;
    };

    let validpassword;

    try {
        validpassword =  bcrypt.compareSync(req.body.password, user.password); 
    }
    catch(err) {
        return res.status(500).json({message: 'Internal error'});
    }

    if(!validpassword) {
        return res.status(401).json({message: 'Incorrect password'});
    }
    
    let userBookList = [];
    let books;

    try {
        books = await  user.getBooks();
    }

    catch(err) {
        return res.status(401).json({message: 'Any book found'});
    } 

    if(userBookList.length !== 0) {
        for (let i = 0; i < books.length; i++) {
            userBookList.push(books[i].id);
        }
    }
    
    let roles = [];
    let authorities = [];

    try {
        roles =  await user.getRoles();
    }
    catch(err) {}

    if(roles.length !== 0) {
        for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i].id);
        }
    }
    return res.status(200).json({
                id: user.userId,
                name: user.name,
                email: user.email,
                roles: authorities,
                booklist: userBookList
            });      
}

exports.signup = signup;
exports.login = login;



