import {
  action,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from 'mobx'
import User from '../models/user'
import AppStore from './app'
import IUser from '../types/user'

export default class UserStore {
  byId = observable.map<number, User>()

  constructor(private store: AppStore) {
    makeAutoObservable(this)
  }

  load(users: IUser[]) {
    users.forEach((it) => this.byId.set(it.id, new User(this.store, it)))
  }

  get all() {
    return Array.from(this.byId.values())
  }
}
