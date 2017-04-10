/**
 * Created by MinhTu on 4/10/2017.
 */
module.exports = function (io,socket){
    socket.on('newGameCreated',function(data){
        console.log(data);
    })
};