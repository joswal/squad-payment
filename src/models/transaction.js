module.exports = function(sequelize, Sequelize) {
    const Transaction = sequelize.define('transaction', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        amount : {
            type : Sequelize.DECIMAL(10, 4)
        },
        type: {
            type: Sequelize.ENUM('card', 'virtual-account'),
            allowNull:false
        }, 
        status: {
           type: Sequelize.ENUM('pending', 'success'),
           allowNull:false
        }
    }, {
        timestamps: true,
        paranoid: true,
    });

    return Transaction;
};
