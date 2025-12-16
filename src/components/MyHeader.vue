<template>
    <div>
        <h1>Hello from Header</h1>
        <h1>Chile Name : {{myname}}</h1>
        <h2>Student Name: {{student?.name || ""}}</h2>
        <h2 :style="{color:color}">Age: {{student?.age || ""}}</h2>
        <input type="text" @keyup="changeInChild"  v-model="mycolor"/>
        <h2>{{username}}</h2>
        <button @click="chagneUserName('John')">Change User Name</button>
    </div>
</template>

<script>
    import {mymixin} from "../mixins/mymixin.js"
    export default {
        name:"MyHeader",
        mixins:[mymixin],
        data() {
            return {
                mycolor: ""
            }
        },
        methods: {
            changeInChild() {
                let vm=this;
                vm.$emit("changeFromParent",vm.mycolor);
            }
        },
        watch: {
            color(newValue) {
                  let vm=this; 
                  vm.mycolor=newValue;
            }
        }, 
        props:{
            myname:String,
            student:{
                type:Object
            },
            color:{
                type:String,
                validator(val){
                    return ["red","blue","pink"].indexOf(val)>-1;
                }
            }
        },
             
        
    }
</script>

<style lang="scss" scoped>

</style>