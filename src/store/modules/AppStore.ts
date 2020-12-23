import { Milestone } from "@/core/Data";
import * as net from "@/core/DataLayer"

type Dialog = {
  opened: boolean;
  name: string;
};

type State = {
  // Contains all the flags about dialogs.
  dialog: Dialog;

  // ID of the currently opened project.
  openedProjectId: string | number;

  // ID of the currently opened milestone.
  currentMilestoneId: string | number;

  // Width of the main drawer
  drawerWidth: number;

  // Whether dark mode is enabled or not.
  darkMode: boolean;

  // Base color of the application. (HEXA)
  baseColor: string;

  // Text Color of the application. (HEXA)
  textColor: string;

  // Darken the toolbar or not
  darkenToolbar: boolean;

  // Information about the github profile
  gitUserInfo: any;

  // Whether the application is opened for the first time.
  firstTimeUse: boolean;

  // Search content
  searchContent: string;

  // Flag set to true to show the helper page.
  showHelper: boolean;

  // Name of the currently opened project.
  projectName: string;

  // The currently selected language.
  selectedLanguage: "en" | "zh";
};

const state: State = {
  dialog: {
    name: "",
    opened: false
  },
  openedProjectId: -1,
  currentMilestoneId: 0,
  drawerWidth: 200,
  darkMode: net.peferences.getConfig().darkMode,
  baseColor: net.peferences.getConfig().baseColor,
  textColor: net.peferences.getConfig().textColor, 
  darkenToolbar: net.peferences.getConfig().darkenToolbar,
  gitUserInfo: net.peferences.getConfig().user,
  searchContent: "",
  showHelper: false,
  firstTimeUse: false,
  projectName: "",
  selectedLanguage: net.peferences.getConfig().lang as any
};

const mutations = {
  CreateProjDialog(state: State) {
    mutations.OpenDialog(state, "createProject");
  },

  CreateNoteDialog(state: State) {
    mutations.OpenDialog(state, "createNote");
  },

  UpdateNoteDialog(state: State) {
    mutations.OpenDialog(state, "updateNote");
  },

  OpenNoteDialog(state: State) {
    mutations.OpenDialog(state, "visualizeDialog");
  },

  OpenProject(state: State, id: string | number) {
    state.openedProjectId = id;
    // Set the default milestone when opening a project.
    // if (id >= 0) {
    //   const info = net.project.getById(id); // DBManager.getDB(id).getValue("info");
    //   state.projectName = info?.title ?? "";

    //   // state.currentMilestoneId = info.selectedMilestoneId;
    // } else {
    //   state.projectName = "";
    // }

    // Clear the search content, searches are different from project to notes.
    state.searchContent = "";
  },

  SetDarkMode(state: State, value: boolean) {
    state.darkMode = value;
    net.peferences.setValue("darkMode", value);
  },

  ShowSettings(state: State, value: boolean) {
    mutations.OpenDialog(state, "showSettings");
  },

  SetCurrentMilestoneId(state: State, id: string | number) {
    state.currentMilestoneId = id;
  },

  SetAppColor(state: State, color: string) {
    state.baseColor = color;
    net.peferences.setValue("baseColor", color)
  },

  SetTextColor(state: State, color: string) {
    state.textColor = color;
    net.peferences.setValue("textColor", color)
  },

  ToggleDarkenToolbar(state: State) {
    state.darkenToolbar = !state.darkenToolbar;
    net.peferences.setValue("darkenToolbar", !net.peferences.getConfig().darkenToolbar);
  },

  ExportProjDialog(state: State) {
    mutations.OpenDialog(state, "export-project-dialog");
  },

  DisableFirstTimeUse(state: State) {
    state.firstTimeUse = false;
  },

  SetupApplication(state: State, data: any) {
    if (data.defaultFolder == null) {
      throw new Error(`A valid data parameter required :${data}`);
    }
  },

  AddTag(state: State, tag: any) {
    if (tag == null || tag.tag.length <= 0) {
      throw new Error(`tag "${tag}" is invalid`);
    }
    if (state.openedProjectId < 0) {
      throw new Error("A project must be opened to add a tag");
    }
    // const project = net.project.getById(state.openedProjectId);
    // if (project) {
    //   project.categories.push(tag)
    //   net.project.update(project.id, project)
    // }
  },

  RemoveTag(state: State, tag: any) {
    if (tag == null || tag.tag.length <= 0) {
      throw new Error(`tag "${tag}" is invalid`);
    }
    if (state.openedProjectId < 0) {
      throw new Error("A project must be opened to add a tag");
    }
    // const project = net.project.getById((state.openedProjectId));
    // if (project) {
    //   project.categories = project.categories.filter(x => x === tag);
    //   net.project.update(project.id, project)
    // }
  },

  ToggleUpdateProject(state: State) {
    mutations.OpenDialog(state, "updateProject");
  },

  SetSearchContent(state: State, value: string) {
    state.searchContent = value;
  },

  ToggleMilestonesList(state: State, value: boolean) {
    mutations.OpenDialog(state, "MilestonesList");
  },

  ToggleShowHelper(state: State, value: boolean) {
    if (value != null) state.showHelper = value;
    else state.showHelper = !state.showHelper;
  },

  OpenDialog(state: State, dialogName: string) {
    state.dialog.opened = true;
    state.dialog.name = dialogName;
  },

  CloseDialog(state: State) {
    state.dialog.opened = false;
  },

  SetCurrentLanguage(state: State, language: "en" | "zh") {
    if (language == null || language.length <= 0) {
      throw new Error("Cannot set language with invalid data");
    }
    net.peferences.setValue("lang", language)
    state.selectedLanguage = language;
  }
};

const getters = {
  isMac() {
    return false
  },

  isProjectOpened(state: State) {
    return state.openedProjectId != -1;
  },

  appColor(state: State) {
    return state.baseColor;
  },

  textColor(state: State) {
    return state.textColor;
  },

  darkenToolbar(state: State) {
    return state.darkenToolbar;
  },

  isDarkMode(state: State) {
    return state.darkMode;
  },

  drawerWidth(state: State) {
    return state.drawerWidth;
  },

  isFirstTimeUse(state: State) {
    return state.firstTimeUse;
  },

  projectTags(state: State) {
    if (state.openedProjectId < 0) {
      throw new Error("A project must be opened to get its categories");
    }
    return [] // net.project.getById(state.openedProjectId)?.categories;
  },

  currentProjectOld(state: State) {
    return (context: any) => context.$store.getters.getProjectById(state.openedProjectId);
  },


  isShowSearch(state: State) {
    return false
  },

  searchContent(state: State) {
    return state.searchContent;
  },

  openedProjectId(state: State) {
    return state.openedProjectId;
  },

  defaultPath(state: State) {
    return ""
  },

  currentMilestoneId(state: State) {
    return state.currentMilestoneId;
  },

  isShowHelper(state: State) {
    return state.showHelper;
  },

  projectName(state: State) {
    return state.projectName;
  },

  selectedLanguage(state: State) {
    return state.selectedLanguage;
  },

  isDialogOpened(state: State) {
    return state.dialog.opened;
  },

  dialogComponent(state: State) {
    return state.dialog.name;
  }
};

const actions = {
  ToggleDialog(context: any, dialogName: string) {
    context.commit("OpenDialog", dialogName);
  },

  CloseDialog(context: any) {
    context.commit("CloseDialog");
  },

  RemoveTag(context: any, tag: any) {
    context.commit("RemoveTag", tag);
  },

  AddTag(context: any, tag: any) {
    context.commit("AddTag", tag);
  },

  SetProjectMilestone(context: any, data: any) {
    context.commit("UpdateProjectMilestoneId", data);
    context.commit("SetCurrentMilestoneId", data.milestoneId);
    context.commit("UpdateNotes", data);
  },

  CreateMilestone(context: any, data: any) {
    context.commit("CreateMilestone", data);
  },

  SetupApplication(context: any, data: any) {
    context.commit("SetupApplication", data);
    context.commit("DisableFirstTimeUse");
  },

  SetCurrentLanguage(context: any, language: string) {
    context.commit("SetCurrentLanguage", language);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
