import fs from "fs";

const movies = JSON.parse(
  fs.readFileSync("./data/movies.json", "utf8")
);

const cleaned = movies.filter(movie => {

  const m = movie.trim();

  if (!m) return false;

  // remove pure numbers
  // remove pure numbers
if (/^\d+$/.test(m)) return false;

// remove numbering
if (/^\d+\.$/.test(m)) return false;

// remove ordinals
if (/^\d+(st|nd|rd|th)$/i.test(m)) return false;

  // remove month names
  if (
    [
      "JAN","JANUARY",
      "FEB","FEBRUARY",
      "MAR","MARCH",
      "APR","APRIL",
      "MAY",
      "JUN","JUNE",
      "JUL","JULY",
      "AUG","AUGUST",
      "SEP","SEPTEMBER",
      "OCT","OCTOBER",
      "NOV","NOVEMBER",
      "DEC","DECEMBER"
    ].includes(m.toUpperCase())
  ) return false;

  return true;
});

fs.writeFileSync(
  "./data/movies-clean.json",
  JSON.stringify(cleaned, null, 2)
);

console.log(
  `Before: ${movies.length}`
);

console.log(
  `After: ${cleaned.length}`
);