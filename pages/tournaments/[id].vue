<script setup lang="ts">
import {useTournamentEditStore} from "~/stores/tournaments/edit";
import {useSelectStore} from "~/stores/select";

const selectStore = useSelectStore();
const tournamentStore = useTournamentEditStore();
const id = useRoute().params.id;

await tournamentStore.fetchModel(id);

onMounted(async () => {
  await selectStore.fetchTournamentStatuses();
})
</script>

<template>
  <ViewsTournamentForm
      :store="tournamentStore"
      :selectStore="selectStore"
  >
    <v-btn
        @click="tournamentStore.deleteModel(id)"
        :loading="tournamentStore.loading"
        color="error"
        type="button"
        variant="tonal"
        :text="$t('delete')"
    />
    <v-btn
        @click="tournamentStore.updateModel(id)"
        :loading="tournamentStore.loading"
        color="success"
        type="button"
        variant="tonal"
        :text="$t('update')"
    />
  </ViewsTournamentForm>
</template>