<template>
  <v-card class="import-project">
    <div class="import-project__title font-weight-light">导入项目</div>
    <div class="import-project__container">
      <v-file-input
        show-size
        truncate-length="15"
        @change="onChange"
      ></v-file-input>
    </div>
    <div class="import-project__actions">
      <v-btn @click="importProject" text right :color="color">导入</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";
import { Getter } from "vuex-class";
import * as net from "@/core/Network"


@Component
export default class ImportProjectDialog extends Vue {
  @Getter('appColor') color!: string;
  projectJson = "{}"
  fileReader = new FileReader();

  mounted() {
    this.fileReader.onload = () => {
      this.projectJson = this.fileReader.result as string
    }
  }

  importProject() {
    const json = JSON.parse(this.projectJson);
    net.project.create(json.title, json.description)
  }

  onChange(file: File) {
    if (!file) {
      return;
    }
    this.fileReader.readAsText(file, "utf-8");
  }



}
</script>

<style lang="scss" scoped>
.import-project {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__title {
    padding: 20px;
    font-size: 1.1em;
  }

  &__container {
    padding: 20px;
  }

  &__actions {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>