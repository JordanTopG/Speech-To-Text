const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { user } = require('./models/user');

module.exports = (app) => {

    app.post('/login', (req, res, next) => {
        const { body } = req;
        const { username } = body;
        const { password } = body;

        if(username === user.email && password === user.password) { 
            //if user log in successful, it generates a jwt token for the user with a secret key
            jwt.sign({user}, 'privatekey', { expiresIn: '1d' },(err, token) => {
                if(err) { console.log(err) }    
                res.send(token);
            });
        } else {
            console.log('ERROR: Could not log in');
        }
    })

    //Protected route 
    app.get('/user/data', checkToken, (req, res) => {
        //If verified then a JWT token is generated for the user
        jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
            if(err){
                //If error send Forbidden (403)
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                //If token is successfully verified, sends authorised data
                res.json({
                    message: 'Successful log in',
                    authorizedData
                });
                console.log('SUCCESS: Connected to protected route');
            }
            
            }
        )
    });


    app.post('/sign-up', async (req, res, next) => {
        const {firstname, surname, dob, email, address, password } = req.body;
        
        if (err) {
            console.log('ERROR: All fields are required.')
            res.status(400);
        }
        //checks if user email is already in use
        try{
            const existingUser = await user.findOne({where: { email }});
            if (existingUser) {
                console.log('ERROR: Email already in use.')
                res.status(403);
            }
        //save user data to databse
        const user = await user.create({
            firstname,
            surname,
            dob,
            email,
            address,
            password
        });
        //jwt token created for 'new' user
        jwt.sign({user}, 'privatekey', { expiresIn: '1d' },(err, token) => {
                if(err) { console.log(err) }    
                res.send(token);
            });
        } catch (err) {
            console.log('ERROR: Could not sign in');
        }        
        res.status(201).json({
            message: 'User successfully registered. '
        })
    });
}
        


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));