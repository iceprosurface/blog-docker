const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
function tryUntilConnect () {
    mongoose.connect('mongodb://mongo:27017/blog',function(err, db){
        if(err){
            setTimeout(tryUntilConnect, 5000)
            console.log(err, 'next call in 5s');
        }else{
            console.log('OK!');
        }
    });
}

tryUntilConnect();
var viewsSchema = new Schema({
    key: {type: String, index: true},
    views: Number
});

const views = mongoose.model('views', viewsSchema);

exports.createOrUpdateViewNumber = async function (key) {
    let view
    let data
    console.log(key)
    data = await views.findOne({key})
    if (data) {
        console.log(2)
        let count = data.views || 0
        view = await views.findOneAndUpdate(
            { key },
            { 
                $set: {views: count + 1}
            }
        )
    } else {
        console.log(1)
        view = await views.create({key, views: 1})
    }
    return Promise.resolve(data);
}
exports.find = function (key) {
    return views.findOne({key})
}
