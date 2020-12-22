<template>
  <div id="container">
    <content-dialog-vue/>
    <!-- <div class="landing-page__dialogs">
      <component :is="currentDialog" />
    </div> -->
    <div id="side" :style="{ backgroundColor: color, color: textColor }">
      <Drawer />
    </div>
    <div id="content">
      <SearchBar v-if="showSearch" />
      <Helper v-if="showHelper" />
      <FirstUse v-if="firstTimeUse"></FirstUse>
      <Projects v-else-if="!isProjectOpened" />
      <Notes v-else />
    </div>
    <!-- The titlebar needs to be on top of the other divs, so it's the last one to be rendered. -->
    <Titlebar/>
  </div>
</template>

<script lang="ts">
import Helper from "./Helper.vue";
import AppManager from "@/core/ApplicationManager";
import InputManager from "@/core/InputManager";

import Titlebar from "./Titlebar.vue";
import Notes from "./notes/Notes.vue";
import Drawer from "./drawer/Drawer.vue";
import Projects from "./projects/Projects.vue";
import FirstUse from "./Temp/FirstUse.vue";
import SearchBar from "./SearchBar.vue";
import ContentDialogVue from "./dialogs/ContentDialog.vue";
import { Vue, Component } from "vue-property-decorator"
import { Getter } from 'vuex-class';
import { Dialogs } from '@/core/Constants';

@Component({
  name: 'landing-page',
  components: {
    Titlebar,
    FirstUse,
    Projects,
    Notes,
    Drawer,
    SearchBar,
    Helper,
    ContentDialogVue
  },
})
export default class LandingPage extends Vue {
  @Getter("isProjectOpened") isProjectOpened!: boolean;
  @Getter("isFirstTimeUse") firstTimeUse!: boolean;
  @Getter("appColor") color!: string;
  @Getter("textColor") textColor!: string;
  @Getter("isShowSearch") showSearch!: boolean;
  @Getter("isShowHelper") showHelper!: boolean;
  @Getter("isLogin") isLogin!: boolean;

  get currentDialog() {
    return "dialog-create-project";
  }
  mounted() {
    AppManager.setupLandingPage(
      "30",
      "container",
      "side",
      "content"
    );
    InputManager.initialize(this);
  }

  async init() {
    if (this.isLogin) {
      this.$store.dispatch("getProjects")
    } else {
      this.$store.dispatch("ToggleDialog", Dialogs.Login);
    }
  }
}
</script>

<style lang="scss" scoped>
.landing-page {
  &__dialogs {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }
}

#side {
  overflow-y: auto;
  overflow-x: hidden;
}

#content {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
