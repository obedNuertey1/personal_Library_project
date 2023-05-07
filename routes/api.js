/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const mongoose = require('mongoose');
const Book = require('../models/models.js');
const ObjectID = mongoose.Types.ObjectId;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      const regex = /.+/g;
      // since any character can be entered in a get request we can use regular expression
      Book.find({title: regex}).select({_id: 1, title: 1, commentcount: 1}).exec((err, data)=>{
        if(err){
          res.send('error');
        }else{
          res.json(data);
        }
      });
      
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title

      let newBook = new Book({title: title});

      // Insert into the database with model.save
      newBook.save((err, data)=>{
        if(err||!data){
          res.send('missing required field title');
        }else{
          let {_id, title} = data;
          res.json({_id, title});
        }
      });
      
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      const regex = /.+/g;
      Book.deleteMany({title: regex}, (err, data)=>{
        if(err){
          res.send('no book exists');
        }else{
          res.send('complete delete successful');
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      
      Book.findOne({_id: ObjectID(bookid)}, (err, data)=>{
        if(err || !data){
          res.send('no book exists');
        }else{
          let {_id, title, comments} = data;
          res.json({_id, title, comments});
        }
      });
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if(!comment){
        res.send('missing required field comment');
      }else{
        // To insert a comment
  
        // 1. check whether the book exists with findOne
        // if there is no book return no book exists
        // else append the new comment to the comment section of the returned data
        // and save the document
  
        Book.findOne({_id: ObjectID(bookid)}, (err, book)=>{
          if(err || !book){
            res.send('no book exists');
          }else{
            book.comments.push(comment);
            book.commentcount = book.comments.length;
            book.save((err, data)=>{
              if(err || !data){
                res.send('no book exists');
              }else{
                let {_id, title, comments} = data
                res.json({_id, title, comments});
              }
            });
          }
        });
      }
      

      
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      // Book.deleteOne({_id: ObjectID(bookid)}, (err, book)=>{
      //   if(!book){
      //     res.send('no book exists');
      //   }else{
      //     res.send('delete successful');
      //   }
      // });
      // Book.findOneAndRemove({_id: ObjectID(bookid)}, (err, book)=>{
      //   if(err || !book){
      //     res.send('no book exists');
      //   }else{
      //     res.send('delete successful');
      //   }
      // });
      Book.findOne({_id: ObjectID(bookid)}, (err, doc)=>{
        if(err || !doc){
          res.send('no book exists');
        }else{
          Book.deleteOne({_id: doc._id}, (err, book)=>{
            if(err || !book){
              res.send('no book exists');
            }else{
              res.send('delete successful');
            }
          });
        }
      });
    });
  
};
