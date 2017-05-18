import mongoose from 'mongoose';

import Promise from 'bluebird';

import { log } from './utils';

import findOrCreate from 'mongoose-findorcreate';

import parseMongodbUrl from './parse-mongodb-url';


let Schema = mongoose.Schema;

/**
* Schemas
*/

let user = new Schema({
    name: String,
    friends: [
        {
            type: Schema.ObjectId,
            ref: 'User'
        }
    ]
});
export const User = mongoose.model('User', user);

let blogpost = Schema({
    title: String,
    tags: [String],
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
export const BlogPost = mongoose.model('BlogPost', blogpost);

export function getMongoUrl(database) {
  let url = process.env.mongodbURL + database
  if(process.env.authenticationDatabase) {
    url += `?authSource=${process.env.authenticationDatabase}`
  }
  return url;
}



export function connect(database, callback) {
  let url = getMongoUrl(database);
  mongoose.connect(url)
  mongoose.connection.on('open', () => {
      mongoose.Promise = Promise;
      log(`mongoose connected: ${url}`)
      if(typeof callback == 'function') {
        callback();
      }
  })
}
