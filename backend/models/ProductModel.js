const {model} = require('mongoose');
const {ProductSchema} = require('../schema/ProductSchema');

const Product = model('Product', ProductSchema);

module.exports = {Product};
