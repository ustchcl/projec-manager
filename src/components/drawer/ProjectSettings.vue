<template>
  <v-list dense class="pt-0 transparent" :dark="textColor === '#FFF'">
    <v-list-item v-for="item in items" :key="item.title" @click="item.action()">
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
import { mdiPlus, mdiDatabaseExport, mdiDatabaseImport, mdiCog, mdiLogin } from "@mdi/js";
import { Dialogs } from "../../core/Constants";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ProjectSettings extends Vue {
  items = [
    {
      title: (this as any).$lang.Get("newProject"),
      icon: mdiPlus,
      action: () => {
        this.$store.dispatch("ToggleDialog", Dialogs.CreateProject)
      }
    },
    {
      title: (this as any).$lang.Get("exportProject"),
      icon: mdiDatabaseExport,
      action: () => {
        this.$store.dispatch("ToggleDialog", Dialogs.ExportProject);
      },
    },
    {
      title: (this as any).$lang.Get("importProject"),
      icon: mdiDatabaseImport,
      action: () => {
        this.$store.dispatch("ToggleDialog", Dialogs.ImportProject);
      },
    },
    {
      title: (this as any).$lang.Get("settings"),
      icon: mdiCog,
      action: () => {
        this.$store.dispatch("ToggleDialog", Dialogs.AppSettings);
      },
    },
    {
      title:  "登录",
      icon: mdiLogin,
      action: () => {
        this.$store.dispatch("ToggleDialog", Dialogs.Login);
      },
    },
  ];

  get textColor() {
    return this.$store.getters.textColor;
  }
}
</script>

<style scoped></style>
