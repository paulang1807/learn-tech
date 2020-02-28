'use strict';

const express = require('express');
const router = express.Router();

const widgets = [
    { id: 1, name: 'Widget 1', color: 'blue', size: 'medium'},
    { id: 2, name: 'Widget 2', color: 'green', size: 'large'},
    { id: 3, name: 'Widget 3', color: 'red', size: 'small'}
]

function findWidget(widgetId) {
    return widgets.find(widget => 
        widget.id === parseInt(widgetId, 10));
}

function findWidgetIndex(widgetId) {
    return widgets.indexOf(findWidget(widgetId));
}

// /ap/widgets - GET, POST
router.route('/')
    .get(function(req, res) {
        res.json(widgets);
    })
    .post(function(req, res) {
        widgets.push(req.body);

    res.json({ resp: "Success"});
    });

// /ap/widgets/1 - GET, PUT, DELETE
router.route('/:widgetId')
    .get(function(req, res) {
        res.json(findWidget(req.params.widgetId, 10));
    })
    .put((req, res) => {
        widgets.splice(findWidgetIndex(req.params.widgetId), 1);
        widgets.push(req.body);
        res.json(widgets);
    })
    .delete((req, res) => {
        widgets.splice(findWidgetIndex(req.params.widgetId), 1);
        res.json(findWidget(req.params.widgetId));
    });

module.exports = router;