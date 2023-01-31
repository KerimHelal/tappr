const Codes = require("../models/codes");
const { generateRandomCodes } = require("../utils/generateRandomCodes");

exports.read = async (req, res) => {
    const page = req.query.page || 1;

    try {
        const count = await Codes.countDocuments({});

        const codes = await Codes.find({})
            .sort({ createdAt: 1 })
            .skip((page - 1) * 12)
            .limit(12);

        res.status(200).json({
            count,
            codes,
        });
    } catch (error) {
        res.status(400).json({
            error: `Error getting data: ${error.message}`,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { prefix, suffix, amount, numOfLeadingZeros } = req.body;
        const codesList = generateRandomCodes(prefix, suffix, numOfLeadingZeros, amount);
        let documents = codesList.map(code => ({
            code
        }));
        await Codes.insertMany(documents);
        res.status(200).send('Codes inserted successfuly!');
    } catch (error) {
        res.status(400).json({
            error: `Error inserting codes: ${error.message}`,
        });
    }

}

exports.deleteAll = async (req, res) => {
    try {
        await Codes.deleteMany({});
        res.status(200).send('Codes Deleted successfuly!');
    } catch (error) {
        res.status(400).json({
            error: `Error deleting codes: ${error.message}`,
        });
    }
}