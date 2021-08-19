import { ROLE_USER } from "../utils/constant";

const axios = require("axios");
const API_URL = process.env.NODE_ENV === "http://localhost:4000/";
// const API_URL =  'http://api.buzzho.me/post'

export const getHouseData = async (data) => {
	const { district, minPrice, maxPrice, limit, offset, role } = data;
	console.log("before api: ", data);
	const isForRenter = role === ROLE_USER.BROKER ? false : true;

	return axios({
		method: "POST",
		url: `http://localhost:4000/post/filter`,
		data: { district, minPrice, maxPrice, limit, offset, isForRenter },
	})
		.then((result) => {
			// console.log("call api: ",result.data.payload)
			return result.data.payload;
		})
		.catch((err) => {
			throw err.message;
		});
};

export const filterHouseData = async (data) => {
	const { district, minPrice, maxPrice, limit, offset } = data;
	const url = "http://localhost:4000/";

	return axios({
		method: "POST",
		url,
		data: { district, minPrice, maxPrice, limit, offset },
	})
		.then((result) => {
			// console.log("call api: ",result.data.payload)
			return result.data.payload;
		})
		.catch((err) => {
			throw err.message;
		});
};

export const getAllData = async () => {
	return axios({
		method: "GET",
		url: `http://localhost:4000/post`,
	})
		.then((result) => {
			console.log("call api: ", result);
			return result.data.payload;
		})
		.catch((err) => {
			throw err.message;
		});
};
