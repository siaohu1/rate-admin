<template>
    <div>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{username}}
                    <img class="user-logo" src="../../../static/img/gai.jpeg">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
        <div class="fanhui" @click='goBack'><i class="el-icon-arrow-left"></i></div>
       <el-row :gutter="20" style="margin-left:10%;">
           <el-upload
                action=" http://192.168.2.68:8079/picuplode/picuploadimg"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview">
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

            <el-form style="margin-top:30px;">
                <el-form-item label="项目名称">
                    <el-col :span="5">
                    <el-input v-model="itemname" @click="addvoteitem"></el-input>
                </el-col>
                </el-form-item>
                 <el-form-item >
                  <el-button @click="voteSave()">保存</el-button>
                </el-form-item>

            </el-form>

       </el-row>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                itemname:'',
                dialogImageUrl:''
            }
        },
        mounted(){


        },
        created(){
            this.queryitemlist();
        },
        methods:{
             goBack(){
                    this.$router.go(-1);
            },
            //新建投票项目

        }
    }

</script>
<style scoped>
 /* header样式 */
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .fanhui{
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        padding: 10px 0 0 20px;
    }


</style>
