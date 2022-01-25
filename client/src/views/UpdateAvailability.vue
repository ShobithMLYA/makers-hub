<template>
    <v-container>
        <UpdateSpeakerAvailability />
    </v-container>
</template>

<script>
import Vue from "vue";
import UpdateSpeakerAvailability from "@/components/Speaker/UpdateSpeakerAvailability"

export default Vue.extend({
    name: "UpdateAvailability",
    components: {
        UpdateSpeakerAvailability
    }
})
</script>