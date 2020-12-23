import { account } from "@/core/Network"
import { Account } from "@/core/Data"

type State = {
  user: Account | null;
}

const state: State = {
  user: null
}

const getters = {
  isLogin(state: State) {
    return state.user !== null
  },
  currentUser(state: State) {
    return state.user
  }
}

const actions = {
  async login(context: any, loginParams: {username: string; password: string}) {
    const resp = await account.login(loginParams.username, loginParams.password)
    if (resp.ok) {
      context.commit('setUser', await resp.json())
    }
  },
  async register(context: any, regParmas: {username: string; password: string}) {
    const resp = await account.register(regParmas.username, regParmas.password)
    if (resp.ok) {
      await context.dispatch("login", regParmas)
    }
  },
}

const mutations = {
  setUser(state: State, user: Account) {
    state.user = user
  }
}


export default {
  state,
  getters,
  mutations,
  actions
};
