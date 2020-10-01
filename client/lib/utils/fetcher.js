import axios from "axios";

// TODO: This is the same function ad fetcherUser
export default async function fetcher(url) {
  const { data } = await axios.get(url);

  return data;
}
