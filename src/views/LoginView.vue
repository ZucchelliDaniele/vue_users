<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form
        v-model="form"
        @submit.prevent="login"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          type="password"
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapMutations } from 'vuex';
  export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
    }),

    methods: {
      ...mapMutations(["setUser", "setToken"]),
        async login(e) {
          if (!this.form) return

        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
          e.preventDefault();
          const salt = 'paleocapa';
          const mail = this.email
          let pwd = this.password
          const hashedPwd = this.$CryptoJS.SHA256(pwd + salt).toString();
          console.log(hashedPwd)
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: mail,
              password: hashedPwd
            }),
          });
          const { user, token } = await response.json();
          this.setUser(user);
          this.setToken(token);
          this.$router.push("/about");
        },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
</script>