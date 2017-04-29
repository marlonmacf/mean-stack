var express = require('express');
var router = express.Router();

var Todo = require('../models/Todo.js');

/**
 * @Verb GET
 * @Path index
 * @Action /todos
 * @Return View
 */
router.get('/', function (request, response, next) {
    Todo.find(function (error, todos) {
        if (error) return next(error);
        response.render('todo/index', {response: todos});
    });
});

/**
 * @Verb GET
 * @Path create
 * @Action /todos/create
 * @Return View
 */
router.get('/create', function (request, response) {
    response.render('todo/create');
});

/**
 * @Verb POST
 * @Path store
 * @Action /todos
 * @Return Object
 */
router.post('/', function (request, response, next) {
    Todo.create(request.body, function (error, todo) {
        if (error) return next(error);
        response.json(todo);
    });
});

/**
 * @Verb GET
 * @Path show
 * @Action /todos/:id
 * @Return View
 */
router.get('/:id', function (request, response, next) {
    Todo.findById(request.params.id, function (error, todo) {
        if (error) return next(error);
        response.render('todo/show', {response: todo});
    });
});

/**
 * @Verb GET
 * @Path edit
 * @Action /todos/:id/edit
 * @Return View
 */
router.get('/:id/edit', function (request, response) {
    Todo.findById(request.params.id, function (error, todo) {
        if (error) return next(error);
        response.render('todo/edit', {response: todo});
    });
});

/**
 * @Verb PUT
 * @Path update
 * @Action /todos/:id
 * @Return Object
 */
router.put('/:id', function (request, response, next) {
    Todo.findByIdAndUpdate(request.params.id, request.body, function (error, post) {
        if (error) return next(error);
        response.json(post);
    });
    Todo.findById(request.params.id, function (error, todo) {
        if (error) return next(error);
        todo.note = request.body.note;
        todo.save(function (error, post) {
            if (error) return next(error);
            response.json(post);
        });
    });
});

/**
 * @Verb DELETE
 * @Path destroy
 * @Action /todos/:id
 * @Return Boolean
 */
router.delete('/:id', function (request, response, next) {
    Todo.findByIdAndRemove(request.params.id, request.body, function (error) {
        if (error) return next(error);
        response.json(true);
    });
});

module.exports = router;
