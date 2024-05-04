<script setup lang="ts">
import moment from 'moment';

const model = defineModel({default: null, type: String});
const emit = defineEmits(['update:modelValue']);
defineProps({
  label: {
    type: String,
    default: 'Date',
  },
})

const hours_items = Array.from({length: 24}, (_, i) => {
  return {value: i, title: i.toString().padStart(2, '0')}
});
const minutes_items = Array.from({length: 60}, (_, i) => {
  return {value: i, title: i.toString().padStart(2, '0')}
});

const _date = new Date(model.value)

const hours = ref(_date.getHours());
const minutes = ref(_date.getMinutes());
const seconds = ref(_date.getSeconds());

const selectedDate = ref(_date);
const formatDate = computed(() => {
  return selectedDate.value ? moment(selectedDate.value).format('YYYY-MM-DD') + ' ' + hours.value.toString().padStart(2, '0') + ':' + minutes.value.toString().padStart(2, '0') + ':' + seconds.value.toString().padStart(2, '0') : '';
})

const apply = () => {
  emit('update:modelValue', (new Date(formatDate.value)).toISOString());
}
</script>

<template>
  <v-dialog max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-text-field
          :label="label"
          v-bind="activatorProps"
          variant="outlined"
          append-inner-icon="mdi-calendar"
          :model-value="formatDate"
          density="compact"
          hide-details
          style="min-width: 215px"
      />
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text>
          <v-date-picker v-model="selectedDate" class="w-100"></v-date-picker>
          <div class="d-flex ga-3">
            <v-select
                v-model="hours"
                :items="hours_items"
                variant="outlined"
                density="compact"
                placeholder="00"
            ></v-select>
            <v-select
                v-model="minutes"
                :items="minutes_items"
                variant="outlined"
                density="compact"
                placeholder="00"
            ></v-select>
            <v-select
                v-model="seconds"
                :items="minutes_items"
                variant="outlined"
                density="compact"
                placeholder="00"
            ></v-select>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              :text="'close'"
              @click="isActive.value = false"
          ></v-btn>
          <v-btn
              :text="'apply'"
              @click="apply(); isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>