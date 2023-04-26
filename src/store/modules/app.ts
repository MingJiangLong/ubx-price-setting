interface IState {
  title: string
}
interface IGetter {
  title: string
}
const app = {
  namespace: true,
  state () {
    return {
      title: 'hi'
    }
  },
  getters: {
    title (state: IState, getters: IGetter, rootState: any) {
      return state.title
    }
  },
  mutations: {
    SET_TITLE (state: IState, title: string) {
      state.title = title
    }
  }
}
export default app