/**
 * Created by MinhTu on 3/5/2017.
 */
var port = 8000;

module.exports = {
    port: process.env.PORT || port,
    db: 'mongodb://localhost/examonline' || 'mongodb://liucuxiu:moclammiu@ds145800.mlab.com:45800/oexam'
};