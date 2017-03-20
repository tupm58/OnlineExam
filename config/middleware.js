// /**
//  * Created by MinhTu on 3/19/2017.
//  */
// function authenticationMiddleware () {
//     return function (req, res, next) {
//         if (req.isAuthenticated()) {
//             return next()
//         }
//         res.redirect('/')
//     }
// }

module.exports.authenticationMiddleware =  function (){
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
};