<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">

      <v-layout row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text v-bind="attrs" v-on="on" color="grey" @click="sortBy('title')" slot="activator">
              <v-icon left small>mdi-folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort the project by their titles</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text v-bind="attrs" v-on="on" color="grey" @click="sortBy('person')">
              <v-icon left small>mdi-folder</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>Sort the project by person name</span>
        </v-tooltip>
      </v-layout>

      <v-card text class="pa-3" v-for="project in projects" :key="project.title" >
        <v-layout row  :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{project.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${project.status} white--text my-2 caption`">{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
          <v-divider></v-divider>
      </v-card>
    </v-container>
    
  </div>
</template>

<script>
import db from '@/fb'

export default {
  watch: {
  },
  name: 'Dashboard',
  components: {
  },
  data(){
    return{
      projects:[]
        
        /*{title: 'Design a new website', person: 'The bet ninja', due: '1st Jan 2021', status: 'ongoing', content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit corporis pariatur hic quos deserunt! Dicta praesentium excepturi voluptate aspernatur voluptates incidunt nostrum a nam amet deleniti, nihil molestiae quas facere."},
        {title: 'Code up the home page', person: 'Chun Li', due: '10th Jan 2021', status: 'completed', content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit corporis pariatur hic quos deserunt! Dicta praesentium excepturi voluptate aspernatur voluptates incidunt nostrum a nam amet deleniti, nihil molestiae quas facere."},
        {title: 'Video designing', person: 'The net ninja', due: '1st May 2021', status: 'completed', content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit corporis pariatur hic quos deserunt! Dicta praesentium excepturi voluptate aspernatur voluptates incidunt nostrum a nam amet deleniti, nihil molestiae quas facere."},
        {title: 'Vuetify data list', person: 'Dossi Tall', due: '1st April 2021', status: 'overdue', content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit corporis pariatur hic quos deserunt! Dicta praesentium excepturi voluptate aspernatur voluptates incidunt nostrum a nam amet deleniti, nihil molestiae quas facere."},
      */
    }
  },
  created(){
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if(change.type === 'added'){
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  },
    methods:{
    sortBy(prop){
      this.projects.sort((a, b) => (String(a[prop]).toLowerCase() < String(b[prop]).toLowerCase() ? -1 : 1));
    }
  }
}
</script>

<style scoped>
.project.completed{
  border-left: 4px solid #3cd1c2;
}
.project.ongoing{
  border-left: 4px solid orange;
}
.project.overdue{
  border-left: 4px solid tomato;
}
.v-chip.completed{
  background: #3cd1c2 !important;
}
.v-chip.ongoing{
  background: #ffaa2c !important;
}
.v-chip.overdue{
  background: #f83e70 !important;
}
</style>
