import * as Boom from 'boom';
import Todo from '../models/todo';
import Tag from '../models/tag';
/**
 * Get all lists.
 *
 * @return {Promise}
 */
export function getAllTodos() {
  return Todo.fetchAll();
}

/**
 * Get a list.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodo(userId:number) {
  return new Todo({ userId })
    .fetch({
      withRelated: ['user', 'tags']
    })
    .then(todo => {
      if (!todo) {
        throw  Boom.notFound('todo not found');
      }
      return todo;
    });
}

/** *get individual todos
 *
 */
export function getUserTodos(userId:number, paginate:{}) {
  return new Todo()
    .where({ user_id: userId })
    .fetchPage({
      page: paginate,
      pageSize: 5,
      withRelated: ['user', 'tags']
    })
    .then(todo => {
      if (!todo) {
        throw new Boom.notFound('todo not found');
      } else {
        return (todo = { todo: todo, pagination: todo.pagination });
      }
    });
}
/**
 * search todo
 */
export function searchTodo(search:string, userId:number) {
  return new Todo()
    .query(qb => {
      qb
        .where('user_id', '=', userId)
        .andWhere('description', 'LIKE', '%' + search + '%');
    })
    .fetchPage({
      pageSize: 5,
      withRelated: ['user', 'tags']
    })
    .then(todo => {
      if (!todo) {
        throw new Boom.notFound('todo not found');
      } else {
        return (todo = { todo: todo, pagination: todo.pagination });
      }
    });
}
/**
 * Create new vehicleObj.
 *
 * @param  {Object}  todoObj
 * @return {Promise}
 */
export function createTodo(todoObj:{}) {
  return new Todo({ description: todoObj.description }).save().then(todoObj => {
    return todoObj.refresh();
  });
}

export function createUserTodos(userId:number, body:{}) {
  // user id
  return new Todo({ description: body.description, userId: userId })
    .save()
    .then(result => {
      result.tags().attach(body.tags);

      return result.refresh();
    });
}


export function createTags(body:{}) {
  return new Tag({ tagName: body.tags }).save().then(body => body.refresh());
}
/**
 * Update a vehicle.
 *
 * @param  {Number|String}  id
 * @param  {Object}         vehicle
 * @return {Promise}
 */
export function updateTodo(id:number, todoObj:{}) {
  return new Todo({ id })
    .save({ description: todoObj.description })
    .then(todoObj => todoObj.refresh());
}

/**
 * Delete a list.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id:number) {
  return new Todo({ id }).fetch().then(todoObj => todoObj.destroy());
}
