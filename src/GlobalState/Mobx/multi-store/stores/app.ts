import UserStore from './user'
import PostStore from './post'

export default class AppStore {
  user = new UserStore(this)
  post = new PostStore(this)
}
