/* global describe:true, before:true, after:true, it:true, baseURL:true */

'use strict';

var should  = require('chai').should(),
    request = require('supertest');


describe("/test", function () {

  it('should return { "result": "test" }', function (done) {
    request(baseURL)
      .get('/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        
        res.body.should.be.an('object');
        res.body.should.have.ownProperty('result');
        res.body.result.should.equal("test");
        
        return done();
      });
  });

});
