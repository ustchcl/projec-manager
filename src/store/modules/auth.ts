import { account } from "@/core/Network"


type User = {id: number; username: string; icon: string}

type State = {
  user: User | null;
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
  }
}

const mutations = {
  setUser(state: State, user: User) {
    state.user = user
  }
}


export default {
  state,
  getters,
  mutations,
  actions
};
