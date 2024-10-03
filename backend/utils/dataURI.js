import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString(); // Fixed the method name
  return parser.format(extName, file.buffer);
};

export default getDataUri;
