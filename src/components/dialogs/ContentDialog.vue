<template>
<v-row justify="center">
  <v-dialog :persistent="isPersistent" overlay-opacity="0.5" :value="isDialogOpened" @change="v => !v && hide" max-width="600px">
    <component :is="dialogComponent" />
  </v-dialog>
  <v-row justify="center">
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dialogs } from "@/core/Constants";
import { Getter } from "vuex-class";

@Component({})
export default class ContentDialog extends Vue {
  @Getter("isDialogOpened") isDialogOpened!: boolean;

  hide() {
    this.$store.dispatch("CloseDialog");
  }

  private get isPersistent() {
    return false; // this.dialogComponent === Dialogs.EditNote;
  }

  private get dialogComponent() {
    return this.$store.getters.dialogComponent;
  }
}
</script>

<style lang="scss" scoped></style>
