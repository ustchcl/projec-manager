import * as qs from "qs";
const BASE_URL = "http://49.234.74.97/server"


function post(uri: string, params: any = {}) {
  return fetch(`${BASE_URL + uri}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded"},
    body: qs.stringify(params),
    credentials: "include",
  })
}


function get(uri: string, params: any = {}) {
  return fetch(`${BASE_URL + uri}`, {
    method: "GET",
    headers: { "Content-Type": "application/x-www-form-urlencoded"},
    body: qs.stringify(params),
    credentials: "include",
  })
}


export const account = {
  login(username: string, password: string) {
    return post("/account/login", { username, password })
  },

  register(username: string, password: string) {
    return post("/account", { username, password, icon: ""})
  }
}

export const project = {
  list() {
    return get("/project", {})
  },

  create(title: string, description: string) {
    return post("/project", {title, description})
  }
}