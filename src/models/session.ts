import bookshelf from '../config/db';

const TABLE_NAME = 'sessions';

class Session extends bookshelf.Model<Session> {
  get tableName() {
    return TABLE_NAME;
  }
  get hasTimestamps() {
    return true;
  }
}
export default Session;
