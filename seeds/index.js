const mongoose =  require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const sample = array => array[Math.floor(Math.random() * array.length)];



const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected")
})

const seedDB = async() => {
    await campground.deleteMany({});
    for(let i=0;i<400;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price =  Math.floor(Math.random() * 20) + 10;
        const camp =  new campground({
            author: '6035583f6f26ed2360d846c9',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem rem tenetur, vel unde doloremque consectetur similique voluptatum veritatis facere expedita ab molestiae at accusamus saepe porro dolorum quis odit! Possimus!',
            price,
            geometry: {
                    type: 'Point',
                    coordinates:[
                        cities[random1000].longitude,
                        cities[random1000].latitude
                    ]
                },
            images:[{
                   url: 'https://res.cloudinary.com/dhafbd28q/image/upload/v1614446378/YelpCamp/trzjv7as7p9ssu4ouuwv.jpg',
                   filename: 'YelpCamp/trzjv7as7p9ssu4ouuwv'
            },
            {
                url: 'https://res.cloudinary.com/dhafbd28q/image/upload/v1614489739/YelpCamp/hp2a9dfsb5gcslboguwo.jpg',
                filename: 'YelpCamp/hp2a9dfsb5gcslboguwo'
              }
          
        ]


        })
        await camp.save();
    

    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
