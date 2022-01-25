<template>
    <v-container>
        <v-tabs
            v-model="tab"
            background-color="event"
            centered
            dark
            icons-and-text
            >
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#tab-1">
                Share with sparticipants
                <v-icon>mdi-playlist-check</v-icon>
            </v-tab>
            <v-tab href="#tab-2">
                Share with Community
                <v-icon>mdi-account-multiple</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                :key="1"
                value="tab-1"
            >
            <v-btn class="mt-5" color="event">Click here to share<v-icon>mdi-share</v-icon></v-btn>
                    <!-- <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        show-select
                    ></v-text-field>
                    <v-data-table
                    :headers="pHeader"
                    :items="participants"
                    :search="search"
                    ></v-data-table> -->
            </v-tab-item>
            <v-tab-item
                :key="2"
                value="tab-2"
            >
            <v-checkbox
                v-for="(community, index) in communities"
                v-model="community.index"
                :key="index"
                :label="community"
                ></v-checkbox>

            <v-btn class="mt-5" color="event">Share<v-icon>mdi-share</v-icon></v-btn>

            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
import firebase from "firebase";
import { shortUser, userId } from "../../services/short_user";

export default {
    name: "ShareEvent",
    data: () => ({
        tab: null,
        search: null,
        participants: [],
        communities: [],
        shreEventData: {},
        pHeader: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Designation', value: 'designation' },
          { text: 'Organization', value: 'organization' },
          { text: 'Email Address', value: 'email' },
          { text: 'Mobile Number', value: 'mobile' },
        ],
    }),
    created(){
        firebase.firestore().collection("participants").where("userId", "==", userId).onSnapshot((snapshot) => {
            snapshot.forEach((document) => {
                this.participants.push(document.data())
                console.log(document.data())
            })
        })

        firebase.firestore().collection("communities").doc(userId).onSnapshot((snapshot) => {
            this.communities.push(snapshot.data())
            console.log(snapshot.data())
        })
    }

}
</script>