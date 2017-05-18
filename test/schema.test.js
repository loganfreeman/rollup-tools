import {describe, it} from 'mocha';
import {assert} from 'chai';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

import models, {User, BlogPost, Registration, connect} from '../src/schema';

import Promise from 'bluebird';

let ObjectId = mongoose.Types.ObjectId;

dotenv.config();

describe('schema', () => {

    function clear(done) {
      let run = 0;
      User.remove({}, (err) => {
        run++;
        if(run == 2) {
          mongoose.connection.close();
          done();
        }
      })

      BlogPost.remove({}, (err) => {
        run++;
        if(run == 2) {
          mongoose.connection.close();
          done();
        }
      })
    }

    function init(done) {
      /**
       * Generate data
       */

      var userIds = [new ObjectId, new ObjectId, new ObjectId, new ObjectId];
      var users = [];

      users.push({
        _id: userIds[0],
        name: 'mary',
        friends: [userIds[1], userIds[2], userIds[3]]
      });
      users.push({
        _id: userIds[1],
        name: 'bob',
        friends: [userIds[0], userIds[2], userIds[3]]
      });
      users.push({
        _id: userIds[2],
        name: 'joe',
        friends: [userIds[0], userIds[1], userIds[3]]
      });
      users.push({
        _id: userIds[3],
        name: 'sally',
        friends: [userIds[0], userIds[1], userIds[2]]
      });

      User.create(users, function(err) {
        assert.ifError(err);

        var blogposts = [];
        blogposts.push({
          title: 'blog 1',
          tags: ['fun', 'cool'],
          author: userIds[3]
        });
        blogposts.push({
          title: 'blog 2',
          tags: ['cool'],
          author: userIds[1]
        });
        blogposts.push({
          title: 'blog 3',
          tags: ['fun', 'odd'],
          author: userIds[2]
        });

        BlogPost.create(blogposts, function(err) {
          assert.ifError(err);

          /**
           * Population
           */

          BlogPost
          .find({tags: 'fun'})
          .lean()
          .populate('author')
          .exec(function(err, docs) {
            assert.ifError(err);

            /**
             * Populate the populated documents
             */

            var opts = {
              path: 'author.friends',
              select: 'name',
              options: {limit: 2}
            };

            BlogPost.populate(docs, opts, function(err, docs) {
              assert.ifError(err);
              console.log('populated');
              done();
            });
          });
        });
      });

    }

    before((done) => {
      let called = 0;
      function callback() {
        if(called) {
          return;
        }
        called++;
        init(done);
      }
        connect('test', callback)
    })

    after((done) => {
      clear(done);
    })


    it('should ', (done) => {
      let run = 0;
      User.find({}, (err, users) => {
        run++;
        assert.equal(users.length, 4);
        if(run == 2) {
          done();
        }
      })

      BlogPost.find({}, (err, posts) => {
        run++;
        assert.equal(posts.length, 3);
        if(run == 2) {
          done();
        }
      })


    })


})
