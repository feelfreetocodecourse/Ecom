require("dotenv").config();
const {application} = require("./server");

application.listen(process.env.PORT || 3000, () => {
  console.log(`listening On Port ${process.env.PORT || 3000}`);
});
