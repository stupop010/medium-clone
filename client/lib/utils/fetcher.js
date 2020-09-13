import axios from "axios";

export default async function fetcher(url) {
  const data = await axios.get(url);
  console.log(data);
}
