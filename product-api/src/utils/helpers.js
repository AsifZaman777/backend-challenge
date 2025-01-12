const crypto = require('crypto');

// Function to generate a unique product code based on the product name
const generateProductCode = (productName) => {
  // Step 1: Extract longest strictly increasing substrings
  const substrings = getLongestIncreasingSubstrings(productName);
  
  // Step 2: Hash the product name
  const hash = crypto.createHash('sha256').update(productName).digest('hex').substring(0, 6);

  // Step 3: Create product code in the format <hashed_value>-<start_index><substring><end_index>
  const productCode = substrings
    .map((substring) => {
      const { start, end, value } = substring;
      return `${hash}-${start}${value}${end}`;
    })
    .join('-'); // If there are multiple substrings, concatenate them
  
  return productCode;
};

// Helper function to find the longest strictly increasing substrings
const getLongestIncreasingSubstrings = (str) => {
  let longestSubstrings = [];
  let temp = '';
  
  for (let i = 0; i < str.length; i++) {
    if (temp === '' || str[i] > temp[temp.length - 1]) {
      temp += str[i];
    } else {
      if (temp.length > 1) {
        longestSubstrings.push({ value: temp, start: i - temp.length, end: i - 1 });
      }
      temp = str[i];
    }
  }

  if (temp.length > 1) {
    longestSubstrings.push({ value: temp, start: str.length - temp.length, end: str.length - 1 });
  }

  return longestSubstrings;
};

module.exports = { generateProductCode };
