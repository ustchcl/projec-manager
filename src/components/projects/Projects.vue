<template>
  <div class="app-projects">
    <v-layout row wrap>
      <v-flex offset-xs2 xs8 v-for="(project, i) in projects" :key="i">
        <Project :project="project" />
      </v-flex>
    </v-layout>
  </div>
</template>
<script lang="ts">
import Project from "./Project.vue";
import AppManager from "@/core/ApplicationManager";
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component({
  components: {
    Project,
  },
  name: "projects",
})
export default class extends Vue {
  @Getter("projects") projects!: any[];
  @Getter("isDarkMode") isDarkMode!: boolean;
  @Getter("createProject") createProjectDialog!: string;

  get color() {
    if (this.isDarkMode) return "";
    return "grey lighten-2";
  }

   mounted() {
    AppManager.setupProjectsPage("container");
  }
}
</script>

<style lang="scss" scoped>
$grey-lighten-3: #eeeeee;
.app-projects {
  width: 100%;
  height: 100%;
  background: $grey-lighten-3;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
