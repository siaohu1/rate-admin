<template>
    <div class="fillcontain">
        <div class="header">
            <div class="logo">rate-admin</div>
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
        <div class="fanhui"><i class="el-icon-arrow-left
" @click='goBack'></i><span style="font-size: 20px;margin-left: 33%">新增项目</span></div>
        <el-row class="rewBox" style="">
            <el-col :span="24"  v-show="infoCoinShow" >
                <el-form name="form"  class="formBox">
                    <!-- <p>币状态：未补全</p> -->
                    <el-form-item label="币标志">
                        <el-col :span="7">
                            <el-input v-model="symbol" :placeholder= symbol></el-input>
                        </el-col>
                    </el-form-item>
                    <el-upload
                        action="123"
                        :http-request="requestImg"
                        class="uploadImg"
                        :before-upload="beforeAvatarUpload"
                        enctype="multipart/form-data"
                        list-type="picture-card">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <el-form-item label="ICO评级">
                        <el-col :span="6">
                            <el-input v-model="grade"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="ICO成本">
                        <el-col :span="6">
                            <el-input v-model="icoCost"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="ICO时间" >
                        <el-col :span="6">
                            <el-date-picker
                                v-model="datatime"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <!--<hr>-->

                    <el-form-item label="所属行业">
                        <el-cascader
                            placeholder="试试搜索"
                            :options="options"
                            filterable
                            @change="fristList"
                            change-on-select
                        ></el-cascader>
                        <el-button size="small" @click="jumpindustrypage = true">编辑行业</el-button>
                        <el-dialog
                            title="提示"
                            :visible.sync="jumpindustrypage"
                            width="30%"
                            :before-close="handleClose">
                            <span>是否跳转到行业列表页面</span>
                            <span slot="footer" class="dialog-footer">
                        <el-button @click="jumpindustrypage = false">取 消</el-button>
                        <el-button type="primary" @click="jumpindustrypage = false,jumpIndustryPage()">确 定</el-button>
                        </span>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="添加标签">
                        <el-autocomplete
                            v-model="sreachtag"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入内容"
                            @select="handleSelect"
                        ></el-autocomplete>
                        <el-button    @click="jumptag=true">搜索不到，请新增标签</el-button>
                        <el-dialog
                            title="提示"
                            :visible.sync="jumptag"
                            width="30%"
                            :before-close="handleClose">
                            <span>是否跳转到标签列表页面</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="jumptag = false">取 消</el-button>
                                <el-button type="primary" @click="jumptag = false,jumpTagPage()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="已有标签">
                        <el-col :span="10" class="tags">
                            <el-tag
                                v-for="tag in tags"
                                :key="tag.name"
                                closable
                                :disable-transitions="false"
                                :type="tag.type"
                                :style="{color:tag.tag_color,backgroundColor:tag.tag_bg_color}"
                                @close="handleClose(tag)">
                                {{tag.name}}
                            </el-tag>
                        </el-col>
                    </el-form-item>
                    <!--<hr>-->
                    <el-form-item label="项目介绍">
                        <el-col :span="10">
                            <el-input type="textarea"  v-model="desc"></el-input>
                        </el-col>
                    </el-form-item>
                    <!--<hr>-->
                    <el-form-item label="官网链接">
                        <el-col :span="10">
                            <el-input placeholder="请输入链接" v-model="url">
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="白皮书">
                        <el-col :span="10">
                            <el-input placeholder="请输入链接" v-model="bookUrl">
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="其他文字链接">
                        <el-col :span="4">
                            <el-input v-model="textlinkname" placeholder="链接描述"></el-input>
                        </el-col>
                        <el-col :span="7">
                            <el-input placeholder="请输入内容" v-model="textlinkaddress"></el-input>
                        </el-col>
                        <el-button @click="createtextlink">新建</el-button>
                    </el-form-item>
                    <ul class="textlinklist">
                        <li v-for="(item,index) in textlinks" :key="index.id"><span >{{item.textlinkname}}</span><span>{{item.textlinkaddress}}</span>
                            <el-button @click="removetextlink(index)" size="small">删除</el-button>
                        </li>
                    </ul>
                    <el-form-item >
                        <el-button   @click="jumpicopage=true">管理图标链接</el-button>
                        <el-dialog
                            title="提示"
                            :visible.sync="jumpicopage"
                            width="30%"
                            :before-close="handleClose">
                            <span>是否跳转到标签列表页面</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="jumpicopage = false">取 消</el-button>
                                <el-button type="primary" @click="jumpicopage = false,jumpIcoLinkPage()">确 定</el-button>
                            </span>
                        </el-dialog>
                        <el-button @click="addiconlink">新增图标链接</el-button>
                    </el-form-item>
                    <el-form-item label="图标下拉框">
                        <el-col :span="4">
                            <el-select v-model="selecticon" placeholder="选择图标">
                                <el-option v-for="(item,items) in icondata" :key="items" :label="item.name"  :value="item.name"></el-option>

                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="selecttype" placeholder="选择类型">
                                <el-option label="链接" value="wechat"></el-option>
                                <el-option label="图片" value="weibo"></el-option>
                                <el-option label="弹框" value="tankuang"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-input  v-model="selectcontent" ></el-input>
                        </el-col>
                    </el-form-item>
                    <ul class="iconlinklist">
                        <li v-for="(item,index) in iconlinks" :key="index.id"><span >{{item.selecticon}}</span><span>{{item.selecttype}}</span><span >{{item.selectcontent}}</span>
                            <el-button @click="removeiconlink(index)" size="small">删除</el-button>
                        </li>
                    </ul>
                    <hr>
                    <el-form-item style="padding-left: 30%;padding-top: 1%">
                        <el-button  @click="saveDraft()">保存草稿</el-button>
                        <el-button @click="saveRelease()">保存发布</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import axios from 'axios'
    import {FormatData} from '../../api/datatime.js'
    import * as api from '../../api/api'
    var myToken = localStorage.token;
    export default {
        data() {
            return {
                url:'',
                dialogVisible:false,
                dialogImageUrl: '',
                jumpindustrypage: false, //跳转编辑行业
                imageUrl: '',
                imgFile:'',
                icoCost:'',//ico成本
                bookUrl:'',//白皮书地址
                symbol:'',//币标志
                jumptag:false,        //跳转标签
                jumpicopage:false, //跳转编辑图标
                textlinks:[],         //新建文字链接
                textlinkname:'',
                textlinkaddress:'',
                selecticon:'',   //图标链接
                selecttype:'',
                selectcontent:'',
                iconlinks:[],//图标链接
                datatime:'',
                tags: [],//标签
                tagids:'',//标签id
                infoCoinShow:true,//默认隐藏右边币详情
                searchVal:'',//默认输入为空
                restaurants: [],//搜索标签列表
                sreachtag: '',//搜索标签的内容
                timeout:  null,
                options:[],//行业
                secondId:'',//行业id
                desc:'',//币描述
                icondata:'',//获取到的图标数据
                currentPage:1,
                getcurrentPage:'',
                newCount:'',
                geticolist:[],
                indexPrev:1,
                status:'',
                // fristData:'',//一级行业
                secondData:[],//二级行业列表
                username:'',
                grade:''
            }
        },
        methods: {
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            goBack(){
                this.$router.go(-1);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            response(){
                let _th = this;
                api.getWaitIcoList({ //查询待补全币列表
                    index:0,
                    size:20
                }).then(data =>{
                    this.geticolist = data.list;
                })
                api.getTagList({ //查询标签列表
                }).then(data =>{
                    let tagdata = data;
                    _th.restaurants = tagdata.map(function(item){
                        return {value:item.tag_name,id:item.id}
                    })
                })
                api.getFristIndustryList({//查询一级行业列表
                }).then(data =>{
                    let industrydata = data;
                    console.log(industrydata)
                    _th.options = industrydata.map(function(item){
                        return {value:item.id,label:item.class_name,children:[]}
                    })

                })
                api.getIconLinkList({//查询图标列表
                }).then(data =>{
                    this.icondata = data;

                })
            },
            getCurrentPage(val){//获取当前页码并调接口
                api.getWaitIcoList({
                    index:val,
                    size:20
                }).then(data =>{
                    this.geticolist = data.list;
                })
            },
            cionInfo(item,index){  //点击编辑右边显示编辑页面
                let _th = this;
                this.infoCoinShow = true;
                this.symbol = item.symbol;
                _th.indexPrev = index;
                console.log(this.symbol)
                console.log(_th.indexPrev)
            },
            fristList(val){//获取二级行业列表
                api.getSecondIndustryList({
                    first_id:val[0],
                }).then(data =>{
                    let secondIndustry = data;
                    let a = secondIndustry.map(function(item){
                        return {value:item.id,label:item.class_name}
                    })
                    this.options.children = a;
                    console.log(  this.options.children)
                })
            },
            querySearchAsync(queryString, cb) {//搜索标签str
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {//搜索标签end
                console.log(item);
            },
            handleSelect(item) {//添加到已有标签
                let _th = this;
                _th.tags.push({name:item.value,id:item.id})
            },
            beforeAvatarUpload(file) {
                this.imgFile= file;
            },
            requestImg () {   //  上传logo
                var fileValue = document.querySelector('.el-upload .el-upload__input');
                var url = "https://bit.macsen318.com/btoken/api/upload";
                var formData = new FormData();
                var imgData  = new FormData(fileValue.files[0]);
                formData.append('file', this.imgFile);
                formData.append('sys', 'admin')
                formData.append('token', myToken);
                var xhr = new XMLHttpRequest()
                xhr.open('POST', url, true)
                xhr.send(formData)
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        let responseText  =  xhr.responseText;
                        var responseData  = JSON.parse(responseText);
                        this.imageUrl = responseData.data.url;
                    }
                }
            },
            handleClose(tag) {            //删除标签
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            jumpIndustryPage(){   //跳转编辑行业页面的事件
                let timedata= FormatData(new Date(this.datatime),"yyyy-MM-dd hh:mm:ss");   //更改时间格式
                api.saveDraft({
                    ico_num:this.icoCost,
                    ico_time:timedata,
                    logo:this.imageUrl,
                    symbol:this.symbol
                }).then(data =>{
                    if (data.ret == 1) {
                        alert('保存草稿成功');
                        this.$router.push({path:'industry'});
                    }

                })
            },
            jumpTagPage(){//跳转标签页面保存
                let _th = this;
                let timedata= FormatData(new Date(this.datatime),"yyyy-MM-dd hh:mm:ss");  //更改时间格式
                api.saveDraft({
                    ico_num:this.icoCost,
                    ico_time:timedata,
                    logo:this.imageUrl,
                    symbol:this.symbol,
                    second_id:this.secondId,
                }).then(data =>{
                    if (data.ret == 1) {
                        alert('保存草稿成功');
                        this.$router.push({path:'taglist'});
                    }

                })
            },
            jumpIcoLinkPage(){//跳转图标页面保存
                let tag= [];
                for (let i = 0; i < _th.tags.length; i++) {
                    tag.push(_th.tags[i].id);
                };
                let tagidlist = tag.join(',');
                let textlinks =JSON.stringify(this.textlinks);
                let timedata= FormatData(new Date(this.datatime),"yyyy-MM-dd hh:mm:ss");  //更改时间格式
                api.saveDraft({
                    book_url:this.bookUrl,
                    desc:this.desc,
                    ext_url_data:textlinks,
                    ico_num:this.icoCost,
                    ico_time:timedata,
                    logo:this.imageUrl,
                    second_id:this.secondId,
                    symbol:this.symbol,
                    tagids:tagidlist,
                    url:this.url
                }).then(data =>{
                    if (data.ret == 1) {
                        alert('保存草稿成功');
                        this.$router.push({path:'iconmanage'});
                    }

                })
            },
            createtextlink(){  // 新建文字链接
                let _th = this;
                _th.textlinks.push({textlinkname:this.textlinkname,textlinkaddress:this.textlinkaddress});
                console.log(_th.textlinks)
            },
            removetextlink(index){           //    删除文字链接
                this.textlinks.splice(index,1);
            },
            addiconlink(){             //新增图标链接
                let _th = this;
                _th.iconlinks.push({selecticon:this.selecticon,selecttype:this.selecttype,selectcontent:this.selectcontent})
                console.log(_th.iconlinks)
            },
            removeiconlink(index){ //    删除文字链接
                this.iconlinks.splice(index,1);
            },
            saveDraft(){//保存草稿
                let _th = this;
                let tag= [];
                for (let i = 0; i < _th.tags.length; i++) {
                    tag.push(_th.tags[i].id);
                };
                //更改时间格式
                let timedata= FormatData(new Date(this.datatime),"yyyy-MM-dd hh:mm:ss");
                let tagidlist = tag.join(',');
                let iconlinks =JSON.stringify(this.iconlinks);
                let textlinks =JSON.stringify(this.textlinks);
                api.addProject({
                    status:0,
                    //2白皮书地址
                    whiteBook:this.bookUrl,
                    //3项目描述
                    projectDesc:this.desc,
                    //4图标
                    iconsLink:iconlinks,
                    //5文字链接
                    textLink:textlinks,
                    //6ico成本
                    icoCost:this.icoCost,
                    //7ico时间
                    icoTime:timedata,
                    //8币上传logo图片
                    coinLogo:'www.baidu.com',
                    //9二级ID
                    classId:'1',
                    //10项目名
                    projectName:this.symbol,
                    //11标签
                    tagIds:tagidlist,
                    //12白皮书地址
                    officialWebsite:this.url,
                    //13grade
                    grade:this.grade
                }).then(data =>{
                    if (data.ret == 1) {
                        alert('保存草稿成功');
                    }

                })
            },
            saveRelease(){//保存发布
                let _th = this;
                let tag= [];
                for (let i = 0; i < _th.tags.length; i++) {
                    tag.push(_th.tags[i].id);
                };
                //更改时间格式
                let timedata= FormatData(new Date(this.datatime),"yyyy-MM-dd hh:mm:ss");
                console.log(timedata)
                let tagidlist = tag.join(',');
                let iconlinks =JSON.stringify(this.iconlinks);
                let textlinks =JSON.stringify(this.textlinks);
                api.addProject({
                    //1保存
                    status:1,
                    //2白皮书地址
                    whiteBook:this.bookUrl,
                    //3项目描述
                    projectDesc:this.desc,
                    //4图标
                    iconsLink:iconlinks,
                    //5文字链接
                    textLink:textlinks,
                    //6ico成本
                    icoCost:this.icoCost,
                    //7ico时间
                    icoTime:timedata,
                    //8币上传logo图片
                    coinLogo:'www.baidu.com' ,
                    //9二级ID
                    classId:111,
                    //10项目名
                    projectName:this.symbol,
                    //11标签
                    tagIds:tagidlist,
                    //12白皮书地址
                    officialWebsite:this.url,
                    //13grade
                    grade:this.grade
                }).then(data =>{
                    alert('新建成功');
                }).catch(error=>{
                    console.log(error)
                })

            }
        },
        mounted:function(){
            this.response();
        },

    }
</script>

<style lang="less">
    /*@import '../../style/mixin';*/
    .table_container{
        padding: 20px;
    }
    .rewBox{
        border: 1px solid #ccc;
        margin: 0 20%;
    }
    .formBox{
        margin: 3%;
        margin-top: 6%;
    }

    .uploadImg{float: right;margin-top: -10%;}
    .tags{border: 1px solid #bfcbd9;width:60%;;height: 80px;border-radius: 5px;}
    .textlinklist{
        margin: 2px;
        li{height: 35px;display: flex;justify-content:space-around;
            span{padding: 3px;}
        }
    }
    .iconlinklist{
        margin: 2px;
        li{height: 35px;display: flex;justify-content:space-around;
            span{padding: 3px;}
        }
    }
    .coinslist{
        margin: 3%;
        /*border: 1px solid #cccccc;*/
        li{
            height: 80px;
            /*border-bottom: 1px solid #cccccc;*/
            line-height: 80px;
            span{
                padding-left: 3%;
            }
            ul{
                display: inline-block;
                margin :2%;
                li{height: 20px;
                    line-height: 20px;
                    padding: 5px;
                    border: none;
                }
                .rightLi{
                    float: right;
                    li{text-align: right;}
                }
            }
        }
    }
    .block{
        margin:3% 12%;
    }
    .selectStauts{
        background-color: rgb(174, 224, 224);
    }
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
        top:-20px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .fanhui{
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        padding: 10px 0 0 20%;
    }
    /* 页面样式 */
    /*.createitem{width:50%;border: 1px solid #ccc;padding: 20px 30px;}*/
    /*.textlinklist li{list-style-type: none;margin-left:15%;}*/
    /*.textlinklist li span {border: 1px solid #ccc;height: 28px;}*/

</style>
