const https = require('https');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const oprConfigApp = require('../config/config');

const getAllBooks = async (req, res) => {
    try {
        const existingBooks = await db.query(`SELECT * FROM "books"`);
        return res.status(200).send({ ResultCode: 1, data: existingBooks.rows });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal Server Error" });
    }
};

// const getBook = async (req, res) => {
//     try {
//         const { title, authors } = req.query;

//         let query = `SELECT * FROM "books" WHERE`;

//         if (title) {
//             query += ` title ILIKE '%${title}%'`;
//         }

//         if (authors) {
//             if (title) {
//                 query += ` AND`;
//             }
//             query += ` authors ILIKE '%${authors}%'`;
//         }
//         const existingBooks = await db.query(query);

//         return res.status(200).send({ ResultCode: 1, data: existingBooks.rows });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).send({ ResultCode: 0, message: "Internal Server Error" });
//     }
// };

const createBook = async (req, res) => {
    try {
        const { title, author, publishedDate, description, pageCount, thumbnail, language, previewLink } = req.body;
        const bookid = uuidv4();
        await db.query(`INSERT INTO "books" (book_id, title, authors, published_date, description, page_count, thumbnail, language, preview_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [bookid, title, author, publishedDate, description, pageCount, thumbnail, language, previewLink]);
        return res.status(200).send({ ResultCode: 1, message: "Data has been created" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ ResultCode: 0, message: "Internal Server Error" });
    }
};

const saveBook = async (req, res) => {
    const reqBook = 'one+piece';
    const url = `${oprConfigApp.API.googleAPI.baseUrl}` + 'q=' + `${reqBook}` + '&' + `${oprConfigApp.API.googleAPI.key}`;

    https.get(url, async (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', async () => {
            try {
                const books = JSON.parse(data).items;

                for (const book of books) {
                    const existingBook = await db.query(`SELECT * FROM "books" WHERE title = $1`, [book.volumeInfo.title]);

                    if (existingBook.rows.length === 0) {
                        const bookData = {
                            title: book.volumeInfo.title,
                            authors: book.volumeInfo.authors || [],
                            published_date: book.volumeInfo.publishedDate,
                            description: book.volumeInfo.description,
                            page_count: book.volumeInfo.pageCount,
                            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
                            language: book.volumeInfo.language,
                            preview_link: book.volumeInfo.previewLink,
                        };

                        await db.query(
                            'INSERT INTO "books" (book_id, title, authors, published_date, description, page_count, thumbnail, language, preview_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                            [uuidv4(), bookData.title, bookData.authors, bookData.published_date, bookData.description, bookData.page_count, bookData.thumbnail, bookData.language, bookData.preview_link]
                        );
                    }
                }

                res.json({ ResultCode: 1, data: books, message: 'Books saved successfully!' });
            } catch (error) {
                console.error(error);
                res.status(500).send({ ResultCode: 0, message: "Internal Server Error" });
            }
        });

    }).on('error', (error) => {
        console.error(`Got error: ${error.message}`);
        res.status(500).send({ ResultCode: 0, message: "Internal Server Error" });
    });
};


module.exports = {
    getAllBooks,
    // getBook,
    createBook,
    saveBook
};
