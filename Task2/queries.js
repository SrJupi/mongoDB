db.restaurant.find()
db.restaurant.find({}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1})
db.restaurant.find({}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0})
db.restaurant.find({}, {restaurant_id: 1, name: 1, borough: 1, address:{zipcode: 1}, _id: 0})
db.restaurant.find({borough: "Bronx"})
db.restaurant.find({borough: "Bronx"}).limit(5)
db.restaurant.find({borough: "Bronx"}).skip(5).limit(5)
db.restaurant.find({grades: {$elemMatch: {score: {$gt: 90}}}})
db.restaurant.find({grades: {$elemMatch: {score: {$gt: 80, $lt: 100}}}})
// para buscar en las coordenadas tuve que usar el index para indicar si es long (idx: 0) o es lat (idx: 1)
// porque si busca solo con 'address.coord' el query se ejecutar� en todo array (par long/lat).
db.restaurant.find({'address.coord.1': {$lt: -95.754168}}) // siempre debe ser vacia porque no existe latitude menor que -90.
db.restaurant.find({$and:[{'cuisine': {$ne : "American "}}, {'grades.score': {$gt: 70}}, {'address.coord.1': {$lt: -65.754168} }]}) // en en este caso siempre debe ser vacia porque no existe ningun restaurante que est� en NY (hemisferio norte) y tambi�n est� en el hemisferio sur (latitudes negativas)
db.restaurant.find({'cuisine': {$ne : "American "}, 'grades.score': {$gt: 70}, 'address.coord.0': {$lt: -65.754168} })
db.restaurant.find({'cuisine': {$ne : "American "}, 'grades.grade': {$eq: 'A'}, 'borough': {$ne: 'Brooklyn'}}).sort({'cuisine':1})
db.restaurant.find({name: {$regex: '^wil', $options: 'i'}}, {restaurant_id:1, name:1, borough:1, cuisine:1})
db.restaurant.find({name: {$regex: 'ces$', $options: 'i'}}, {restaurant_id:1, name:1, borough:1, cuisine:1})
db.restaurant.find({name: {$regex: 'reg', $options: 'i'}}, {restaurant_id:1, name:1, borough:1, cuisine:1})
db.restaurant.find({borough: 'Bronx', $or: [{cuisine: 'American '}, {cuisine: 'Chinese'}]})
db.restaurant.find({borough: {$in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}},{restaurant_id:1, name:1, cuisine:1, borough:1})
db.restaurant.find({borough: {$nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}},{restaurant_id:1, name:1, cuisine:1, borough:1})
db.restaurant.find({'grades.score': {$lte: 10}},{restaurant_id:1, name:1, cuisine:1, borough:1})
db.restaurant.find({$or: [{name: {$regex: '^wil', $options: 'i'}},{cuisine: {$nin: ['Chinese', 'American ']}}]},{restaurant_id:1, name:1, cuisine:1, borough:1})
db.restaurant.find({$and: [{'grades.grade': {$eq: 'A'}}, {'grades.score': 11}, {"grades.date": ISODate("2014-08-11T00:00:00Z")}]},{restaurant_id:1, name:1, grades:1})
db.restaurant.find({$and: [{'grades.1.grade': {$eq: 'A'}}, {'grades.1.score': 9}, {"grades.1.date": ISODate("2014-08-11T00:00:00Z")}]},{restaurant_id:1, name:1, grades:1})
db.restaurant.find({'address.coord.1': {$gte: 42, $lte: 52}},{restaurant_id:1, name:1, address:1})
db.restaurant.find().sort({name:1})
db.restaurant.find().sort({name:-1})
db.restaurant.find().sort({cuisine:1, borough:-1})
db.restaurant.find({'address.street': {$exists:false}})
db.restaurant.find({'address.coord': {$type:'double'}})
db.restaurant.find({'grades.score': {$mod: [7, 0]}}, {restaurant_id: 1, name:1, grades:1})
db.restaurant.find({name: {$regex: 'mon', $options: 'i'}}, {name:1, borough:1, 'address.coord': 1, cuisine:1})
db.restaurant.find({name: {$regex: '^Mad', $options: 'i'}}, {name:1, borough:1, 'address.coord': 1, cuisine:1})