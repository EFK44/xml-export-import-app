import { createInterface } from "node:readline";
import axios from "axios";

const fetchUrl = async ({ jsonUrl }) => {
  const response = await axios.get(jsonUrl, {
    responseType: "stream",
  });
  const rl = createInterface({
    input: response?.data,
  });
  const products = [];
  for await (const line of rl) {
    // do something with the current line
    const lineParse = JSON.parse(line);
    console.log("lineParse", lineParse);
    const { availablePublicationCount, description, handle, id, title } =
      lineParse;

    products.push({
      availablePublicationCount,
      description,
      handle,
      id,
      title,
    });
  }
  return products;
};

export default fetchUrl;
