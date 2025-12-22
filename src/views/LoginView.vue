<template>
      <v-sheet class="mx-auto" width="300" style="margin-top:100px">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="user.email"
        label="Email"
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        label="Password"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" @click="handleLogin" block>Submit</v-btn>
    </v-form>
  </v-sheet>

</template>

<script>
import axios from 'axios';
import {userStore} from "@/store/userStore"
    export default {
        data() {
            return {
                user: {
                    email:"",
                    password:"",
                }
            }
        },
        methods: {
           async handleLogin() {
                const useuserStore=userStore();
                let vm=this;
                  const res=await axios({
                    method:"post",
                    url:process.env.VUE_APP_BACKEND_URL + "/user/login",
                    headers:{
                    },
                    data:vm.user
                })
                console.log(res.data);
                if(res.data.code==200){
                    useuserStore.login(res.data.data)
                    vm.$router.push("/product");
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>