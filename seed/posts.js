const db = require('../db')
const { Post, User } = require('../models')

db.on('error', console.error.bind(console, "MongoDB connection error: "))

const main = async () => {
    
    const users = await User.find()

    const posts = [
        {
            user: users[0]._id,
            content: "This is my first post!",
        },
        {
            user: users[1]._id,
            content: "As I move, I feel the rhythm of the universe coursing through my veins. My body becomes a brush, painting the air with each graceful gesture. Every step is a story, an expression of my soul. The music whispers secrets, and I translate them into movement. My dance is a conversation between the ethereal and the tangible, a dialogue of dreams and reality. Each leap is a flight, each turn a whirlwind of emotion. I am a dancer, and with every performance, I share a piece of my heart with the world.",
        },
        {
            user: users[1]._id,
            content: "Within the dance, I find my sanctuary; a place where the boundaries of the physical world blur, and the music becomes the language of my soul. My body speaks in elegant arcs and fluid lines, weaving stories of love, loss, and liberation. Every movement is a silent prayer, a plea for understanding in a world that often forgets the beauty of the human spirit. I am a dancer, and with each performance, I invite you to join me in this sacred space, where dreams take flight and the heart finds its true rhythm.",
        },
        {
            user: users[1]._id,
            content: 'In the dance, I discover the poetry of motion. My body becomes a vessel for the stories that my heart yearns to tell. Each step is a word, each turn a punctuation mark in the narrative of my life. I am a dancer, and with each performance, I share the verses of my soul with the world, hoping to inspire, to connect, and to move hearts as I have been moved.',
        },
        {
            user: users[2]._id,
            content: 'Within the canvas, I find my sanctuary; a place where the boundaries of the physical world blur, and the colors become the language of my soul. My hands speak in elegant strokes and fluid lines, weaving stories of love, loss, and liberation. Every brushstroke is a silent prayer, a plea for understanding in a world that often forgets the beauty of the human spirit. I am a painter, and with each stroke, I invite you to join me in this sacred space, where dreams take form and the heart finds its true palette.',
        },
        {
            user: users[2]._id,
            content: 'In the canvas, I discover the poetry of color. My hands become a vessel for the stories that my heart yearns to tell. Each stroke is a word, each blend a punctuation mark in the narrative of my life. I am a painter, and with each piece, I share the verses of my soul with the world, hoping to inspire, to connect, and to move hearts as I have been moved.',
        },
        {
            user: users[2]._id,
            content: 'In the canvas, I find my voice; a place where the boundaries of the physical world blur, and the colors become the language of my soul. My hands speak in elegant strokes and fluid lines, weaving stories of love, loss, and liberation. Every brushstroke is a silent prayer, a plea for understanding in a world that often forgets the beauty of the human spirit. I am a painter, and with each stroke, I invite you to join me in this sacred space, where dreams take form and the heart finds its true palette.',
        },
        {
            user: users[3]._id,
            content: 'In art, I find my sanctuary; a place where the boundaries of the physical world blur, and the colors become the language of my soul. Each piece speaks in elegant strokes and fluid lines, weaving stories of love, loss, and liberation. Every brushstroke is a silent prayer, a plea for understanding in a world that often forgets the beauty of the human spirit. I am an art enjoyer, and with each piece, I find solace, inspiration, and a deeper connection to the world and those around me.',
        },
        {
            user: users[3]._id,
            content: 'Within the art, I discover the poetry of expression. Each piece is a vessel for the stories that my heart yearns to understand. Every stroke is a word, every blend a punctuation mark in the narrative of my life. I am an art enjoyer, and with each piece, I share the verses of my soul with the world, hoping to inspire, to connect, and to move hearts as I have been moved.',
        },
        {
            user: users[3]._id,
            content: 'In art, I find a voice that speaks to me in whispers of color and shape. Each piece is a story, an emotion, or a moment captured in time. Every brushstroke is a silent prayer, a plea for understanding in a world that often forgets the beauty of the human spirit. As an art enjoyer, I am drawn to the pieces that resonate with my soul, that speak to me in a language only the heart can understand. And with each piece, I find solace, inspiration, and a deeper connection to the world and those around me.',
        },
    ]

    await Post.insertMany(posts)
    console.log('Posts were inserted to database')
}

const run = async () => {
    await main()
    db.close()
}

run()