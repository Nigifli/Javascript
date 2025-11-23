const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const registerUser = async (name, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)');
        const result = stmt.run(name, email, hashedPassword);
        return result.lastID;
    } catch (error) {
        if (error.message.includes('UNIQUE')) {
            throw new Error('Ez az email már használatban van');
        }
        throw error;
    }
};

const loginUser = async (email, password) => {
    const user = db.getUserByEmail(email);
    if (!user) {
        throw new Error('Hibás email vagy jelszó');
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
        throw new Error('Hibás email vagy jelszó');
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};
models/User.js 

const bcrypt = require('bcrypt');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    static async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

module.exports = User;