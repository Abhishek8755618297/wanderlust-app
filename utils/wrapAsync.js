
//wrap async function (to execute fn function with the same parameters)
// function wrapAsync(fn) {
//     return function(req, res, next) {
//         fn(req, res, next).catch((fn)).catch((err) => next(err));
//     }
// }

module.exports = ((fn) => {
    return(req, res, next) => {
        fn(req, res, next).catch(next);
    }
})