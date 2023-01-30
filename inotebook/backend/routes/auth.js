const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const jwt_secret = 'thisisa$ecret';

router.use(express.json());//to make the requests in json form readable
//creating a user : no login required
router.post('/createuser', [
    body('email', 'invalid email').isEmail(),
    body('password', 'password must be minimum 5 characters').isLength({ min: 5 }),
    body('name', 'name must be minimum 5 characters').isLength({ min: 5 })
], async (req, res) => {
    //if errors are present then send a bad request with the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // res.send(req.body);
    // const user = User(req.body);
    // user.save();
    // console.log(req.body);

    //check if user with this email already exists
    try {
        let user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (user) {
            return res.status(400).json({ errors: "Sorry a user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwt_secret);
        res.json({ authToken: authToken });
        // res.json(user);
        // .then(user => res.json(user)).catch(err => console.log(err));
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
})


router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwt_secret);
        res.json({ authToken: authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some internal error occured");
    }

})



// route 3 to get user details of logged in user
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        UserId = req.user.id;
        const user = await User.findById(UserId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some internal error occured");
    }
})
module.exports = router;