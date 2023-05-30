/* eslint-disable import/no-unused-modules */

import axios from 'axios';

// eslint-disable-next-line prefer-const
let baseUrl = 'https://disease.sh/v3/covid-19';
//common url for all the three provided data
export async function UseFetcher(method = 'POST', url: unknown, body: unknown) {
  //useFetcher method for fetch the api
  const apiUrl = `${baseUrl}${url}`;
  // eslint-disable-next-line no-useless-catch
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
    };
    if (body) {
      options.body = body;
    }
    if (method == 'get') {
      const res = await axios.get(apiUrl, options);
      return await res.data;
    } else {
      const res = await axios.post(apiUrl, options);
      return await res.data;
    }
  } catch (error) {
    throw error;
  }
}
