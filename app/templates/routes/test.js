module.exports = function(server, logger) {
  
  // Sample route
  server.get('/test', function (req, res, next) {
    res.send({ 'result': 'test' });      
    return next();
  });
  
};
