<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" class="success">
        Add new project
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        <h2>Add a new project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3 py-2" ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            prepend-icon="mdi-folder"
            :rules="inputRules"
          ></v-text-field>
          <v-textarea
            label="Information"
            v-model="info"
            :rules="inputRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>

          <v-menu>
            <template v-slot:activator="{ on, attrs }" :rules="inputRules">
              <v-text-field
                :value="formattedDate"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="inputRules"
              ></v-text-field>
            </template>
            <v-date-picker v-model="due" @input="menu = false"></v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" :loading="loading" text @click="submit()">
          ADD</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { format, parseISO } from "date-fns";
import db from "@/fb";

export default {
  data() {
    return {
      dialog: false,
      title: "",
      info: "",
      due: null,
      menu: false,
      inputRules: [
        (v) => (v != null && v.length >= 3) || "Minimum length is 3 characters",
      ],
      dateRules: [(d) => d.length >= 8 || "Set the date!!"],
      loading: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        //db .push({ title: this.title, info: this.info, due: this.due });
        const project = {
          title: this.title,
          content: this.info,
          due: this.formattedDate,
          person: "The net Ninja",
          status: "ongoing",
        };

        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            console.log("Added to Firestore DB");
            this.$emit('projectAdded', project);
            this.clearForm();
            this.dialog = false;
          });
      } else {
        console.log("Form invalid!");
      }
    },
    clearForm() {
      this.title = this.info = "";
      this.due = null;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  computed: {
    formattedDate() {
      console.log(this.due);
      /*if (this.due != null) {
        const [year, month, day] = this.due.split("-");
        let fdt = `${month}/${day}/${year}`;
        console.log(fdt);
        let dt = fdt//this.due ? format(fdt, "dd/MM/YYYY") : "";
        console.log(dt);
        return String(dt);
      }
      return "";*/
      return this.due ? format(parseISO(this.due), "EEEE, MMMM do yyyy") : "";
    },
  },
};
</script>