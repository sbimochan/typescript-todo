import bookshelf from '../config/db';
import Todo from '../models/todo';
import * as Bookshelf from 'bookshelf';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model <User> {
  get tableName() {
    return TABLE_NAME;
  }

 get hasTimestamps() {
    return true;
  }
  todos():Bookshelf.Collection<Todo> {
    return this.hasMany(Todo);
  }
}
// class UserTodo extends bookshelf.Model {   get todos(){     return
// this.hasMany(Todo);   } } let UserTodo = bookshelf.Model.extend({
// tableName:'users',
//   todos: ()=>{     return this.hasMany(TodoUser);   } });

export default User;
// export {UserTodo};
