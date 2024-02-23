const { Like } = require('../models')

const getLikes = async (req, res) => {
    try {
        const likes = await Like.find()
        res.json(likes)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getLikeById = async (req,res) => {
    try {
        const like = await Like.findById(req.params.id)
        if (like) {
            res.json(like)
        }
    } catch (error) {
        return res.status(500).send('Like with the specified ID does not exists');
    }
}

const getLikesFromPost = async (req,res) => {
    try {
        const likes = await Like.find({post: req.params.id})
        if (likes) {
            res.json(likes)
        }
    } catch (error) {
        return res.status(500).send('Likes for this post do not exist');
    }
}


const createLike = async (req,res) => {
    try {
        const like = await new Like(req.body)
        await like.save()
        return res.status(201).json({
            like
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateLike = async (req, res) => {
    try {
        let { id } = req.params;
        let like = await Like.findByIdAndUpdate(id, req.body, { new: true })
        if (like) {
            return res.status(200).json(like)
        }
        throw new Error("Like not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteLike = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Like.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Like deleted");
        }
        throw new Error("Like not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getLikes,
    getLikeById,
    createLike,
    updateLike,
    deleteLike,
    getLikesFromPost
}