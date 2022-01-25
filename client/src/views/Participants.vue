<template>
    <v-container>
        <v-card>
            <v-tabs
                v-model="tab"
                background-color="event"
                fixed-tabs
                dark
                icons-and-text
                >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1">
                    All Participants
                    <v-icon>mdi-playlist-check</v-icon>
                </v-tab>
                <v-tab href="#tab-2">
                    Add New Participant
                    <v-icon>mdi-calendar-plus</v-icon>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item
                    :key="1"
                    value="tab-1"
                >
                    <AllParticipants />
                </v-tab-item>
                <v-tab-item
                    :key="2"
                    value="tab-2"
                >
                     <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="participant.name"
                        label="Name"
                        outlined
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                     <v-col cols="12" sm="6" md="6">
                      <v-select
                            v-model="participant.community"
                            :items="communities"
                            label="Add to Community"
                            persistent-hint
                            outlined
                            prepend-icon="mdi-account"
                            @change="showAddNewDialog"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="participant.designation"
                        label="Designation"
                        outlined
                        prepend-icon="mdi-school"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="participant.organization"
                        label="Role"
                        outlined
                        prepend-icon="mdi-bank"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="participant.email"
                        label="Email Address"
                        outlined
                        prepend-icon="mdi-email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="participant.mobile"
                        label="Mobile Number"
                        outlined
                        prepend-icon="mdi-phone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="participant.mobile"
                        label="Linked In"
                        outlined
                        prepend-icon="mdi-linkedin"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-btn color="event" @click="addNewSpeaker">
                            Add Participant
                            <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import Vue from 'vue';
import AllParticipants from "./AllParticipants";

export default Vue.extend({
    name: "Events",
    components: {
        AllParticipants,
    },
    data: () => ({
        tab: null,
        participant: {
            name: null,
            designation: null,
            organization: null,
            email: null,
            mobile: null,
            community: null,
            totalEvents: 0,
            shortUser: null,
            userId: null,
        },
    })
})
</script>
<style>
.v-sheet.v-card{
    border-radius: 20px !important;
}
</style>