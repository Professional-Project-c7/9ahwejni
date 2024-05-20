const db = require('../Database/index');


// Controller function to handle selecting all favorites
const selectAll = async (req, res) => {
    try {
        // Fetch all favorites from the database
        const favorites = await db.favorit.findAll();
        // Send the favorites as a response
        res.status(200).json(favorites);
    } catch (error) {
        // If there's an error, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
}
const selectOne=async function(req,res){
    try { 
        const findId=req.params.id
        const project = await db.favorit.findAll({ where: { idUser: findId } })
        res.send(project)
    }
    catch (error) {
        console.log(error)
     } 
 }

// Controller function to handle adding a new favorite
const addOne = async (req, res) => {
    try {
        // Create a new favorite based on the request body
        const newFavorite = await db.favorit.create(req.body);
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
        const deletedFavoriteCount = await db.favorit.destroy({
            where: { id: req.params.id }
        });
        if (deletedFavoriteCount === 0) {
            res.status(404).json({ message: "Favorite not found" });
        } else {
            // Send a success message as a response
            res.status(200).json({ message: "Favorite deleted successfully" });
        }
    } catch (error) {
        // If there's an error, send a 500 status code with the error message
        res.status(500).json({ error: error.message });
    }
};

// Export the controller functions for use in the router
module.exports = {
    selectAll,
    addOne,
    deleteOne,
    selectOne
};
