import User from '../models/User';
import config from '../config/config';

export function fetchAll() {
  return User.fetchAll()
    .then((data: {}) => ({ data }));
}

export function paginate(page: number = 1) {
  return User.fetchPage({ page, pageSize: 1 })
    .then((data: {}) => ({ data, pagination: data.pagination }));
}
