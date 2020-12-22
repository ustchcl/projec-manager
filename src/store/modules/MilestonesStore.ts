import { Milestone } from "@/core/Data";
import * as net from '@/core/DataLayer'

type State = {
  // Retrieve all the milestones by their ID.
  milestones: Milestone[];
};

const state: State = {
  milestones: []
};

const getters = {
  /**
   * Get all the milestones associated with a project.
   * @param id ID of the project to retrieve the milestones for.
   */
  milestones(state: State) {
    return state.milestones;
  }
};

type CreateMilestoneParams = {
  projectId: number;
  title: string;
  description: string;
  deadline: number;
}

const mutations = {
  /**
   * Create a new milestone and store it in the database.
   * The data to create the milestone with is checked.
   * @param {*State} state State of MilestoneStore
   * @param {*Milestone} data Contains the data about the milestone to create.
   */
  CreateMilestone(state: State, data: CreateMilestoneParams) {
    // Check if the data is valid.
    if (data.projectId == null || data.title == null) {
      throw new Error("A valid data attribute is required");
    }
    // const project = net.project.getById(data.projectId); 
    // if (project) {
    //   const milestone = new Milestone(
    //     project.selectedMilestoneId,
    //     data.title,
    //     data.deadline,
    //     data.description
    //   )
    //   project.milestones.push(milestone)
    //   mutations.UpdateMilestones(state, data);
    // }
  },

  UpdateProjectMilestoneId(state: State, data: any) {
    // Check if the data is valid.
    if (data.projectId == null || data.milestoneId == null) {
      throw new Error("Cannot set invalid milestone data to project.");
    }
  },

  /**
   * Get all the milestones from the current project's database.
   */
  UpdateMilestones(state: State, data: any) {
    if (data.projectId == null) {
      throw new Error("UpdateMilestones: Project id required.");
    }
  }
};

export default {
  state,
  getters,
  mutations
};
