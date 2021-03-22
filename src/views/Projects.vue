<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in MyProjects" :key="project.title">
          <v-expansion-panel-header>{{ project.title }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="grey--text">{{ project.due }}</div>
            <div class="font-weight-light grey--text">{{ project.content }}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>
<script>
import db from '@/fb'

export default {
  watch: {},
  name: "Projects",
  components: {},
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (String(a[prop]).toLowerCase() < String(b[prop]).toLowerCase() ? -1 : 1));
    },
  },
  computed:{
    MyProjects(){
      return this.projects.filter(project => {
        return project.person.toLowerCase() === 'the net ninja'
      })
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
  }
};
</script>