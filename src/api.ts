export const myData = () => {
  try {
    return fetch(
      // "https://raw.githubusercontent.com/song-chaeyoung/portfolioPage/refs/heads/main/db.json"
      "../db.json"
    ).then((res) => res.json());
  } catch (err) {
    console.log(err);
  }
};
