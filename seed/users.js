const db = require('../db')
const { User } = require('../models')

db.on('error', console.error.bind(console, "MongoDB connection error: "))

const main = async () => {
    const users = [
        {
            username: 'AbeTheSinger',
            first_name: "Abraham",
            last_name: 'Guerrero',
            profile_picture: 'https://i.imgur.com/RmoSoBh.jpg',
            email: 'abrahams@email.com',
            password: '123456yesthisismyrealpassword',
            isLoggedIn: true,
        },
        {
            username: 'JeremetteTheDancer',
            first_name: 'Jeremette',
            last_name: 'Williams',
            profile_picture: 'https://i.imgur.com/N1l0hpo.jpeg',
            email: 'JeremetteW@email.com',
            password: 'heheIamafakepassword',
        },
        {
            username: 'JeremiahThePainter',
            first_name: 'Jeremiah',
            last_name: 'Robinson',
            profile_picture: 'https://i.imgur.com/7AzWYXU.png',
            email: 'JeremiahR@email.com',
            password: 'ThisIsTheStrongestPassword',
        },
        {
            username: 'JeremyTheArtEnjoyer',
            first_name: 'Jeremy',
            last_name: 'Taubman',
            profile_picture: 'https://i.imgur.com/nSsokB4.jpeg',
            email: '@email.com',
            password: 'heheIamafakepassword',
        },
    ]

    await User.insertMany(users)
    console.log('Users were inserted to database')
}

const run = async () => {
    await main()
    db.close()
}

run()