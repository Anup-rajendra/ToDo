import { fetchDataDetails, } from "../../types/fetch";

export async function GET(request: Request) {
  try {
    const toDo =await fetchDataDetails(); 

    const initialState = toDo;

    return Response.json(initialState);
  } catch (error) {
    console.error("Error fetching initial state:", error);
    return Response.json("Error fetching data");
  }
}
