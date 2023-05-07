/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// const Browser = require('zombie');
// Browser.site = "https://boilerplate-project-library.obednuertey1.repl.co";

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */
  let bookID = '';
  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .keepOpen()
        .post('/api/books')
        .set('content-type', 'application/json')
        .send({title: 'my first book'})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.title, 'my first book');
          bookID = res.body._id;
          done();
        });
        //done();
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .keepOpen()
        .post('/api/books')
        .set('content-type', 'application/json')
        .send({title: ''})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html');
          assert.equal(res.text, 'missing required field title');
          done();
        });
        //done();
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .keepOpen()
        .get('/api/books')
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.isArray(res.body);
          done();
        });
        //done();
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .keepOpen()
        .get('/api/books/101InvalidID')
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html');
          assert.equal(res.text, 'no book exists')
          done();
        });
        //done();
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        //done();
        chai.request(server)
        .keepOpen()
        .get('/api/books/'+bookID)
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.property(res.body, "title");
          assert.property(res.body, "comments");
          assert.equal(res.body._id, bookID);
          done();
        });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .keepOpen()
        .post('/api/books/'+bookID)
        .set('content-type', 'application/json')
        .send({
          comment: "this is comment No.1"
        })
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body._id, bookID);
          assert.property(res.body, 'comments');
          done();
        });
        //done();
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
        .keepOpen()
        .post('/api/books/'+bookID)
        .set('content-type', 'application/json')
        .send({comment: ""})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html');
          assert.equal(res.text, 'missing required field comment');
          done();
        });
        //done();
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .keepOpen()
        .post('/api/books/101invalidID')
        .set('content-type', 'application/json')
        .send({comment: "comment No.1"})
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html');
          assert.equal(res.text, 'no book exists');
          done();
        });
        //done();
      });
      
    });

    
    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
        .keepOpen()
        .delete('/api/books/'+bookID)
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html');
          assert.equal(res.text, 'delete successful');
          done();
        });
        //done();
        
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        //done();
        chai.request(server)
        .keepOpen()
        .delete('/api/books/123InvalidID')
        .end((err, res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html');
          assert.equal(res.text, 'no book exists');
          done();
        });
      });

    });

  });

});
