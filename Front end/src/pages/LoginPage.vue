<template>
  <div class="container">
    <login class="log"></login>
  </div>
</template>
<script>
 import login from "../components/login";
 export default {
  components: {
    login
  },
  data(){
    return{
      name:"LoginPage"
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
