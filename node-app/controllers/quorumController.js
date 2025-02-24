const Quorum = require("../models/quorumSchema");

class quorumController{

    static getQuorum = async (req, res) => {
        try {
            const quorum = await Quorum.find();
            res.status(200).json({ success: true,info: quorum });
        } catch (error) {
            console.error("Error getting quorum:", error);
            res.status(500).json({ success: false, message: "Error getting quorum" });
        }
    }

}

module.exports = quorumController;