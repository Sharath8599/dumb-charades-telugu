import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const movies = new Set();

const years = [];

for (let year = 1990; year <= 2026; year++){
  years.push(year);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function scrapeYear(year) {
  const url = `https://en.wikipedia.org/wiki/List_of_Telugu_films_of_${year}`;

  try {
    console.log(`Scraping ${year}`);

    const { data } = await axios.get(url, {
        headers: {
            "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
        }
    });;

    const $ = cheerio.load(data);
    let count = 0;

    $("table.wikitable tbody tr").each((_, row) => {
      const cols = $(row).find("td");

      if (cols.length > 0) {
        const movie = $(cols[0]).text().trim();

        if (
          movie &&
          movie.length > 1 &&
          movie.length < 150
        ) {
          movies.add(movie);
          count++;
        }
      }
    });

    console.log(`${year}: ${count} movies found`);
    } catch (err) {

        if (err.response?.status === 429) {

            console.log(`Rate limited on ${year}`);
            console.log(`Waiting 10 seconds...`);

            await sleep(10000);

            return scrapeYear(year);
        }

        console.log(`Failed ${year}`);
        console.log(err.message);
    }
}

async function main() {

  for (const year of years) {
    await scrapeYear(year);
    await sleep(2000);
}

  const finalMovies = [...movies]
    .map(movie => movie.replace(/\[\d+\]/g, "").trim())
    .filter(Boolean)
    .sort();

  fs.writeFileSync(
    "./data/movies.json",
    JSON.stringify(finalMovies, null, 2)
  );

  console.log(
    `Saved ${finalMovies.length} movies`
  );
}

main();