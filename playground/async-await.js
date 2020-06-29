require("../src/db/mongoose");
const User = require("../src/models/user");

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age: age });
  return count;
};

updateAgeAndCount("5ef867c61b6104119c41e3c8", 0)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
