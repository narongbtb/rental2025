<template>
    <div>
            <h1>ID : {{id}}</h1>
            <h1>Name : {{name}}</h1>
            <h1>Price : {{price}}</h1>
    </div>
</template>

<script>
    export default {
      
        data() {
            return {
                id: "",
                name:"",
                price:""
            }
        },
        created () {
            let vm=this;
            console.log(vm.$route.params);
            vm.id=vm.$route.params.id;  
            vm.name=vm.$route.params.name;
            vm.price=vm.$route.params.price;
        },
    }
</script>

<style lang="scss" scoped>

</style>