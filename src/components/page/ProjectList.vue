<template>
    <div>
        <div class="items">
            <div>
                <h3>
                <i class="el-icon-document"></i> 项目列表
                    <router-link to="/editor">
                        <el-button style="float: right;">新建项目</el-button>
                    </router-link>
                    <!--<el-dialog-->
                        <!--title="提示"-->
                        <!--:visible.sync="dialogVisible"-->
                        <!--width="30%"-->
                        <!--&gt;-->
                        <!--<span>这是一段信息</span>-->
                        <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  <!--</span>-->
                    <!--</el-dialog>-->

                </h3>
            </div>
           <div>
                <ul class="item-list" v-for="list in projectLists">
                    <li class="item-info" >
                             <img src="../../../static/img/gai.jpeg" alt="">
                             <div>{{list.projectName}}</div>
                             <div><el-button>编辑基本信息</el-button></div>
                             <div><el-button>编辑评级内容</el-button></div>
                             <div><el-button>下架</el-button></div>
                    </li>

                </ul>
           </div>

        </div>

    </div>
</template>

<script>
    import * as apiRequest from '../../api/api'
    export default {
        data: function(){
            return {
                projectLists:[
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
                dialogVisible:false,
            }
        },
        mounted(){
            this.getProjectList();
        },
        methods:{
            getProjectList(pageIndex=1){
                let _this = this;
                apiRequest.projectList({
                    pageIndex,
                    pageSize:10,
                }).then(data=>{
                    console.log(data)
                    this.projectLists = data.project_list
                    console.log(this.projectLists)
                })

            }
        }
    }
</script>

<style scoped>
    .items{
        width:100%;
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
        height: 35px;
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
        width: 99.79%;
        border: 1px solid ;
        padding: 0;
        border: 1px solid #d8d8d8;
        border-collapse: collapse;
        margin: 0;
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
        /*margin-left: 13%;*/
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
