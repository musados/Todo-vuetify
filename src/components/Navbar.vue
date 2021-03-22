<template>
  <nav>
    <v-snackbar v-model="snackbar" top :timeout="4000" color="success">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-app-bar text app class="primary lighten-1">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <span class="warning--text">Sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>

      <v-menu offset-y bottom left transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon text v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            text
            link
            v-for="link in links"
            :key="link.route"
            router
            :to="link.route"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app class="primary" v-model="drawer">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/avatar-1.png" alt="" />
          </v-avatar>
          <p class="white--text subheading mt-1">The Net Ninja</p>
        </v-flex>
        <v-flex class="mt-5 mb-3">
          <Popup @projectAdded="showSnackbar" />
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                link.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import Popup from "./Popup";
export default {
  setup() {},
  components: {
    Popup,
  },

  data() {
    return {
      drawer: false,
      group: "Main",
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My projects", route: "/projects" },
        { icon: "mdi-account-multiple", text: "Team", route: "/team" },
      ],
      snackbarText: "",
      snackbar: false,
    };
  },
  methods: {
    showSnackbar(e) {
        if(e != null){
            this.snackbarText = e.title + " added successfuly!";
            this.snackbar = true;
        }
    },
  },
};
</script>
