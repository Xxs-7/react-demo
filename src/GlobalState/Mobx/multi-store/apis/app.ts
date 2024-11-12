import axios from 'axios'
import AppStore from '../stores/app'
import UserApi from './user'
import PostApi from './post'

export default class AppApi {
  client = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })

  user: UserApi
  post: PostApi

  constructor(store: AppStore) {
    this.user = new UserApi(this, store)
    this.post = new PostApi(this, store)
  }
}
