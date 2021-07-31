const {Schema, model, Types} = require('mongoose')

const db = new Schema({
	nickname: {type: String, required: true},
	idvk: {type: Number, required: true},
	ads: {type: Number, required: true},
	balance: {type: Number, required: true}
})

model.exports = model('db', db)