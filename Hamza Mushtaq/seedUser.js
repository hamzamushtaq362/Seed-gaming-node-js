const mongoose = require('mongoose'); 
const User = require('./api/model/user.model');
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
        name : 'Hamza', 
        email : 'h@gmail', 
        password : null,
    },
    {
        name : 'Ali', 
        email : 'a@gmail', 
        password : null,
    },
    {
        name : 'sheraz', 
        email : 's@gmail', 
        password : null,
    }
];

const seedDB = async () => { 
    // await User.deleteMany({}); 
    await User.insertMany(seedData);
}; 

seedDB().then(() => { 
    console.log("seeder run");
    mongoose.connection.close();
});
