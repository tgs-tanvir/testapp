const Senator = require('../models/senator');
const axios = require('axios');

class albumController {
    constructor() {
        this.fetchData = this.fetchData.bind(this);
        this.filterData = this.filterData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    // async fetchData() {
    //     try {
    //         const response = await axios.get('http://localhost:8080/quorum/quorum');
    //         console.log("API Response:", response.data);

    //         if (!Array.isArray(response.data)) {
    //             throw new Error("Invalid data format: Expected an array but got " + typeof response.data);
    //         }

    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching data:", error.message);
    //         return []; // Ensure it always returns an array
    //     }
    // }

    async fetchData() {
        try {
            const response = await axios.get('http://localhost:8080/quorum/quorum');
             
    
            // Extract the 'info' array from the response
            const senators = response.data.info || []; 
    
            if (!Array.isArray(senators)) {
                throw new Error("Invalid data format: Expected an array but got " + typeof senators);
            }
    
            return senators;
        } catch (error) {
            console.error("Error fetching data:", error.message);
            return []; // Ensure it always returns an array
        }
    }
    

    async filterData() {
        try {
            const data = await this.fetchData();
            if (!Array.isArray(data)) {
                console.error("filterData received invalid data:", data);
                return [];
            }

            return data.map((senator) => ({
                name: senator.name,
                senatorId: senator._id, // Fix: Ensure `_id` is stored as `senatorId`
                photo: senator.photo,
                status: senator.status,
                party: senator.party,
                state: senator.state
            }));
        } catch (error) {
            console.error("Error in filterData:", error.message);
            return [];
        }
    }

    async saveData(req, res) {
        try {
            const data = await this.filterData();
            if (!data.length) {
                return res.status(400).json({ error: "No valid data to save" });
            }

            const bulkInsert = data.map((senator) => ({
                updateOne: {
                    filter: { senatorId: senator.senatorId }, // Fix key name
                    update: { $set: senator },
                    upsert: true,
                }
            }));

            await Senator.bulkWrite(bulkInsert);
            res.json({ message: "Data saved successfully", info: bulkInsert });
        } catch (error) {
            console.error('Error storing data:', error.message);
            res.status(500).json({ error: 'Failed to store data' });
        }
    }
}

module.exports = new albumController();
