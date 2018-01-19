import bookshelf from '../config/db';
import Todo from '../models/todo';
import * as Bookshelf from 'bookshelf';

const TABLE_NAME = 'tags';

/**
 * Tags
 */
class Tag extends bookshelf.Model<Tag> {
  get tableName() {
    return TABLE_NAME;
  }
  todos():Bookshelf.Collection<Todo> {
    return this.belongsToMany(Todo);
  }
}
export default Tag;
