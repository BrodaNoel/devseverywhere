
export const backend = {
  getTweets() {
    return fetch('https://us-central1-devseverywhere-1494347271845.cloudfunctions.net/getTweets', {
      method: 'GET'
    }).then(r => r.json())
  }
};
