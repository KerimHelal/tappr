/**
 * 
 * @param {*} prefix Prefix to be used in the start of the code example TAPPR
 * @param {*} suffix Suffix to be used in the end of the code example 2023
 * @param {*} numOfLeadingZeros Number of leading zeros beside the generated number based on amount
 * @param {*} amount Amount of generated codes
 * @returns 
 */
exports.generateRandomCodes = (prefix = '', suffix = '', numOfLeadingZeros = 0, amount) => {
    const codes = [];
    for (let i = 0; i < amount; i++) {
        let code = i.toString();
        code = code.padStart(code.length + numOfLeadingZeros, "0");
        const fullcode = prefix + code + suffix;
        codes.push(fullcode);
    }

    return codes;
}