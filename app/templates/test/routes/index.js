/* global describe:true, before:true, after:true, it:true, baseURL:true */

'use strict';

var should  = require('chai').should(),
    request = require('supertest');


describe("/", function () {

  it('should return a message', function (done) {
    request(baseURL)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        
        res.body.should.be.an('object');
        res.body.should.have.ownProperty('message');
        res.body.message.should.exist;
        res.body.message.should.match(/.+/);
        
        return done();
      });
  });

});
