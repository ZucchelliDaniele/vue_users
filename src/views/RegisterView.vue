<template>
  <v-card
    class="mx-auto"
    max-width="344"
    title="User Registration"
  >
    <v-container>
      <v-text-field
        v-model="first"
        color="primary"
        :rules="[required]"
        label="First name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="last"
        color="primary"
        :rules="[required]"
        label="Last name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        :rules="[required]"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        :rules="[required]"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>

      <v-checkbox
        v-model="terms"
        color="secondary"
        :rules="[agreed]"
        label="I agree to site terms and conditions"
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions @click="login" :rules="[fields]">
      <v-spacer></v-spacer>

      <v-btn color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      first: null,
      last: null,
      email: null,
      password: null,
      terms: false,
    }),
    methods: {
      login() {
        console.log("Name: ",this.first)
        console.log("Cognome: ",this.last)
        console.log("email: ",this.email)
        console.log("Passwd: ",this.password)
        console.log("Terms: ",this.terms)
      },
      agreed (v) {
        return !!v || 'Agree is required'
      },
      fields (v) {
        return !!v || 'All fields are required'
      },
      required (v) {
        return !!v || 'Field is required'
      },
    }
  }
</script>