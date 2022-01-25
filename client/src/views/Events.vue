<template>
    <v-container>
        <v-card>
            <v-tabs
                v-model="tab"
                background-color="event"
                dark
                fixed-tabs
                icons-and-text
                >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1">
                    All Events
                    <v-icon>mdi-playlist-check</v-icon>
                </v-tab>
                <v-tab href="#tab-2">
                Create Event
                    <v-icon>mdi-calendar-plus</v-icon>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item
                    :key="1"
                    value="tab-1"
                >
                    <AllEvents />
                </v-tab-item>
                <v-tab-item
                    :key="2"
                    value="tab-2"
                >
                    <CreateEvent />
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import Vue from 'vue';
import AllEvents from "./AllEvents";
import CreateEvent from "./CreateEvent";

export default Vue.extend({
    name: "Events",
    components: {
        AllEvents,
        CreateEvent
    },
    data: () => ({
        tab: null
    })
})
</script>
<style>
.v-sheet.v-card{
    border-radius: 20px !important;
}

thead .text-start{
    color: #20D855 !important;
    text-transform: uppercase;
}

/* .v-tab{
  text-transform: capitalize !important;
} */
</style>