const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function(next){
    try{
        const user = this;

        const hash = await bcrypt.hash(user.password, 10);

        user.password = hash;

        next();
    }catch(err){
        console.log(err);
    }    
});

const User = mongoose.model('User', UserSchema);

module.exports = User;