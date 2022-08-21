<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <div v-if="selectComputed.length" class="text-truncate">
            <v-icon
              large
              @click="showDeleteDialog(selectComputed, true)"
              class="mr-10"
              color="pink"
            >
              mdi-delete
            </v-icon>
            <v-icon
              large
              @click="ConfirmeMessage(selectComputed, true)"
              class="mr-2"
              color="primary"
            >
              mdi-check
            </v-icon>
          </div>
        </v-card-title>
        <p v-show="dialogDelete == false && multiple == true" class="error">
          Rien a supprimer
        </p>
        <v-data-table
          :headers="headers"
          :items="getList"
          :search="search"
          show-select
          @input="enterSelect($event)"
        >
          <template v-slot:[`item.action`]="{ item }">
            <div class="text-truncate">
              <v-icon
                small
                class="mr-10"
                @click="showDeleteDialog(item, false)"
                color="pink"
                :disabled="item.disabled"
              >
                mdi-delete
              </v-icon>
              <v-icon
                small
                class="mr-2"
                @click="ConfirmeMessage(item, false)"
                color="primary"
              >
                mdi-check
              </v-icon>
            </div>
          </template>
          <template v-slot:[`item.message`]="{ item }">
            <!-- v-click-outside="onClickOutside(item)" -->
            <div>
              <div
                v-if="item.changeMessage === false && item.disabled === false"
                @dblclick="onClickInside(item)"
                class="text-truncate"
                style="width: 250px"
              >
                {{ item.message }}
              </div>
              <div v-else-if="item.disabled === false" style="width: 250px">
                <input-component
                  :keydown="false"
                  :text="item.message"
                  :id="item.id"
                  :disabled="item.disabled"
                >
                </input-component>
              </div>
              <div v-else>
                {{ item.message }}
              </div>
            </div>
          </template>
          <template v-slot:[`item.data-table-select`]="{ item }">
            <v-simple-checkbox
              v-model="item.selected"
              :disabled="item.disabled"
              :ripple="false"
            ></v-simple-checkbox>
          </template>
        </v-data-table>
        <!-- delete message -->
        <v-dialog v-model="dialogDelete" persistent max-width="500">
          <v-card>
            <v-card-title class="headline"
              >Êtes-vous sûr de supprimer ce message :
            </v-card-title>
            <v-card-text v-for="(item, index) in itemToDelete" :key="index">{{
              item.message
            }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeCard()">Close</v-btn>
              <v-btn color="primary" text @click="deleteItem()">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-app>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import input from "./Input.vue";

export default {
  name: "list-component",
  components: {
    "input-component": input,
  },
  data() {
    return {
      search: "",

      headers: [
        { text: "", value: "check" },
        {
          text: "Message",
          align: "left",
          value: "message",
        },
        { text: "Action", value: "action" },
      ],
      itemToDelete: [],
      dialogDelete: false,
      // changeMessage: false,
      select_list: [],
      multiple: false,
      selectedRows: [],
    };
  },
  computed: {
    ...mapGetters(["getList", "getBol", "getIdInput"]),
    selectComputed() {
      return this.getList.filter((item) => item.selected == true);
    },
  },
  watch: {
    getBol() {
      this.getList.map((item) => {
        if (item.id == this.getIdInput) {
          item.changeMessage = false;
        }
      });
    },
  },
  methods: {
    deleteItem() {
      this.itemToDelete.map((del) => {
        const index = this.getList.indexOf(del);
        this.getList.splice(index, 1);
      });
      this.dialogDelete = false;
      this.itemToDelete = [];
    },
    showDeleteDialog(item, isMultiple) {
      if (isMultiple) {
        this.multiple = isMultiple;
        item.map((i) => {
          if (i.disabled === false) {
            this.itemToDelete.push(i);
            this.dialogDelete = true;
          }
        });
      } else {
        this.itemToDelete.push(item);
        this.dialogDelete = true;
      }
      // setTimeout(() => (this.multiple = false), 1000);
    },
    onClickInside(item) {
      item.changeMessage = true;
    },
    onClickOutside(item) {
      item.changeMessage = false;
    },
    ConfirmeMessage(item, isMultiple) {
      if (isMultiple) {
        item.map((i) => {
          i.disabled = true;
        });
      } else {
        item.disabled = true;
      }
    },
    enterSelect(values) {
      if (values.length) {
        this.getList.map(function(value) {
          value.selected = true;
        });
      } else {
        this.getList.map(function(value) {
          value.selected = false;
        });
      }
    },
    closeCard() {
      this.dialogDelete = false;
      this.itemToDelete = [];
    },
  },
};
</script>
<style lang="scss">
.v-application .error {
  border: 1px solid;
  color: #ff5722;
  background-color: transparent !important;
}
</style>
