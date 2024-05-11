const db = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await db.query(`SELECT * FROM "users" WHERE email = $1`, [email]);
        if (existingUser.rows.length == 0) {
            return res.status(400).send({ ResultCode: 0, message: "user not found" })
        }
        let dataUser;
        for (let i = 0; i < existingUser.rows.length; i++) {
            dataUser = existingUser.rows[i];
        }
        const comparePassword = await bcrypt.compare(password, dataUser.password)
        if (!comparePassword) {
            return res.status(400).send({ ResultCode: 0, message: "email or password incorrect" })
        }

        const payload = {
            id: dataUser.user_id,
            name: dataUser.name,
            email: dataUser.email,
            password: dataUser.password
        }
        const token = jwt.sign(payload, 'secret_key', { expiresIn: '1h' })
        return res.status(200).send({
            "token": token,
            "message": "login succes"
        })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal server error" });
    }
}

module.exports = {
    loginUser
}