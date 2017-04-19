var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Todo = require('../models/Todo.js');

// GET /todos listing.
router.get('/', function (request, response, next) {
    Todo.find(function (error, todos) {
        if (error) {
            return next(error);
        }
        response.json(todos);
    });
});

// POST /todos.
router.post('/', function (request, response, next) {
    Todo.create(request.body, function (error, post) {
        if (error) {
            return next(error);
        }
        response.json(post);
    });
});

// GET /todos/id.
router.get('/:id', function (request, response, next) {
    Todo.findById(request.params.id, function (error, post) {
        if (error) {
            return next(error);
        }
        response.json(post);
    });
});

// PUT /todos/:id.
router.put('/:id', function (request, response, next) {

    Todo.findById(request.params.id, function (error, todo) {
        if (error) {
            return next(error);
        }
        todo.note = request.body.note;
        todo.save(function (error, post) {
            if (error) {
                return next(error);
            }
            response.json(post);
        });
    });
});

module.exports = router;
