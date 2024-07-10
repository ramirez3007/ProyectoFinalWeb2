const router = require('express').Router();
const Author = require('../src/models/authorModel');

// Index
router.get('/', async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.render('author/index', { authors });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Render the new author form
router.get('/new', (req, res) => {
    res.render('author/new');
});

// Store (Create)
router.post('/', async (req, res) => {
    try {
        const { name, birthdate } = req.body;
        await Author.create({ name, birthdate });
        res.redirect('/v1/authors');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Render the edit author form
router.get('/edit/:author_id', async (req, res) => {
    try {
        const { author_id } = req.params;
        const author = await Author.findByPk(author_id);
        if (author) {
            res.render('author/edit', { author });
        } else {
            res.status(404).send('Autor no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update
router.post('/:author_id', async (req, res) => {
    try {
        const { author_id } = req.params;
        const { name, birthdate } = req.body;
        const author = await Author.findByPk(author_id);
        if (author) {
            await author.update({ name, birthdate });
            res.redirect('/v1/authors');
        } else {
            res.status(404).send('Autor no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para eliminar un autor específico
router.post("/:author_id/delete", async (req, res) => {
    try {
        const { author_id } = req.params;
        // Aquí deberías eliminar el autor usando el ID proporcionado
        await Author.destroy({
            where: {
                author_id: author_id
            }
        });
        res.redirect('/v1/authors'); // Redirige a la lista de autores después de eliminar
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
