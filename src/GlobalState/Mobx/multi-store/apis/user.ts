import AppStore from '../stores/app'
import AppApi from './app'

// 在 TypeScript 和 JavaScript 中，如果构造函数中的参数使用了访问修饰符（如 private、public、protected 等），它们将被自动视为类的实例属性，并且可以在整个类的范围内使用，不需要显式地通过 this 关键字进行声明。
export default class UserApi {
  constructor(
    private api: AppApi,
    private store: AppStore
  ) {}

  async getAll() {
    const res = await this.api.client.get('/users')
    this.store.user.load(res.data)
  }

  async getById(id: number) {
    const res = await this.api.client.get(`/users/${id}`)
    this.store.user.load(res.data)
  }
}
