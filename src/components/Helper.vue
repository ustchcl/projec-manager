<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      :width="600"
      persistent
    >
      <v-card>
        <v-card-title dark primary-title class="headline justify-center">
          {{$lang.Get("helperTitle")}}
        </v-card-title>
        <v-card-text class="text-xs-left">
          <div>
            <div
              v-for="(item, i) in shortcuts"
              :key="i"
              class="helper__item"
            >
              <strong>{{item.key}}</strong>
              <div>{{item.description}}</div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn @click="close" color="primary" text>{{$lang.Get("close")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component
export default class Helper extends Vue {
  private dialog = true;
  private shortcuts = [
    {
      key: "CTRL+D",
      description: "Show/Hide the helper page."
    },
    {
      key: "CTRL+F",
      description: "Show/Hide the search bar."
    },
    {
      key: "CTRL+L",
      description: "Show the milestones list."
    },
    {
      key: "CTRL+N",
      description: "Create a new Note."
    }
  ]

  close() {
    this.$store.commit("ToggleShowHelper")
  }
}
</script>

<style lang="scss" scoped>
.helper {
  &__item {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 10px 0 10px 0;
    div {
      padding: 0 20px 0 20px;
    }
  }
}
</style>