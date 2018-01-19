import bookshelf from '../config/db';
import User from '../models/user';
import Tag from '../models/tag';
import * as Bookshelf from 'bookshelf';


const TABLE_NAME ='todoLists';

class Todo extends bookshelf.Model<Todo> {
  get tableName(){
    return TABLE_NAME;
  }
  user(): Bookshelf.Model<User>{
    return this.belongsTo(User);
  }
  tags() {
    return this.belongsToMany(Tag);
  }
}

export default Todo;