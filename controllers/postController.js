const { Post } = require('../models')

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate(['user']).sort({createdAt: -1, id: -1, user: -1, content: -1, image: -1})
        res.json(posts)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getPostById = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id).populate(['user'])
        if (post) {
            res.json(post)
        }
    } catch (error) {
        return res.status(500).send('Post with the specified ID does not exists');
    }
}

const getPostByUser = async (req,res) => {
    try {
        const posts = await Post.find({user: req.params.id}).populate('user').sort({createdAt: -1, id: -1, user: -1, content: -1, image: -1})
        if (posts) {
            res.json(posts)
        }
    } catch (error) {
        return res.status(500).send('Posts do not exists');
    }
}

const createPost = async (req,res) => {
    try {
        const post = await new Post(req.body)
        await post.save()
        return res.status(201).json({
            post
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updatePost = async (req, res) => {
    try {
        let { id } = req.params;
        let post = await Post.findByIdAndUpdate(id, req.body, { new: true })
        if (post) {
            return res.status(200).json(post)
        }
        throw new Error("Post not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Post.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Post deleted");
        }
        throw new Error("Post not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getPosts,
    getPostById,
    getPostByUser,
    createPost,
    updatePost,
    deletePost,
}