import * as qs from "qs";
const BASE_URL = "http://49.234.74.97/server"


export const account = {
  login(username: string, password: string) {
    return fetch(`${BASE_URL}/account/login?`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded"},
      body: qs.stringify({ username, password })
    })
  },

  register(username: string, password: string) {
    return fetch(`${BASE_URL}/account`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded"},
      body: qs.stringify({ username, password, icon: ""})
    })
  }
}