export const myData = () => {
  return fetch(
    // "https://raw.githubusercontent.com/song-chaeyoung/portfolioPage/refs/heads/main/db.json"
    "../db.json"
  ).then((res) => res.json());
};
