import axios from "axios"
const api = process.env.REACT_APP_RECORDS_API_URL || "http://5b068722ff98d70014f3883b.mockapi.io"

export const getAll = () => axios.get(`${api}/records`)


export const create = (body) => axios.post(`${api}/records`, body)

export const update = (id, body) => axios.put(`${api}/records/${id}`, body)

export const remvoe = (id) => axios.delete(`${api}/records/${id}`)