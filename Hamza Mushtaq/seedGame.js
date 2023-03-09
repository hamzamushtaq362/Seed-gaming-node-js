const mongoose = require('mongoose'); 
const Game = require('./api/model/game.model');
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
    // {
    //     game: [
    //         {
    //             name: 'GTA 5',
    //             os: 'Windows 10',
    //             Publisher: 'Rockstar Games'
    //         },
    //         {
    //             name: 'Battlefield 1',
    //             os: 'Windows 10 64 Bit',
    //             Publisher: 'Electronic Arts'
    //         }
    // ]
    // },
    {
        name: 'The Last of Us',
        rating: '9.5',
        publisher: 'PlayStation PC LLC'
    },
    {
        name: 'God of War',
        rating: '9.6',
        publisher: 'PlayStation PC LLC'
    },
    {
        name: 'The Callisto Protocol',
        rating: '8.5',
        publisher: 'KRAFTON, Inc.'
    },
    {
        name: 'Dead Space',
        rating: '9.0',
        publisher: 'Electronic Arts'
    },
    {
        name: 'Dying Light 2 Stay Human',
        rating: '8.9',
        publisher: 'Techland'
    }
];

const seedDB = async () => { 
    await Game.deleteMany({}); 
    await Game.insertMany(seedData);
}; 

seedDB().then(() => { 
    console.log("Game seeder run");
    mongoose.connection.close();
});
