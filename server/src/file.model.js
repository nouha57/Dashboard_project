// for Sequelize File data model

module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("files", {
      title: {
        type: Sequelize.STRING
      },
      path:{
        type: Sequelize.STRING
      }
    },
    {
      updatedAt: false,
    });
  
    return File;
};

