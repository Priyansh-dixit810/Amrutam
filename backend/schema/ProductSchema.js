const {Schema} = require("mongoose");

const ProductSchema = new Schema({
    generalInfo :{
        name: {type: String, required: true},
        subtitle: {type: String, required: true},
        quantity : {type: String, required: true},
        jar: {type: String, required: true},
        price: {type: String, required: true},
        description: {type: String, required: true},
        photoUrls: [{type: String}]
    },
    benefits : {
       primaryBenefits : [{
        title : {type: String , required: true},
       }] ,
       secondaryBenefits : [{
        emoji : {type: String , required: true},
        description : {type: String, required: true},
       }]
    },
    properties : {
        di: [{
        emoji : {type: String },
        description : {type: String, required: true},
        }] ,
        usage: [{
        emoji : {type: String },
        field1 : {type: String, required: true},
        field2 : {type: String},
        }] ,
        ingredientName:  [
        {
          name: { type: String, required: true },
          img: { type: String }
        }
        ],
        duration : [
        {
          emoji: { type: String, required: true },
          description: { type: String, required: true }
        }
        ],
    },
    faq: {
      faq: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true }
        }
      ],
      apd: [
        {
          title: { type: String},
        }
      ]
    },
    status: {
      type: Boolean,
      default: true,
    }
},
{ timestamps: true }
)

module.exports = {ProductSchema};