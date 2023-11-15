import axios from "axios";

const mainURL = axios.create({
  baseURL: "http://localhost:2112",
});

export const getQuestion = async () => {
  try {
    return await mainURL.get("/data").then((res: any) => {
      console.log("reading: ", res);
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = async (data: any) => {
  try {
    return await mainURL.post("/data", { id: data.length + 1, question: data });
  } catch (error) {
    console.log(error);
  }
};

export const getOneQuestion = async (id: any) => {
  try {
    return await mainURL.get(`/data/${id}`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOneQuestion = async (id: any) => {
  try {
    console.log(id);
    const response = await mainURL.delete(`/data/${id}`);
    console.log(`${id} deleted successfully`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
