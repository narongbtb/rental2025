<template>
      <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="user.email"
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        label="Password"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>

</template>

<script>
    export default {
        data() {
            return {
                user: {
                    email:"",
                    password:"",
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>