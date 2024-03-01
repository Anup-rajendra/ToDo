import {
  fetchUserDetails,
  fetchProjectDetails,
  fetchSectionDetails,
  fetchTaskDetails,
} from "../../types/fetch";
export async function GET(request: Request) {
  try {
    const userDetails = await fetchUserDetails();
    const projectDetails = await fetchProjectDetails();
    const sectionDetails = await fetchSectionDetails();
    const taskDetails = await fetchTaskDetails();

    const initialState = {
      todo: {
        userDetails,
        project: {
          projectDetails,
          section: {
            sectionDetails,
            task: {
              taskDetails,
            },
          },
        },
      },
    };

    return Response.json(initialState);
  } catch (error) {
    console.error("Error fetching initial state:", error);
    return Response.json("Error fetching data");
  }
}
