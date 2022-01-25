<template>
    <v-container>
        <Participants />
    </v-container>
</template>

<script>
import Vue from "vue";
import Participants from "@/components/Participants/Participants"

export default Vue.extend({
    name: "AllParticipants",
    components: {
        Participants
    }
})
</script>