<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group id="input-group-Username" label-for="Username">
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          placeholder="Enter Your User Name.."
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>Username is required</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-Password" label-for="Password">
        <b-form-input
          id="Password"
          type="password"
          placeholder="Enter Your Password.."
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>Password is required</b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
      >Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link class="rLink" to="register">
          <u>Register in here</u>
        </router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >Login failed: {{ form.submitError }}</b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios
          .post(
            "http://localhost:3000/auth/Login",
            {
              username: this.form.username,
              password: this.form.password
            },
            { withCredentials: true }
          )
          .then(res => {
            this.$root.store.image = res.data[0].Image;
          });
        this.$root.store.login(this.form.username, this.$root.store.image);
        if (this.$router.currentRoute.path != "/") this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.651);
  background-origin: border-box;
  height: 100%; /* You must set a specified height */
  width: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  text-align: center;
}
.title {
  text-align: center;
}
.rLink {
  color: black;
}
</style>