# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([
        { name: 'Ryan Gosling', email: "ryan@gmail.com", gender: 'm', age: 35, profile_pic: 'http://coolspotters.com/files/photos/591533/ryan-gosling-large.jpg?1357449177', city: "LA", tagline:"I don't need dating apps actually"},
        { name: 'Jorge Correa Jr', email: "ryan@gmail.com", gender: 'm', age: 35, profile_pic: 'http://coolspotters.com/files/photos/591533/ryan-gosling-large.jpg?1357449177', city: "LA", tagline:"I don't need dating apps actually"},
        { name: 'Garret Rasko Martinis', email: "ryan@gmail.com", gender: 'm', age: 35, profile_pic: 'http://coolspotters.com/files/photos/591533/ryan-gosling-large.jpg?1357449177', city: "LA", tagline:"I don't need dating apps actually"},
        { name: 'Jennifer Lora', email: "ryan@gmail.com", gender: 'm', age: 35, profile_pic: 'http://coolspotters.com/files/photos/591533/ryan-gosling-large.jpg?1357449177', city: "LA", tagline:"I don't need dating apps actually"},
        { name: 'Niko Bella Lewis', email: "ryan@gmail.com", gender: 'm', age: 35, profile_pic: 'http://coolspotters.com/files/photos/591533/ryan-gosling-large.jpg?1357449177', city: "LA", tagline:"I don't need dating apps actually"}
    ])

Like.create([
        { user_id: 1, friend_id: 2},
        { user_id: 1, friend_id: 3},
        { user_id: 2, friend_id: 1},
        { user_id: 3, friend_id: 2},
        { user_id: 5, friend_id: 1},
        { user_id: 1, friend_id: 5}
        
    ])

Message.create([
        { user_id: 1, friend_id:2, message_text: "hey you look cute"},
        { user_id: 5, friend_id:1, message_text: "hey you look cute"}
    ])