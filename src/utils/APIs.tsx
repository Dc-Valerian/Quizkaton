import axios from "axios"

const mainURL = axios.create({
    baseURL: "http://localhost:2112"
})

export const getQuestion = async () => {
    try {
        return await mainURL.get("/data").then((res: any) => {
            // console.log("reading: ", res)
            return res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const createQuestion = async (data: any) => {
    try {
        return await mainURL.post("/data", { id: data.length + 1, question: data })
    } catch (error) {
        console.log(error)
    }
}

export const getOneQuestion = async (id: any) => {
    try {
        return await mainURL.get(`/data/${id}`).then((res: any) => {
            return res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteOneQuestion = async (id: any) => {
    try {
        console.log(id)
        return await axios.delete(`http://localhost:2112/data/${id}`).then(() => {
            console.log(`${id} deleted successfully`)
        })
    } catch (error) {
        console.log(error)
    }
}