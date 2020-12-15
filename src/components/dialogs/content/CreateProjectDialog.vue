<template>
  <v-card class="create-project">
    <Title content="项目设置"/>
    <div class="create-project__container">
      <div step="1" class="create-project__stepper">
        <div class="create-project__stepper__content">
          <div>
            <!-- title -->
            <v-text-field
              class="create-project__title"
              :color="appColor"
              :label="$lang.Get('title')"
              outlined
              dense
              v-model="input.title"
              :rules="value => !!value || 'Required.'"
            />
            <!-- editor -->
            <div> 
              <v-card class="elevation-2" style="border-radius: 0" light>
                <div id="toolbar">
                  <div id="editor" style="height: 180px">
                  </div>
                </div>
              </v-card>
            </div>
            <!-- category input -->
            <v-text-field
              class="create-project__category"
              :color="appColor"
              label="Categories"
              placeholder="Input a new category and enter"
              append-icon="mdi-backburger"
              outlined
              dense
              v-model="input.category"
              @keyup="e => e.keyCode === 13 && addCategory()"
            />


            <!-- chips -->
            <div> 
              <v-chip 
                small 
                v-for="(cat, i) in input.categories"
                :key="i"
              >{{cat}}</v-chip>
            </div>
            <!-- folder selector -->
            <!-- <div class="create-project__folder-input ">
              <v-btn
                :color="appColor"
                @click="selectFolder"
                class="create-project__folder-input__button"
              >选择文件夹</v-btn>
              <div>
            </div> -->
            <!-- action button -->
            <div style="width: 100%; display: flex; flex-direction: row-reverse;">
              <v-btn text :disabled="isDisabled" :color="appColor" @click="createProject">
                创建项目
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Quill from "quill";
import { Category, Project } from "../../../core/Data";
import Title from "@/components/dialogs/utils/Title.vue";
import { CreateElement } from "vue/types/umd";
import { Getter } from "vuex-class";

// User input for the Dialog.
class Input {
  public title = "";
  public description = "";
  public category = "";
  public categories = ["TODO", "In Progress", "Done"];
  public selectedFolder = "";

  public flush() {
    this.categories.push(this.category)
    this.category = ""
  }

  public get isDisabled() {
    return this.title.length === 0  ||
      this.categories.length === 0 ||
      this.selectedFolder.length === 0
  }
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
  @Getter('appColor') appColor!: string;
  
  addCategory() {
    this.input.flush()
  }

  mounted() {
    if (document.querySelector("#editor")) {
      // Setup QUILL
      const options = {
        modules: {
          toolbar: [
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ direction: "rtl" }], // text direction
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["clean"] // remove formatting button
          ]
        },
        placeholder: "Description of your project...",
        theme: "snow" // or 'bubble'
      };
      this.editor = new Quill("#editor", options);
    }
  }
  
  createProject() {
    const categories = this.input.categories.map(cat => 
        new Category(cat.replace(/ /g, "_").toLowerCase(), cat, false)
        )

    this.$store.dispatch("CreateObject", 
      new Project(this.input.title, document.getElementsByClassName('ql-editor')[0].innerHTML, categories, this.input.selectedFolder))
    this.$store.dispatch("CloseDialog")
  }

}
</script>


<style lang="scss" scoped>
.create-project {
  $element-spacing: 15px;

  &__container {
    height: 100%;
    padding: 20px;
  }

  &__category {
    margin-top: $element-spacing;
  }

  &__stepper {
    height: 87%;
    &__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__folder-input {
    width: 100%;
    padding-top: $element-spacing;
    display: flex;

    &__button {
      border-radius: 0;
    }

    &__desc {
      margin-top: 5px;
      padding-left: 20px;
    }
  }
}
</style>