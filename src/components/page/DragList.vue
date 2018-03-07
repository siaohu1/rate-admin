<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 投票区</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="vote-zoom">
            <h3>投票区
                <router-link to="/vote">
                     <el-button style="margin-left:90%;">新建投票</el-button>
                </router-link>
            </h3>
            <article>
                <ul class="item-list">
                    <li class="item-info" v-for="(item,items) in votelist" v-bind:key="items">
                        <img src="../../../static/img/gai.jpeg" alt="">
                        <div><span>{{item.votename}}</span></div>
                        <div><span>浏览量333</span></div>
                        <router-link to="/vote">
                            <el-button>编辑基本信息</el-button>
                        </router-link>
                        <el-button style="margin-top: 6px;margin-left: 20px">下架</el-button>
                    </li>
                </ul>
            </article>
        </div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import axios from "axios";

    export default {
        data: function(){
            return {
                votelist:[],
            }
        },
        created (){
            // this.request();
            this.queryVoteList();
        },
        methods:{
            queryVoteList(){
                var _th = this;
                var wilddogApp = wilddog.initializeApp({
                    syncURL: 'https://wd6758545005srbqnl.wilddogio.com'
                })
                var sync = wilddogApp.sync();
                let ref = sync.ref();
                var childRef = wilddog.sync().ref("votelist");
                childRef.on("value", function(snapshot) {
                    var votelistarr =  snapshot.val();
                    _th.votelist = votelistarr;
                    console.log( _th.votelist);
                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            }
        }
    }
</script>

<style scoped>
    .vote-zoom{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .vote-zoom h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .vote-zoom h3 a{
        color: black;
    }
    .vote-zoom article{
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .vote-zoom article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .vote-zoom article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .vote-zoom article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .vote-zoom article .el-checkbox{
        margin-bottom: 5px;
    }
    /* .createitem{
        display: inline-block;
        float: right;
        border: 1px solid black;
        cursor:pointer;
        height: 20px;
        line-height: 20px;
        width: 100px;
        text-align: center;
    } */
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
