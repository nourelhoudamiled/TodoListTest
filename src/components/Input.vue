<template>
  <v-text-field
    v-model="message"
    @keydown.enter.native="addList"
    label="tapez ici"
    clearable
    :readonly="disabled"
  ></v-text-field>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "InputComponent",
  props: {
    keydown: Boolean,
    text: String,
    id: Number,
     disabled: Boolean,
  },
  data() {
    return {
      message: null,
    };
  },

  methods: {
    ...mapActions(["addToList", "changeBol"]),
    async addList() {
      if (this.keydown == true) {
        if (this.message) {
          await this.addToList({ message: this.message, disabled: false });
        }
      } else {
        this.changeBol({ bol: false, id: this.id , message: this.message });
      }
    },
  },
  mounted() {
    this.message = this.text;
  },
};
</script>
