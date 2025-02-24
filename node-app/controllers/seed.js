const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Quorum = require("../models/quorumSchema"); // Update with the correct path

mongoose.connect("mongodb+srv://sksarukali:KRet1aKFEBLDDiwU@cluster0.i4aiegf.mongodb.net/jobportal", { // Update your DB URL
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 

const generateDummySenators = async (count = 300) => {
    const parties = ["democrat", "independent", "republican"];
    const statuses = ["active", "former"];

    const senators = Array.from({ length: count }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        education: faker.person.jobTitle() + " from " + faker.location.city() + " University",
        state: faker.location.state(),
        party: faker.helpers.arrayElement(parties),
        photo: faker.image.avatar(),
        status: faker.helpers.arrayElement(statuses),
    }));

    try {
        await Quorum.insertMany(senators);
        console.log(`${count} dummy senators inserted successfully!`);
    } catch (error) {
        console.error("Error inserting dummy senators:", error);
    } finally {
        mongoose.connection.close();
    }
};

generateDummySenators();
