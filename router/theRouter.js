const express = require('express');

const TheData = require("../data/db.js");

const router = express.Router();


//GET
router.get('/', (req, res) => {
    TheData.find(req.query)
    .then(stuffs => {
      res.status(200).json(stuffs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved." 
      });
    });
  });


//GET BY ID
router.get('/:id', (req, res) => {
TheData.findById(req.params.id)
.then(stuff => {
    if (stuff) {
    res.status(200).json(stuff);
    } else {
    res.status(404).json({ message: 'ID not found' });
    }
})
.catch(error => {
    console.log(error);
    res.status(500).json({
    message: 'Error retrieving the stuff',
    });
});
});


//GET COMMENTS BY ID ***
router.get('/:id/comments', (req, res) => {
    TheData.findCommentById(req.params.id)
    .then(stuff => {
        if (stuff) {
        res.status(200).json(stuff);
        } else {
        res.status(404).json({ message: 'ID not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'Error retrieving comments',
        });
    });
    });

//POST
router.post('/', (req, res) => {

const updateData = req.body;    

if (updateData.title && updateData.contents) {   

    TheData.insert(req.body)
    .then(stuff => {
        res.status(201).json(stuff);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'Error adding',
        });
    });
    }
    else
    {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."  });
    }

});

//POST COMMENTS BY ID ***
router.post('/:id/comments', (req, res) => { 

const updateData = req.body;
const id = req.params.id;

if (!updateData.text) {
    res.status(400).json({ errorMessage: "Please provide text for the comment."  });
}     
else {
        TheData.insertComment(req.body)
        .then(stuff => {
            if (stuff) {
            res.status(201).json(stuff);
            }
            else{
            res.status(404).json({ message: "The post with the specified ID does not exist." });    
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
            message: "There was an error while saving the comment to the database"
            });
        });
    }
});


//DELETE POST
router.delete('/:id', (req, res) => {
TheData.remove(req.params.id)
    .then(removed => {
        if (removed) {
        res.status(200).json({ message: 'Delete sucessful' });
        } else {
        res.status(404).json({ message: 'ID not found' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
        message: 'Error removing the post',
        });
    });
});


//UPDATE POST
router.put('/:id', (req, res) => {

const updatedPost = req.body;

if (updateData.title && updateData.contents) { 

    TheData.update(req.params.id, updatedPost)
    .then(updated => {
        if (updated) {
        res.status(200).json(updated);
        } else {
        res.status(404).json({ message: 'ID not found' });
        }
    })
    .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
        message: 'Error updating the post',
        });
    });

    }
    else{
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."  });  
    }
});
  
module.exports = router;
