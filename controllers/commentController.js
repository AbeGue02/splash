const { Comment, Post } = require('../models')

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
        res.json(comments)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getCommentById = async (req,res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (comment) {
            res.json(comment)
        }
    } catch (error) {
        return res.status(500).send('Comment with the specified ID does not exists');
    }
}

const getCommentsFromPost = async (req,res) => {
    try {
        const comments = await Comment.find({post: req.params.id})
        if (comments) {
            res.json(comments)
        }
    } catch (error) {
        return res.status(500).send('Comments for this post do not exist');
    }
}

const createComment = async (req,res) => {
    try {
        const comment = await new Comment(req.body)
        await comment.save()
        return res.status(201).json({
            comment
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        let { id } = req.params;
        let comment = await Comment.findByIdAndUpdate(id, req.body, { new: true })
        if (comment) {
            return res.status(200).json(comment)
        }
        throw new Error("Comment not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Comment.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Comment deleted");
        }
        throw new Error("Comment not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsFromPost
}