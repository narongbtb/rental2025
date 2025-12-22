<template>
    <div>
        <div>
            <h1>Product Page</h1>
            <v-btn color="purple" @click="handleAdd">
                <v-icon
                    icon="mdi-plus-circle"
                /> 
                Add Product
            </v-btn>
        </div>
        <div>
             <v-table  density="compact">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Cost</th>
                        <th style="width:200px">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doc in productList" :key="doc._id">
                        <td>{{doc._id}}</td>
                        <td>{{doc.name}}</td>
                        <td>{{doc.price}}</td>
                        <td>{{doc.cost}}</td>
                        <td>
                            <v-btn @click="handleRemove(doc)" color="red" fab icon="mdi-delete"></v-btn>
                            <v-btn @click="handleEdit(doc)" color="green" fab icon="mdi-pencil"></v-btn>           
                            <v-btn :to='{name:"productDetail",params:{id:doc._id,name:doc.name,price:doc.price}}' color="blue" fab icon="mdi-details"></v-btn>
                        </td>
                    </tr>
                </tbody>
        </v-table>
        </div>

    </div>


     <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card
        prepend-icon="mdi-plus"
        :title="action +' Product'"
      >
        <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        v-model="productDoc.name"
                        label="Product Name"
                        :rules="namerule"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        v-model="productDoc.price"
                        label="Price"
                        :rules="pricerule"
                        type="number"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        v-model="productDoc.cost"
                        label="Cost"
                        type="number"
                        required
                    ></v-text-field>
                </v-form>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="handleSubmit"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</template>

<script>
    import Swal from "sweetalert2";
    import axios from "axios";
    export default {
        data() {
            return {
                dialog :false,
                action:"",
                productDoc:{
                    _id:"",
                    name:"",
                    price:"",
                    cost:""
                },
                productList: [],
                namerule:[
                    v=>!!v || "Name is required",
                    v=> (v && v.length >3)  || "Length invalid"
                ],
                pricerule:[
                    v=> (v && v>0) || "Price must greater than 0"
                ]
            }
        },
        watch: {
            dialog(val) {
                let vm=this;
                if(val==false){
                    vm.resetForm();                        
                }
            }
        },
        methods: {
            async fetchData(){
                let vm=this;
                const res=await axios({
                    method:"get",
                    url:process.env.VUE_APP_BACKEND_URL+"/product/fetch",
                    headers:{
                    },
                    params:{
                        page:1,
                        limit:10
                    }
                })
                console.log(res);
                if(res.data.code==201){
                    vm.productList=res.data.data || [];
                }
            },
            async insertData(doc){
                let vm=this;
                const res=await axios({
                    method:"post",
                    url:process.env.VUE_APP_BACKEND_URL+"/product",
                    headers:{
                    },
                    data:doc
                    // data:{
                    //     name:doc.name,
                    //     price:doc.price,
                    //     cost:doc.cost
                    // }
                })
                console.log(res);
                if(res.data.code==201){
                    vm.fetchData();
                }
            },
            async updateData(doc){
                let vm=this;
                console.log(doc);
                const res=await axios({
                    method:"post",
                    url:"http://localhost:3000/product/update",
                    headers:{
                    },
                    data:doc
                    // data:{
                    //     name:doc.name,
                    //     price:doc.price,
                    //     cost:doc.cost
                    // }
                })
                console.log(res);
                if(res.data.code==201){
                    vm.fetchData();
                }
            },
            
            async removeData(id){
                let vm=this;
                const res=await axios({
                    method:"post",
                    url:"http://localhost:3000/product/delete",
                    headers:{
                    },
                    data:{
                        id:id
                    }
                })
                console.log(res);
                if(res.data.code==201){
                    vm.fetchData();
                }
            },
            gotoDetail(doc){
                let vm=this;
                vm.$router.push({name:"productDetail",params:{id:doc._id,name:doc.name,price:doc.price}});
            },
            handleAdd() {
                let vm=this;
                vm.productDoc.id=""
                vm.action="Add";
                vm.dialog=true;
                
            },
            handleEdit(data){
                let vm=this;
                vm.dialog=true;
                vm.action="Update";
                // vm.productDoc=Object.assign({},data);
                vm.productDoc.name=data.name;
                vm.productDoc.price=data.price;
                vm.productDoc.cost=data.cost;
                vm.productDoc._id=data._id;
                console.log(data);
            },
            handleRemove(doc){
                    let vm=this;
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You want to delete this Product Id "+doc._id,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                    if (result.isConfirmed) {
                        // let ind=vm.productList.findIndex(d=>d._id==doc._id);
                        // if (ind !== -1) {
                        //     vm.productList.splice(ind, 1);
                        // }
                        vm.removeData(doc._id);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                    });
            },
            // async submitAdd(){
            //     let vm=this;
            //     let d= await vm.$refs.form.validate()
            //     console.log(d);
            //     if(d.valid){
            //        let productObj=Object.assign({},vm.productDoc);
            //        vm.productList.push(productObj);
            //        vm.dialog = false;
            //        vm.resetForm();  
            //     }   
            // },
            handleSubmit(){
                let vm=this;
                vm.$refs.form.validate()
                .then(res=>{
                    console.log(res.valid)
                    if(res.valid){
                        // Insert Data
                        if(vm.productDoc._id==""){
                            let productObj=Object.assign({},vm.productDoc);
                            // vm.productList.push(productObj);
                            vm.insertData(productObj);
                        }else{
                        // Update Data
                              let productObj=Object.assign({},vm.productDoc);
                            //   let ind=vm.productList.findIndex(d=>d._id==productObj._id);
                            //   vm.productList[ind]=productObj;
                            productObj.id=productObj._id;
                            vm.updateData(productObj);

                        }
                        vm.dialog = false;
                        vm.resetForm(); 
                    }else{
                         console.error('Validation threw:');
                    }
                }).catch(err=>{
                      console.error('Validation threw:', err);
                })              
            },
            resetForm(){
                let vm=this;
                vm.$refs.form.reset();
            }
        },
       mounted () {
          let vm=this;
        vm.fetchData();
       },
        
    }
</script>

<style lang="scss" scoped>

</style>