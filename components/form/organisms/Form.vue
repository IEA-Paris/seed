<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-form v-model="valid">
          <div id="container">
            <template v-for="(input, key, index) in form">
              <FormOrganismsRecursiveFormblock
                :input="input"
                :type="type"
                :level="[key]"
                :saving="saving"
                :rootIndex="index"
              ></FormOrganismsRecursiveFormblock>
            </template>
          </div>
          <v-btn
            :disabled="valid !== true || saving"
            :loading="saving"
            color="success"
            class="d-flex ml-auto"
            prepend-icon="mdi-content-save"
            @click.stop="save"
            v-if="!saving"
          >
            {{ $t("save") }}
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script async setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  type: {
    type: String,
    required: true,
    default: () => {
      return ""
    },
  },
})
const valid = ref(false)
const saving = ref(false)
const save = async () => {
  if (valid) {
    saving = true
    rootStore.save(props.type)
  }
}

const form = (await import(`../../../data/${props.type}.ts`))?.default?.form

onMounted(() => {})
</script>
