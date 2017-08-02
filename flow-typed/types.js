type Card = {
  data: CardData,
  tweets: Array<Tweet>,
  isDone: boolean,
  isSelected: boolean,
  nextMax: null | string,
  metrics: utils.defaultMetrics
};

type CardData = {
  name: string,
  hashtags: Array<string>,
  icon: string,
  styles: {},
  data: any
};

type Tweet = {
  coordinates: any,
  created_at: string,
  place: any,
  favorite_count: number,
  retweet_count: number,
  user: {
    verified: boolean,
    followers_count: number,
    friends_count: number
  }
};

type Metric = {
  hours: Array<number>,
  favorites: Array<number>,
  retweets: Array<number>,
  users: {
    verified: number,
    verifiedRate: number
  },
  tweetsWithGeoRate: number,
  tweetsWithGeo: Array<any>,
  tweetsCount: number,
  map: {
    points: Array<any>
  },
  showMap: boolean
};

type State = {
  +cards: Array<Card>,
  +user: User
};

type User = {
  isLogged: false,
  credentials: void | Credentials,
  firebaseToken: void | string
};

type Credentials = {
  accessToken: string,
  secret: string
};

type Action = {
  +type: string
};

type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
