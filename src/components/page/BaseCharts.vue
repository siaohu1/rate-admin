<template>
    <section class="main77">
        <div class="crumbs11">
            <el-row :gutter="18">
                <el-col :span="7" class="tradelist">
                    <div class="newcreate">
                        <el-form>
                            <el-form-itme>
                                <el-col :span="18">
                                    <el-input placeholder="输入一级行业名称"  style="position: relative;" v-model="levelonename"></el-input>
                                    <el-button plain style="position: absolute;top:16px;left:19%;background:none;" @click="addlevelonetrade">新建</el-button>
                                </el-col>
                            </el-form-itme>
                        </el-form>
                    </div>
                    <div class="trade">
                        <div class="tradeinfo">
                            <ul v-for="(item,items) in trades" v-bind:key="items">
                                <li>行业名称：{{item.levelonename}}</li>
                                 <li>子行业：{{item.professionNum}}</li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="7" class="tradelist">
                    <div class="newcreate">
                         <el-form>
                            <el-form-itme>
                                <el-col :span="18">
                                    <el-input placeholder="输入二级行业名称" style="position: relative;" v-model="leveltwoname"></el-input>
                                    <el-button plain style="position: absolute;top:16px;left:51%;background:none;" @click="addleveltwotrade">新建</el-button>
                                </el-col>
                            </el-form-itme>
                        </el-form>
                    </div>
                      <div class="trade">
                        <div class="tradeinfo">
                            <ul v-for="(item,items) in trades" v-bind:key="items">
                                <li>行业名称：{{item.leveltwoname}}</li>
                                <li style="border-bottom: 1px solid #ccc;">总项目:{{item.twoallitems}}</li>
                            </ul>
                        </div>
                       
                    </div>
                </el-col>
                 <el-col :span="7" class="tradelist" style="padding-left:0px;padding-right:0px;" >
                    <div class="itemlist">
                        <ul>
                            <!-- <li v-for="(item,items) in trades" v-bind:key="items">{{item.name}}</li> -->
                        </ul>
                     </div>
                 </el-col> 
            </el-row>
        </div>
        <div>
      
           
        </div>

    </section>
</template>

<script>
    import axios from "axios"
    import Vue from 'vue';
    export default {
  
        components: {
        },
        data (){
            return {
                trades:[],//行业列表
                levelonename:'',
                professionNum:'',
                //leveltwotrades:[],
                leveltwoname:'',
                twoallitems:'',
                addtrade:''
            }
        },
        
             mounted:function(){
            var wilddogApp = wilddog.initializeApp({
                syncURL: 'dd'
            })
            var sync = wilddogApp.sync()
            var ref = sync.ref('/tradelist')
            var addtrade = new Vue({
                el: '',
                wilddog: {
                    anArray: sync.ref("/tradelist")
                }
            }) 
            this.addtrade = addtrade;
            console.log(addtrade)
            ref.on('value',function(data){
              
                console.log(data.val())
            })
            
        },
        methods:{
       
           // 添加一级行业
            addlevelonetrade(){
                let levelonename = this.levelonename;
                let trades =this.trades;
                trades.push({levelonename:this.levelonename})
                this.addtrade.$wilddogRefs.anArray.push(levelonename)
                alert('新建一级行业成功！')
                console.log('添加成功')
             }
             
            //添加二级行业
            // addleveltwotrade(){
            //     let leveltwotrades = this.leveltwotrades;
            //     leveltwotrades.push({leveltwoname:this.leveltwoname,twoallitems:this.twoallitems})
            // },
         
        }
    }
</script>

<style scoped>
        
        ul li{list-style-type: none;};
        .tradeinfo{line-height: 30px;}
        .tradeinfo ul{margin:10px 20px; }
        .tradelist{border: 1px solid #cccccc;margin-right: 30px; }
        .newcreate{border-bottom: 1px solid #cccccc;}
        .newcreate form{height: 50px;width: 80%;margin:0 auto;margin-top: 5%;}
        .trade{margin-bottom: 20px;height: 645px;overflow: hidden;overflow-y: scroll;}
        .itemlist{height: 732px;overflow: hidden;overflow-y: scroll;}
        .itemlist ul li{list-style-type: none;height: 50px;line-height: 50px;}
        .itemlist ul li:nth-of-type(odd){ background:#edf1f0;}
        .itemlist ul  li:nth-of-type(even){ background:#ebddde;}
</style>
