const {DataTypes} = require('sequelize');
const sequelize = require('../../db/sequelize');

const Author = sequelize.define('author', {
    author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATEONLY
    }
}, {
    tableName: 'authors',
    timestamps: false
});

module.exports = Author;