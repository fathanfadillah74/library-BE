const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const { jwtDecode } = require("jwt-decode");

const getUser = async (req, res) => {
    try {
        const reqAuthHeader = req.headers.authorization
        const token = reqAuthHeader.split(" ")[1]
        if (token === null) {
            fastify.jwt.verify(token, 'secret_key', () => {
                return res.code(400).send({ ResultCode: 0, message: "token invalid" })
            })
        }

        const userAccount = jwtDecode(token)
        const userId = userAccount.id

        const existingUser = await db.query(`SELECT * FROM "users" WHERE user_id = $1`, [userId]);
        return res.status(200).send({ ResultCode: 1, data: existingUser.rows })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal server error" });
    }
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

const updateUser = async (req, res) => {
    try {
        const reqAuthHeader = req.headers.authorization
        const token = reqAuthHeader.split(" ")[1]
        if (token === null) {
            fastify.jwt.verify(token, 'secret_key', () => {
                return res.code(400).send({ ResultCode: 0, message: "token invalid" })
            })
        }

        const userAccount = jwtDecode(token)
        const userId = userAccount.id
        let dataUser;

        const existingUser = await db.query(`SELECT * FROM "users" WHERE user_id = $1`, [userId]);
        for (let i = 0; i < existingUser.rows.length; i++) {
            dataUser = existingUser.rows[i];
        }

        const { name = dataUser.name, email = dataUser.email, password = dataUser.password, phone = dataUser.phone, address = dataUser.address } = req.body;
        const comparePassword = await bcrypt.compare(password, dataUser.password)
        if (comparePassword) {
            return res.status(400).send({ ResultCode: 0, message: "please dont use your last password" })
        }

        if (password != dataUser.password) {
            const hashPassword = await bcrypt.hash(password, 12)

            await db.query(`UPDATE users SET name = $1, email = $2, password = $3, phone = $4, address = $5 WHERE user_id = $6`, [name, email, hashPassword, phone, address, userId])
            return res.status(200).send({ ResultCode: 1, message: "update data success" })
        } else {
            await db.query(`UPDATE users SET name = $1, email = $2, password = $3, phone = $4, address = $5 WHERE user_id = $6`, [name, email, password, phone, address, userId])
            return res.status(200).send({ ResultCode: 1, message: "update data success" })
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal server error" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const reqAuthHeader = req.headers.authorization
        const token = reqAuthHeader.split(" ")[1]
        if (token === null) {
            fastify.jwt.verify(token, 'secret_key', () => {
                return res.code(400).send({ ResultCode: 0, message: "token invalid" })
            })
        }

        const userAccount = jwtDecode(token)
        const userId = userAccount.id

        await db.query(`DELETE FROM "users" WHERE user_id = $1`, [userId])
        return res.status(200).send({ ResultCode: 1, message: "delete data success" })

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal server error" });
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};
