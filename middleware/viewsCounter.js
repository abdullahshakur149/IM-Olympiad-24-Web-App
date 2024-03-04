const viewsController = require("../controllers/views.controller");
let currentViews = 0;
let timeoutId = undefined;

module.exports = async function countViews (req, res, next) {
    currentViews = currentViews + 1;
    if (!timeoutId){
        timeoutId = setTimeout(() => {
            viewsController.appendViews(currentViews);
            timeoutId = undefined;
            currentViews = 0;
        }, 5000); // update db after every 5 seconds
    }

    next();
};