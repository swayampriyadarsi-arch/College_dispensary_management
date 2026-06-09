const mongoose = require('mongoose');

mongoose.connect('mongodb://swayampriyadarsi_db_user:UfogZ8QqyFo60aoQ@ac-s40aejb-shard-00-00.djtvkoz.mongodb.net:27017,ac-s40aejb-shard-00-01.djtvkoz.mongodb.net:27017,ac-s40aejb-shard-00-02.djtvkoz.mongodb.net:27017/?ssl=true&replicaSet=atlas-z5d064-shard-0&authSource=admin&appName=Cluster0')
.then(res => {
    console.log('Successfully connected to MongoDB');
})
.catch(err => {
    console.log(err);
});
