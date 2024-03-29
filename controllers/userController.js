const { User } = require('../models')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        return res.status(500).send("An error has occured")
    }
}

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            res.json(user)
        }
    } catch (error) {
        return res.status(500).send('User with the specified ID does not exists');
    }
}

const createUser = async (req,res) => {
    try {
        const user = await new User(req.body)
        await user.save()
        return res.status(201).json({
            user
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (user) {
            return res.status(200).json(user)
        }
        throw new Error("User not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const patchUser = async (req, res) => {
    try {
        let { id } = req.params;
        let { followers, following } = req.body
        let user = await User.findByIdAndUpdate(id, {followers, following}, { new: true })
        if (user) {
            return res.status(200).json(user)
        }
        throw new Error("User not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
}