const mongoose = require('mongoose'); 
const GameType = require('./api/model/gameType.model');
const mongoDB = "mongodb+srv://hamza:hamza12345@cluster0.ln9gfrn.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);
mongoose.connect(mongoDB,
    {
    useNewUrlParser : true, 
    useUnifiedTopology : true 
    })
  .then(()=> { 
    console.log('MONGO CONNECTION OPEN!!!'); 
}).catch((err)=> {
    console.log(err);
});

const seedData = [ 
    {
        type: 'Action'
    },
    {
        type: 'Adventure'
    },
    {
        type: 'Horror'
    }
];

const seedDB = async () => { 
    await GameType.deleteMany({}); 
    await GameType.insertMany(seedData);
}; 

seedDB().then(() => { 
    console.log("Type seeder run");
    mongoose.connection.close();
});
