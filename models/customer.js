// Customer model

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      customer: {
        type: DataTypes.STRING,
        // If a customer is to be created, they must have a name
        allowNull: false
      }
    });
    return Customer;
  };
  