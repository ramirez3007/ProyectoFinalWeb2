const router = require('express').Router();
const Book = require('../src/models/bookModel');
const Author = require('../src/models/authorModel');

// Index
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll({
            include: {
                model: Author,
                attributes: ['name']  // Ensure to select the author's name
            }
        });
        res.render('books/index', { books });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Render the new book form
router.get('/new', async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.render('books/new', { authors });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Store (Create)
router.post('/', async (req, res) => {
    try {
        const { title, publication_year, author_id } = req.body;
        await Book.create({ title, publication_year, author_id });
        res.redirect('/v1/books');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Render the edit book form
router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id, { include: Author });
        const authors = await Author.findAll();
        if (book) {
            res.render('books/edit', { book, authors });
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update
router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, publication_year, author_id } = req.body;
        const book = await Book.findByPk(id);
        if (book) {
            await book.update({ title, publication_year, author_id });
            res.redirect('/v1/books');
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete
router.post('/:id/delete', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByPk(id);
        if (book) {
            await book.destroy();
            res.redirect('/v1/books');
        } else {
            res.status(404).send('Libro no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
