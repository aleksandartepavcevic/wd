import { database, ref, get, child } from "./database.js";
const dbRef = ref(database);

export const getFitnessCenter = (id) =>
  get(child(dbRef, `fitnesCentri/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

export const getAllFitnessCenters = () =>
  get(child(dbRef, `fitnesCentri`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let dataArr = [];
        const data = snapshot.val();
        Object.keys(data).map((key) => dataArr.push({ ...data[key], id: key }));
        return dataArr;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
