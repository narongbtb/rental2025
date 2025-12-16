export const mymixin={
    created(){
        let vm=this;
        vm.username="Reaksa";
        vm.email="reaksa@gmail.com";
    },
    methods:{
        chagneUserName(username){
            let vm=this;
            vm.username=username;
        }
    },
    data(){
        return {
            username:"",
            email:""
        }
    }
}