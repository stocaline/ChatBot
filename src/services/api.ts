import axios from "axios"

const api = axios.create({
    baseURL: "https://chatbotfastapi.squareweb.app"
})

export { api }