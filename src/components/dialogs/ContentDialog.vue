<template>
  <v-row justify="center">
    <v-dialog
      :persistent="isPersistent"
      overlay-opacity="0.5"
      v-model="visible"
      :max-width="600"
    >
      <component :is="dialogComponent" />
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dialogs } from "@/core/Constants";
import { Getter } from "vuex-class";

@Component({})
export default class ContentDialog extends Vue {
  @Getter("isDialogOpened") isDialogOpened!: boolean;

  get visible() {
    return this.isDialogOpened
  }

  set visible(v: boolean) {
    this.$store.dispatch("CloseDialog");
  }

private get isPersistent() {
    return this.dialogComponent === Dialogs.EditNote;
  }

  private get dialogComponent() {
    return this.$store.getters.dialogComponent;
  }
}
</script>

<style lang="scss" scoped></style>
