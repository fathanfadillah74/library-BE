const getAllBooks = async (req, res) => {
    try {
        const existingBooks = await db.query(`SELECT * FROM "books"`);
        return res.status(200).send({ ResultCode: 1, data: existingBooks.rows })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal Server Error" });
    }
};

const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        const existingBooks = await db.query(`SELECT * FROM "books" WHERE book_id = $1`, [id]);
        return res.status(200).send({ ResultCode: 1, data: existingBooks.rows })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal Server Error" });
    }
}

const createBook = async (req, res) => {
    try {
        const { title, author, year, publisher } = req.body;
        const bookid = uuidv4();
        await db.query(`INSERT INTO "books" (book_id, title, author, year, publisher) VALUES ($1, $2, $3, $4, $5)`, [bookid, title, author, year, publisher]);
        return res.status(200).send({ ResultCode: 1, message: "Data has been create" })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal Server Error" });
    }
};