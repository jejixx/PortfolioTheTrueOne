import fs from "fs";

function decodeHtml(s) {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\\u([0-9a-f]{4})/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    )
    .replace(/\\n/g, "\n");
}

const files = [
  "temp-accueil.html",
  "temp-accueil-up.html",
  "temp-accueil-upkalidea.html",
  "temp-accueil-mon-stage.html",
];

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  console.log(`\n=== ${file} ===\n`);

  const metas = [
    ...html.matchAll(/itemprop="description" content="([^"]*)"/g),
  ].map((m) => decodeHtml(m[1]));
  metas.forEach((m) => console.log("DESC:", m.slice(0, 2000)));

  const strings = [
    ...html.matchAll(/"([A-Za-zÀ-ÿ0-9][^"]{25,400})"/g),
  ]
    .map((m) => decodeHtml(m[1]))
    .filter(
      (t) =>
        /[àâäéèêëïîôùûüç]|Groupe|Kalid|stage|Stage|Joinville|observation|semaine|Lundi|HTML|web|informatique|3/i.test(
          t,
        ) && !t.includes("function") && !t.includes("google"),
    );

  [...new Set(strings)].slice(0, 30).forEach((t) => console.log("TXT:", t));
}
