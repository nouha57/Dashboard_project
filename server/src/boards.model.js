module.exports = (sequelize, Sequelize) => {
    const Board = sequelize.define("boards", {
      date: {
        type: Sequelize.STRING
      },
      total_boards:{
        type: Sequelize.INTEGER
      },
      ratio_defaut:{
        type: Sequelize.FLOAT
      },
      evolution_TRG:{
        type: Sequelize.INTEGER
      },
      obj_TRG:{
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false,

    });
  
    return Board;
};

