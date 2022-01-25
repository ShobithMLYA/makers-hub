<template>
    <v-container>
        <Register />
    </v-container>
</template>

<script>
import Vue from "vue";
import Register from "@/components/Events/Register"

export default Vue.extend({
    name: "EventRegister",
    components: {
        Register
    }
})
</script>