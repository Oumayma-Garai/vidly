const bcrypt = require("bcrypt");
async function run() {
  const salt = await bcrypt.genSalt(10); //number of rounds of random
  const hashed = bcrypt.hash("1243", salt);
  console.log(salt);
  console.log(hashed);
}
run();
