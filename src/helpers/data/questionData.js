import axios from 'axios';

const baseUrl = 'https://prept-c66c7.firebaseio.com/';

const getQuestions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createQuestion = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
    }).catch((error) => reject(error));
});

const updateQuestion = (dataObject) => axios.patch(`${baseUrl}/${dataObject.firebaseKey}.json`, dataObject);

export { getQuestions, createQuestion, updateQuestion };
