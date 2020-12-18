<template>
    <v-card class="create-milestone">
        <title content="新建里程碑"/>
        <v-text-field
              class="create-milestone__title"
              :color="appColor"
              :label="$lang.Get('title')"
              outlined
              dense
              v-model="title"
              :rules="[value => !!value || 'Required.']"
            />
        
    </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Title from '@/components/dialogs/utils/Title.vue'


@Component({
    components: {
        Title
    }
})
export default class CreateMilestoneDialog extends Vue {
    title = ""
    description = ""
    deadline = Date.now()



}
</script>