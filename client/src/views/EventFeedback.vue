<template>
    <v-container>
        <Feedback />
    </v-container>
</template>

<script>
import Vue from "vue";
import Feedback from "@/components/Events/Feedback"

export default Vue.extend({
    name: "EventRegister",
    components: {
        Feedback
    }
})
</script>