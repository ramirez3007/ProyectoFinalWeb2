const {DataTypes} = require('sequelize');
const sequelize = require('../../db/sequelize');
const Author = require('./authorModel');

const Book = sequelize.define('book', {
    book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    publication_year: {
        type: DataTypes.INTEGER
    },
    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Author,
            key: 'author_id'
        }
    }
}, {
    tableName: 'books',
    timestamps: false
});

Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });

module.exports = Book;