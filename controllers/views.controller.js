const Views = require("../models/views.model");

exports.appendViews = async (newViews) => {
    
    try {
        
        const views = await Views.findOne();

        if (views != null){
            views.total_views = views.total_views + newViews;
            views.save();
        
        }else {
            await Views.replaceOne({},{total_views : 1}, {upsert : true});
        }

    } catch (err) {
        console.log(err);
    }
};

exports.getTotalViews = async (req, res, next) => {
    
    try {
        
        const views = await Views.findOne();

        if (views != null){
            res.locals.total_views = views.total_views;
        
        } else {
            res.locals.total_views = undefined;
        }
        
        
        next()

    } catch (err) {
        console.log(err);
        next('Views controller error')
    }
};