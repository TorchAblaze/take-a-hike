export default class NpsMainService {
  static getPark(state) {
    return fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${process.env.NPS_API_KEY}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error.message;
      });
  }
}