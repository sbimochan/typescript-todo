import Tag from '../models/tag';
import * as Boom from 'boom';

export function tags() {
  return Tag.fetchAll();
}
export function todosOfTags(id:number) {
  return new Tag({ id })
    .fetch({
      withRelated: ['todos']
    })
    .then(tags => {
      if (!tags) {
        throw new Boom.notFound('no tags');
      }

      return tags;
    });
}
