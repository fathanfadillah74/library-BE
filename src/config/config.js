const oprConfigApp = {
    port: 3000,
    // AppID: process.env.BEFastify || 'BE-Fastify',
    // DataBase: process.env.DATABASE || "postgresql://postgres:kenari01@localhost:5432/BE-Fastify?schema=public",
    API: {
        googleAPI: {
            baseUrl: 'https://www.googleapis.com/books/v1/volumes?',
            key: 'key=AIzaSyAwWHB4IilnThowkmPpAJTjiv_PSF8EjbY',
        },
        baseUrl: "http://localhost:3000",
        //user start
        createUser: "/create/user",
        loginUser: "/login/user",
        getUser: "/get/user",
        updateUser: "/update/user",
        deleteUser: "/delete/user",
        //user end

        //books start
        getAllBooks: "/get/books",
        getBook: "/get/book",
        createBook: "/create/book",
        updateBook: "/update/book",
        deleteBook: "/delete/book",
        saveBook: "/save/book",
        //books end

        //wishlist start
        getWishlist: "/get/wishlist",
        createWishlist: "/create/wishlist",
        deleteWishlist: "/delete/wishlist",
        //wishlist end
    }
}

module.exports = oprConfigApp;