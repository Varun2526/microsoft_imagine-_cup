const sharp = require('sharp');

/**
 * Computes a dHash (Difference Hash) for an image.
 * 
 * Algorithm:
 * 1. Resize to 9x8 (72 pixels).
 * 2. Convert to grayscale.
 * 3. Compare each pixel to its right neighbor.
 *    If left > right, bit is 1, else 0.
 * 4. Result is 64 bits (8 rows * 8 comparisons).
 * 
 * @param {string|Buffer} imageInput - Path to image or image buffer
 * @returns {Promise<string>} - 16-character Hex string of the hash
 */
async function computeImageHash(imageInput) {
    try {
        const data = await sharp(imageInput)
            .resize(9, 8, { fit: 'fill' })
            .grayscale()
            .raw()
            .toBuffer();

        let hash = '';
        // data.length should be 72 bytes
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const left = data[y * 9 + x];
                const right = data[y * 9 + x + 1];
                hash += (left > right ? '1' : '0');
            }
        }

        // Convert binary string to hex
        return binaryToHex(hash);
    } catch (err) {
        console.error("Error computing hash:", err);
        throw err;
    }
}

/**
 * Converts a binary string to a hex string.
 */
function binaryToHex(s) {
    let output = '';
    for (let i = 0; i < s.length; i += 4) {
        const bytes = s.substr(i, 4);
        const decimal = parseInt(bytes, 2);
        const hex = decimal.toString(16);
        output += hex;
    }
    return output;
}

/**
 * Computes Hamming distance between two hex hashes.
 * @param {string} hash1 
 * @param {string} hash2 
 * @returns {number} distance (0 to 64)
 */
function hammingDistance(hash1, hash2) {
    let distance = 0;
    // Convert back to binary or compare hex directly (tricky). 
    // Easiest is to convert hex to binary then compare.
    const bin1 = hexToBinary(hash1);
    const bin2 = hexToBinary(hash2);

    for (let i = 0; i < bin1.length; i++) {
        if (bin1[i] !== bin2[i]) distance++;
    }
    return distance;
}

function hexToBinary(hex) {
    let bin = '';
    for (let i = 0; i < hex.length; i++) {
        const val = parseInt(hex[i], 16);
        bin += val.toString(2).padStart(4, '0');
    }
    return bin;
}

module.exports = { computeImageHash, hammingDistance };
