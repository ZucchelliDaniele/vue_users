<template>
  <v-card
    class="mx-auto"
    max-width="344"
    title="User Registration"
  >
    <v-container>
      <v-text-field
        v-model="customerName"
        color="primary"
        :rules="[required]"
        label="Customer Name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="contactFirstName"
        color="primary"
        :rules="[required]"
        label="Contact FirstName"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="contactLastName"
        color="primary"
        :rules="[required]"
        label="Contact LastName"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="phone"
        color="primary"
        :rules="[required]"
        label="Phone"
        variant="underlined"
      ></v-text-field>
      
      <v-text-field
        v-model="addressLine1"
        color="primary"
        :rules="[required]"
        label="AddressLine1"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="addressLine2"
        color="primary"
        :rules="[required]"
        label="AddressLine2"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="city"
        color="primary"
        :rules="[required]"
        label="City"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="state"
        color="primary"
        :rules="[required]"
        label="State"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="postalCode"
        color="primary"
        :rules="[required]"
        label="Postal Code"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="country"
        color="primary"
        :rules="[required]"
        label="Country"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="salesRepEmployeeNumber"
        color="primary"
        :rules="[required]"
        label="SalesRepEmployeeNumber"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="creditLimit"
        color="primary"
        :rules="[required]"
        label="CreditLimit"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        :rules="[required]"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        :rules="[required]"
        type="password"
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

    <v-card-actions @click="register">
      <v-spacer></v-spacer>

      <v-btn color="success">
        Complete Registration

        <v-icon icon="mdi-chevron-right"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<!-- customerName, contactLastName, contactFirstName,
phone, addressLine1, addressLine2, city, state,
postalCode, country, salesRepEmployeeNumber,
creditLimit, email, hashedPwd -->

<script>
import { mapMutations } from 'vuex';
  export default {
    data: () => ({
      customerName: null,
      contactLastName: null,
      contactFirstName: null,
      phone: null,
      addressLine1: null,
      addressLine2: null,
      city: null,
      state: null,
      postalCode: null,
      country: null,
      salesRepEmployeeNumber: null,
      creditLimit: null,
      email: null,
      password: null,
      terms: false
    }),
    methods: {
      ...mapMutations(["setUser", "setToken"]),
        async register(e) {
          console.log("customerName: ",this.customerName)
          console.log("contactLastName: ",this.contactLastName)
          console.log("contactFirstName: ",this.contactFirstName)
          console.log("phone: ",this.phone)
          console.log("addressLine1: ",this.addressLine1)
          console.log("addressLine2: ",this.addressLine2)
          console.log("city: ",this.city)
          console.log("state: ",this.state)
          console.log("postalCode: ",this.postalCode)
          console.log("country: ",this.country)
          console.log("salesRepEmployeeNumber: ",this.salesRepEmployeeNumber)
          console.log("creditLimit: ",this.creditLimit)
          console.log("email: ",this.email)
          console.log("password: ",this.password)
          console.log("terms: ",this.terms)
          if(this.customerName !="" && this.contactLastName !="" && this.contactFirstName != "" && this.phone !="" && this.addressLine1 !="" && this.addressLine2 !="" && this.city !="" && this.state !="" && this.postalCode !="" && this.country !="" && this.salesRepEmployeeNumber !="" && this.creditLimit !="" && this.email !="" && this.password !="" && this.terms == true) {
            e.preventDefault();
            const salt = 'paleocapa';
            let pwd = this.password
            const hashedPwd = this.$CryptoJS.SHA256(pwd + salt).toString();
            console.log(hashedPwd)
            const response = await fetch("http://localhost:3000/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customerName: this.customerName,
                contactLastName: this.contactLastName,
                contactFirstName: this.contactFirstName,
                phone: this.phone,
                addressLine1: this.addressLine1,
                addressLine2: this.addressLine2,
                city: this.city,
                state: this.state,
                postalCode: this.postalCode,
                country: this.country,
                salesRepEmployeeNumber: this.salesRepEmployeeNumber,
                creditLimit: this.creditLimit,
                email: this.email,
                password: this.password
              }),
            });
            const { user, token } = await response.json();
            this.setUser(user);
            this.setToken(token);
            this.$router.push("/about");
          }
          else {
            console.log("not ok")
          }
        },
      agreed (v) {
        return !!v || 'Agree is required'
      },
      required (v) {
        return !!v || 'Field is required'
      },
    }
  }
</script>