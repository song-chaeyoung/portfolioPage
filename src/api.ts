export const myData = () => {
  return fetch("../db.json").then((res) => res.json());
};
