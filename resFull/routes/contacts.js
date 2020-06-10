var express = require('express');
var router = express.Router();
var Contact = require('../models/contact.model.js');
// paginate the contect
function paginatiedData(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = await model.countDocuments() <= 5 ? await model.countDocuments() : 5;
        const pages = Math.ceil(await model.countDocuments() / 5);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit
        const results = {};
        results.pages = pages;
        results.page = page;
        if (startIndex > 0) {
            results.previous = {
                page: page - 1
            }
        }
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1
            }
        }
        try {
            results.result = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResult = results
            next()
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}
/* GET ALL ContactS */
router.get('/', paginatiedData(Contact), function (req, res, next) {    
    res.json(res.paginatedResult)
});
/* GET SINGLE Contact BY ID */
router.get('/:id', function (req, res, next) {
    Contact.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE Contact */
router.post('/', function (req, res, next) {
    console.log(req.body);
    Contact.create(req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* UPDATE Contact */
router.put('/:id', function (req, res, next) {
    console.log(req.body);
    Contact.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(post);
    });
});

/* DELETE Contact */
router.delete('/:id', function (req, res, next) {
    Contact.findByIdAndRemove(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

module.exports = router;
