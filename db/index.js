const Sequelize = require('sequelize');

//database  dealers_choice_api_2
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_api_2',
);

//model  client
const Client = db.define("client", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        validate: {
            is: /^1-\d{3}-\d{3}-\d{4}$/
        }
    },
    service: {
        type: Sequelize.ENUM("COLOR", "CUT", "STYLE"),
    },
    formula: {
       type: Sequelize.TEXT,
    },  
    notes: {
        type: Sequelize.TEXT,
    },
    // virtual fields
    isColor: {
        type: Sequelize.VIRTUAL,
        get() {
           return this.service === "COLOR";
        }
    },
    isCut: {
        type: Sequelize.VIRTUAL,
        get() {
           return this.service === "CUT";
        }
    },
    isStyle: {
        type: Sequelize.VIRTUAL,
        get() {
           return this.service === "STYLE";
        }
    }
});

//seeded data
const seed = async () => {
    await db.sync({force: true});

    await Promise.all([
        Client.create({ name: 'Anne', phoneNumber:'1-631-222-4567', service:'COLOR', formula: 'redken 6rv', notes: 'Color sits for 10 extra minutes'}),
        Client.create({ name: 'Sue', phoneNumber:'1-888-763-5347', service:'STYLE', formula: '', notes: 'Prefers to see Annabelle for haircuts'}),
        Client.create({ name: 'Barbie', phoneNumber:'1-516-443-6823', service:'CUT', formula: '', notes: 'Always late!'}),
        ]);
        
};


//exports
module.exports = {
  db,
  seed,
  Sequelize,
  Client,
};
