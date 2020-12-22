import { project, category } from "@/core/Network"


export type Project = {
    id: number; 
    title: string; 
    description: string;
}

type State = {
  projects: Project[];
  current: Project | null;
}

const state: State = {
  projects: [],
  current: null
}

const getters = {
  projects(state: State) {
    return state.projects
  },
  getProjectById(state: State) {
    return (id: number) => state.projects.find(x => x.id === id)
  },
  currentProject(state: State) {
    return state.current
  }
}

const actions = {
  async getProjects(context: any) {
    const resp = await project.list()
    if (resp.ok) {
      context.commit('setProjects', await resp.json())
    }
  },
  async createProject(context: any, data: any) {
    if (
      data.title == null ||
      data.description == null ||
      data.categories == null ||
      data.categories.length <= 0
    ) {
      throw new Error(`Cannot create a project with invalid data: ${data}`);
    }
    const resp = await project.create(data.title, data.description)
    if (resp.ok) {
      const id = (await resp.json()).id as number;
      for (let i = 0; i < data.categories.length; i++) {
        await category.create(data.categories[i].title, id)
      }
    }
    this.getProjects(context)
  },
  async deleteProject(context: any, id: number) {
    const resp = await project.delete_(id)
    if (!resp.ok) {
      throw new Error(await resp.text())
    }
    this.getProjects(context)
  },
  // async updateProject(context: any, data: any) {

  // }
}

const mutations = {
  setProjects(state: State, projects: Project[]) {
    state.projects = projects
  }
}


export default {
  state,
  getters,
  mutations,
  actions
};
