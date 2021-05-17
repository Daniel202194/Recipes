<template>
  <div class="container">
    <div class="side">
    </div>
    <div class="register">
      <h1 class="title">Register</h1>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <!------------------------------------------------------------------------First Name------------------------------------------------------------------------------>
        <b-row>
          <div class="name">
            <b-form-group id="input-group-firstName" label-for="firstName">
              <b-form-input
                id="firstName"
                v-model="$v.form.firstName.$model"
                type="text"
                :state="validateState('firstName')"
                placeholder="Enter first name..."
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.firstName.required">First name is required</b-form-invalid-feedback>
            </b-form-group>
          </div>
          <!---------------------------------------------------------------------------------------------------------------------------------------------------------------->

          <!-------------------------------------------------------------------------Last Name------------------------------------------------------------------------------->
          <div class="name">
            <b-form-group id="input-group-lastName" label-for="lastName">
              <b-form-input
                id="lastName"
                v-model="$v.form.lastName.$model"
                type="text"
                :state="validateState('lastName')"
                placeholder="Enter last name..."
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.lastName.required">Last name is required</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </b-row>
        <!---------------------------------------------------------------------------------------------------------------------------------------------------------------->

        <b-col>
          <!-----------------------------------------------------------------------User Name-------------------------------------------------------------------------------->
          <b-form-group id="input-group-username" label-for="username">
            <b-form-input
              id="username"
              v-model="$v.form.username.$model"
              type="text"
              placeholder="Enter user name..."
              :state="validateState('username')"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.username.required">Username is required</b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-else-if="!$v.form.username.length"
            >Username length should be between 3-8 characters long</b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-if="!$v.form.username.alpha"
            >Username can include only letters</b-form-invalid-feedback>
          </b-form-group>
          <!---------------------------------------------------------------------------------------------------------------------------------------------------------------->

          <!-----------------------------------------------------------------------------Email------------------------------------------------------------------------------>

          <b-form-group id="input-group-email" label-for="email">
            <b-form-input
              id="email"
              v-model="$v.form.email.$model"
              type="email"
              :state="validateState('email')"
              placeholder="Enter email..."
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.email.required">Email is required</b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.email.email">Email must be valid</b-form-invalid-feedback>
          </b-form-group>
          <!----------------------------------------------------------------------------------------------------------------------------------------------------------------->

          <!----------------------------------------------------------------------------Country------------------------------------------------------------------------------>

          <b-form-group id="input-group-country" label-for="country">
            <b-form-select
              id="country"
              v-model="$v.form.country.$model"
              :options="countries"
              :state="validateState('country')"
            ></b-form-select>
            <b-form-invalid-feedback>Country is required</b-form-invalid-feedback>
          </b-form-group>
          <!------------------------------------------------------------------------------------------------------------------------------------------------------------------>

          <!-- ------------------------------------------------------------------------ Password------------------------------------------------------------------------------>
          <b-form-group id="input-group-Password" label-for="password">
            <b-form-input
              id="password"
              type="password"
              placeholder="Set strong password..."
              v-model="$v.form.password.$model"
              :state="validateState('password')"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required</b-form-invalid-feedback>
            <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
              Your password should be
              <strong>strong</strong>.
              <br />
            </b-form-text>
            <b-form-invalid-feedback
              v-if="$v.form.password.required && !$v.form.password.length"
            >Have length between 5-10 characters long</b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-if="!$v.form.password.special"
            >Your password should have at least one number and one special character</b-form-invalid-feedback>
          </b-form-group>
          <!-------------------------------------------------------------------------------------------------------------------------------------------------------------------->

          <!-----------------------------------------------------------------------------Confirm Password----------------------------------------------------------------------->
          <b-form-group id="input-group-confirmPassword" label-for="confirmPassword">
            <b-form-input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password..."
              v-model="$v.form.confirmPassword.$model"
              :state="validateState('confirmPassword')"
            ></b-form-input>
            <b-form-invalid-feedback
              v-if="!$v.form.confirmPassword.required"
            >Password confirmation is required</b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-else-if="!$v.form.confirmPassword.sameAsPassword"
            >The confirmed password is not equal to the original password</b-form-invalid-feedback>
          </b-form-group>
          <!----------------------------------------------------------------------------------------------------------------------------------------------------------------------->

          <!--------------------------------------------------------------------------------Image----------------------------------------------------------------------------------->

          <b-form-group id="input-group-Image" label-for="image">
            <b-form-input
              id="image"
              type="text"
              placeholder="Enter image url"
              v-model="$v.form.image.$model"
              :state="validateState('image')"
            ></b-form-input>
          </b-form-group>
          <!-------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        </b-col>

        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary" class="RegBtn">Register</b-button>
        <div class="mt-2">
          You have an account already?
          <router-link class="rLink" to="login"><u>Log in here</u></router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >Register failed: {{ form.submitError }}</b-alert>
    </div>
    <div class="side"></div>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmPassword: "",
        email: "",
        image: "",
        submitError: undefined
      },
      countries: [
        { value: null, text: "Please choose country", disabled: true }
      ],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: u => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: p => minLength(5)(p) && maxLength(10)(p),
        special: u =>
          new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])").test(u)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      email: {
        required,
        email
      },
      image: {}
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },


    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/auth/register",
          {
            username: this.form.username,
            password: this.form.password,
            confirmPassword: this.form.confirmPassword,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            country: this.form.country,
            email: this.form.email,
            image: this.form.image
          }
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmPassword: "",
        email: "",
        image: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
  background-color :rgba(255, 255, 255, 0.651);
  background-origin: border-box;
  height: 100%; /* You must set a specified height */
  width: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; 
  max-width: 500px;
  text-align: center;
}

.name {
  text-align: center;
  width: 41%;
  margin-left: 30px;
}

.RegBtn {
  width: 9.5cm;
  margin-left: 0.5cm;
}

.rLink{
  color: black;
}

</style>
