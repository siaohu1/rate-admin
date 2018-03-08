<template>
    <section class="main">
        <!--<div class="crumbs">-->
            <!--<el-breadcrumb separator="/">-->
                <!--<el-breadcrumb-item><i class="el-icon-star-on"></i> 投票区</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
        <!--</div>-->
        <div class="vote-zoom">
            <h3>
                <div class="crumbs" style="float: left">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item style="font-size: 14px"><i class="el-icon-star-on"></i> 投票列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <router-link to="/vote">
                     <el-button style="float: right">新建投票</el-button>
                </router-link>
            </h3>
            <article>
                <ul class="item-list">
                    <li class="item-info" v-for="list in votingLists">
                        <img src="../../../static/img/gai.jpeg" alt="">
                        <div><span>{{list.projectName}}</span></div>
                        <div><span>{{list.viewCount}}</span></div>
                        <router-link to="/vote">
                            <el-button>编辑基本信息</el-button>
                        </router-link>
                        <el-button style="margin-top: 6px;margin-left: 10%">下架</el-button>
                    </li>
                </ul>
            </article>
        </div>
    </section>
</template>

<script>
    import * as apiRequest from '../../api/api'
    export default {
        data: function(){
            return {
                votingLists:[
                    {
                        "coinLogo": "测试内容0555",
                        "id": 31505,
                        "projectName": "测试内容v696",
                        "viewCount": 71057,
                        "voteCount": 43601
                    },
                    {
                        "coinLogo": "测试内容0555",
                        "id": 31505,
                        "projectName": "测试内容v696",
                        "viewCount": 71057,
                        "voteCount": 43601
                    },
                    {
                        "coinLogo": "测试内容0555",
                        "id": 31505,
                        "projectName": "测试内容v696",
                        "viewCount": 71057,
                        "voteCount": 43601
                    },
                    {
                        "coinLogo": "测试内容0555",
                        "id": 31505,
                        "projectName": "测试内容v696",
                        "viewCount": 71057,
                        "voteCount": 43601
                    },
                    {
                        "coinLogo": "测试内容0555",
                        "id": 31505,
                        "projectName": "测试内容v696",
                        "viewCount": 71057,
                        "voteCount": 43601
                    },
                    {
                        "coinLogo": "测试内容0555",
                        "id": 31505,
                        "projectName": "测试内容v696",
                        "viewCount": 71057,
                        "voteCount": 43601
                    },
                    {
                        "coinLogo": "测试内容0555",
                        "id": 31505,
                        "projectName": "测试内容v696",
                        "viewCount": 71057,
                        "voteCount": 43601
                    },
                ],
            }
        },
        mounted(){
            // this.getProjectList();
        },
        methods:{
            getProjectList(pageIndex=1){
                let _this = this;
                apiRequest.projectList({
                    pageIndex,
                    pageSize:10,
                }).then(data=>{
                    console.log(data)
                })

            }
        }
    }
</script>

<style scoped>
    .vote-zoom{
        width:100%;
        /*max-width: 980px;*/
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
        height: 37px;
    }
    .vote-zoom h3 a{
        color: black;
    }
    .vote-zoom article{
        word-wrap: break-word;
        background-color: #fff;
        /*border: 1px solid #ddd;*/
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
        width: 99.79%;
        /*border: 1px solid ;*/
        /*padding: 0 0 0 10px;*/
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
        margin-left: 10%;
    }
    .item-info a{
        display: inline-block;
        /*border: 1px solid black;*/
        cursor:pointer;
        height: 30px;
        line-height: 30px;
        width: 130px;
        text-align: center;
        margin-left: 10%;
        color: black;
    }
    .item-info img{
        height: 50px;
        width: 50px;
        margin-left: 3%;
    }
    .item-info span{
        margin-left: 10%;
        display: inline-block;
    }
</style>
