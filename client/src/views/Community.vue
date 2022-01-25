<template>
    <v-container>
        <v-btn color="event" style="float: right;" @click="dialog = true">Create New Community <v-icon>mdi-plus-circle</v-icon></v-btn>
        <v-row>
            <v-col cols="4" md="4" v-for="(community, index) in communities" :key="index">
                <v-card>
                    <v-img :src="community.thumbnail" height="200px"></v-img>
                    <v-card-title> {{ community.name }} </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <router-link :to="`/community/${community.docId}`"
                        ><v-icon color="primary" class="mr-2">mdi-eye</v-icon></router-link
                        >
                        <v-icon color="event" class="mr-2"
                        >mdi-pencil</v-icon
                        >
                        <v-icon
                        color="red"
                        class="mr-2"
                        >mdi-delete</v-icon
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-dialog v-model="dialog" max-width="340" persistent>
                <v-card>
                    <v-card-title class="headline"> Create New Community </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="name"
                            label="Community Name"
                            outlined
                            dense
                            class="mt-2"
                            prepend-icon="mdi-account-multiple"
                        ></v-text-field>
                        <template>
                            <v-file-input
                                v-model="thumbnail"
                                label="Community Thumbnail"
                                outlined
                            ></v-file-input>
                      </template>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="event darken-1" @click="create()">
                        Create
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>
<script>
import Vue from "vue";
import firebase from "firebase";
import { shortUser, userId } from "../services/short_user";

export default Vue.extend({
    name: "Community",
    data: () => ({
        dialog: false,
        userId: null,
        shortUser: [],
        name: null,
        thumbnail: null,
        communities: []
    }),
    created(){
        this.shortUser = shortUser[0],
        this.userId = userId

        firebase.firestore().collection("communities").where("userId", "==", userId).onSnapshot((snapshot) => {
            this.communities = []
            snapshot.forEach((document) => {
                this.communities.push(document.data())
            })
        })
    },
    methods: {
        create(){
            this.dialog = false;
            this.$store.dispatch("showDialog", true);
            const firebaseStorageRef = firebase
            .storage()
            .ref()
            .child(`Community/${Date.now()}_file`)
            .put(this.thumbnail);

            firebaseStorageRef.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.$store.dispatch("showProgress", progress);
                },
                (error) => {
                    this.$store.dispatch("showSnackbar", {
                        showing: true,
                        text: error.message,
                        color: "error",
                    });
                    this.$store.dispatch("showDialog", false);
                },
                async () => {
                    const link = await firebaseStorageRef.snapshot.ref.getDownloadURL();
                    const data = {
                        name: this.name,
                        userId: this.userId,
                        shortUser: this.shortUser,
                        thumbnail: link
                    }
                    firebase.firestore().collection("communities").add(data);

                    this.$store.dispatch("showSnackbar", {
                        showing: true,
                        text: "Community Created",
                        color: "event",
                    });
                })
                this.$store.dispatch("showDialog", false);
            }
        }
    })
</script>