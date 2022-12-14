/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI: string | undefined = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log("Cannot start process with out database URL");
  process.exit();
}

export default { PORT, MONGODB_URI };