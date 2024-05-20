// favorit.controller.js

// Import your model or any other dependencies you may need
const Favorit = require('../models/favorit.model');

// Controller function to handle selecting all favorites
const selectAll = async (req, res) => {
    try {
        // Fetch all favorites from the database
        const favorites = await Favorit.find();
        // Send the favorites as a response
        res.status(200).json(favorites);
    } catch (error) {
        // If there's an error, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
};

// Controller function to handle adding a new favorite
const addOne = async (req, res) => {
    try {
        // Create a new favorite based on the request body
        const newFavorite = new Favorit(req.body);
        // Save the new favorite to the database
        await newFavorite.save();
        // Send the newly created favorite as a response
        res.status(201).json(newFavorite);
    } catch (error) {
        // If there's an error, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
};

// Controller function to handle deleting a favorite by ID
const deleteOne = async (req, res) => {
    try {
        // Find the favorite by ID and delete it
        await Favorit.findByIdAndDelete(req.params.id);
        // Send a success message as a response
        res.status(200).json({ message: "Favorite deleted successfully" });
    } catch (error) {
        // If there's an error, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
};

// Export the controller functions for use in the router
module.exports = {
    selectAll,
    addOne,
    deleteOne
};
