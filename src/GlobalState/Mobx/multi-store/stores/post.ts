import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from 'mobx'
import Post from '../models/post'
import IPost from '../types/post'
import AppStore from './app'

export default class PostStore {
  byId = observable.map<number, Post>()

  constructor(private store: AppStore) {
    makeAutoObservable(this)
  }

  load(posts: IPost[]) {
    posts.forEach((it) => this.byId.set(it.id, new Post(this.store, it)))
  }

  get all() {
    return Array.from(this.byId.values())
  }
}
