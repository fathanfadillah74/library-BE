const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
    const users = await db.query("SELECT * FROM users");

    res.json(users.rows);
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const userid = uuidv4();
        const hashPassword = await bcrypt.hash(password, 10);

        const existingUser = await db.query(`SELECT * FROM "users" WHERE email = $1`, [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).send({ ResultCode: 0, message: "Email is already in use" });
        }
        if (!email || !password) {
            return res.status(400).send({ ResultCode: 0, message: "you must fill email and password" })
        }
        if (!email.includes("@")) {
            return res.status(400).send({ ResultCode: 0, message: "input the correct email" })
        }
        await db.query(`INSERT INTO "users" (user_id, name, email, password, phone, address) VALUES ($1, $2, $3, $4, $5, $6)`, [userid, name, email, hashPassword, phone, address]);
        return res.status(200).send({ ResultCode: 1, message: "Data has been create" })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal server error" });
    }
};

module.exports = {
    getAllUser,
    createUser
};
