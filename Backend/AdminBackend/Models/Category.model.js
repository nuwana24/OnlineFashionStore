const mongoose = require('mongoose');

const schema = mongoose.Schema;

// const sub = new Schema({subcategory: String});
const subcats = new schema({name: String});

const CategorySchema = new schema({
    category : {
        type: String,
        required: true,
        trim: true,
        unique:true,
        minlength: 3
    },

    subCategories: [subcats],

    description: {
        type: String,
        required: false,
        trim: true,
        minlength: 5
    }

});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;