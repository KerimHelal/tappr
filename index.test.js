const test = require('node:test');

const assert = require('assert/strict');

const { generateRandomCodes } = require("./utils/generateRandomCodes");


test('generate random code', () => {
    return assert.equal(generateRandomCodes('TAPPR_', '_2023', 3,), ['TAPPR_00_2023'])
})
