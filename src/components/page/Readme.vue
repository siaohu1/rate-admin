<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i> 项目列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="items">
            <div>
                <h3>项目列表
                <router-link to="/bianji">
                <el-button style="margin-left:90%;">新建项目</el-button>
                </router-link>
            </h3>
            </div>
           <div>
                <ul class="item-list">
                    <li class="item-info" v-for="(item,items) in itemlist" v-bind:key="items">
                             <img src="../../../static/img/gai.jpeg" alt="">
                             <div>{{item.name}}</div>
                             <!-- <li>浏览量</li> -->
                             <div><el-button>编辑基本信息</el-button></div>
                             <div><el-button>下架</el-button></div>
                    </li>

                </ul>
           </div>

        </div>

    </div>
</template>

<script>
    export default {

        data: function(){
            return {
                itemlist:[],
                itemsname:'',
                pageview:'',
                queryitem:'',
            }
        },
        created (){
            this.queryitemlist();
        },
        methods:{
            queryitemlist(){
                var _th = this;
                 var wilddogApp = wilddog.initializeApp({
                syncURL: 'https://wd6758545005srbqnl.wilddogio.com'
                })
                var sync = wilddogApp.sync()
                let ref = sync.ref()
                var childRef = wilddog.sync().ref("itemlist");
                 childRef.on("value", function(snapshot) {
                    var itemlistarr =  snapshot.val();

                    _th.itemlist = itemlistarr;
                    console.log( _th.itemlist)


                }, function (errorObject) {
                     console.log("The read failed: " + errorObject.code);
                     });
            }
        }
    }
</script>

<style scoped>
    .items{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .items h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .items h3 a{
        color: black;
    }
    .items article{
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .items article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .items article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .items article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .items article .el-checkbox{
        margin-bottom: 5px;
    }

    .item-info{
        display: flex;
        align-items: center;
        height: 70px;
        line-height: 70px;
        width: 98.8%;
        border: 1px solid ;
        padding: 0 0 0 10px;
        border: 1px solid #d8d8d8;
        border-collapse: collapse;
    }
    .item-list{
        list-style: none;
    }
    .item-info div{
        display: inline-block;
        /*border: 1px solid black;*/
        cursor:pointer;
        height: 30px;
        line-height: 30px;
        width: 130px;
        text-align: center;
        margin-left: 13%;
    }
    .item-info a{
        display: inline-block;
        /*border: 1px solid black;*/
        cursor:pointer;
        height: 30px;
        line-height: 30px;
        width: 130px;
        text-align: center;
        margin-left: 13%;
        color: black;
    }
    .item-info img{
        height: 50px;
        width: 50px;
    }
    .item-info span{
        margin-left: 10%;
        display: inline-block;
    }

</style>
