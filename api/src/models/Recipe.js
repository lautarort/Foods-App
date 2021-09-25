const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', { 
    title: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    id: { 
      type: DataTypes.UUID,
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4
    },  
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.INTEGER
    },
    healthScore: {
      type: DataTypes.INTEGER
    },
    analyzedInstructions: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    }, 
    image : {
      type: DataTypes.STRING
    } 
  });

};