import axios from "axios";

const url =
  "https://en.wikipedia.org/wiki/List_of_Telugu_films_of_2024";

try {
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
    }
  });

  console.log(response.status);
} catch (err) {
  console.log(err.response?.status);
  console.log(err.message);
}