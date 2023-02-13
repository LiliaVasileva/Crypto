const User = require("../models/User");
const bcrypt = require('bcrypt');

exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password mismatch!');
    }
    // TODO: Check if users exists;

    //TODO: Validate password:

    const hashedPassword = await bcrypt.hash(password, 10);
    
    User.create({username, email, password: hashedPassword});

}


