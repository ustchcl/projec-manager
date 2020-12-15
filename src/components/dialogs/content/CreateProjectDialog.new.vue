<template></template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Quill from "quill";
import { Category, Project } from "../../../core/Data";
import Title from "../utils/Title.vue";
import { CreateElement } from "vue/types/umd";
import { Getter } from "vuex-class";

// User input for the Dialog.
class Input {
  public title: string = "";
  public description: string = "";
  public category: string = "";
  public categories: string[] = ["TODO", "In Progress", "Done"];
  public selectedFolder: string = "";
}

@Component({
  components: {
    Title,
  },
})
export default class CreateProjectDialog extends Vue {
  private editor: any = null;
  private input: Input = new Input();
  private readonly stepperId: string = "i";
  @Getter('appColor') appColir!: string;

  
}
</script>