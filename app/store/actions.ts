// import axios from "axios";
// import { Dispatch } from "redux";
// import { addInitialState } from "./slice";

// const fetchInitialState = async () => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/reduxstate");
//       if (response.status < 200 || response.status >= 300) {
//         console.error(`HTTP error! Status: ${response.status}`);
//         throw new Error("Failed to fetch API");
//       }
//       dispatch(addInitialState(response.data));
//     } catch (error) {
//       console.error("Error fetching initial state:", error);
//       throw error;
//     }
//   };
// };
