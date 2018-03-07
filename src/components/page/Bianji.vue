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
        <div class="fanhui" @click='goBack'><i class="el-icon-arrow-left
"></i></div>
        <el-row :gutter="20" style="overflow: auto">

            <el-col :span="16" style="border:1px solid #ccc;margin:3% 10%;overflow: auto">
                <el-upload

                    action="https://wd6758545005srbqnl.wilddogio.com/imglist"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span >上传logo<br>只能上传JPG / PNG文件，且不超过500KB</span>
                <el-form ref="form" style="margin:20px 10px;" :label-position="labelPosition">

                    <el-form-item label="项目名称">
                        <el-col :span="10">
                            <el-input v-model="programName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="ICO 成本">
                        <el-col :span="10">
                            <el-input v-model="icocost"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="ICO 时间">
                        <el-col :span="10">
                            <el-date-picker
                                v-model="icotime"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="选择行业">
                        <el-select size="small" style="width: 100px;margin-left:1%;"
                                   v-model="selectlevelone"
                                   placeholder="请选择"
                                   v-on:change="getProv($event)">
                            <el-option
                                v-for="item in provs" v-bind:key="item"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select size="small" style="width: 100px"
                                   v-if="selectProv!=''"
                                   v-model="selectleveltwo"
                                   placeholder="请选择行业"
                                   v-on:change="getCity($event)">
                            <el-option
                                v-for="item in citys" v-bind:key="item"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button  size="small" @click="jumptrade =true">编辑行业</el-button>
                        <el-dialog
                            title="提示"
                            :visible.sync="jumptrade"
                            width="30%"
                        >
                            <span>是否跳转到编辑行业页面?</span>
                            <span slot="footer" class="dialog-footer">
                                    <el-button @click="jumptrade = false">取 消</el-button>
                                    <el-button type="primary" @click="jumptrade = false,jumptradeok() " >确 定</el-button>
                                </span>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="添加标签">
                        <el-col :span="10">
                            <el-input style="position: relative;" v-model="sreachtab"></el-input>
                            <el-button style="position: absolute;top:0px;left:42%; " @click="addtab">添加</el-button>
                            <el-button  size="small" style="margin-left:-1px;" @click="jumptab=true">搜索不到，请新增标签</el-button>
                            <el-dialog
                                title="提示"
                                :visible.sync="jumptab"
                                width="30%"
                            >
                                <span>是否跳转到标签列表页面</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="jumptab = false">取 消</el-button>
                                    <el-button type="primary" @click="jumptab = false,jumptabok() " >确 定</el-button>
                                </span>
                            </el-dialog>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="已有标签">
                        <el-col :span="10" style="border:1px solid #bfcbd9;height:100px;margin-left:6px;border-radius:5px;">
                            <el-tag
                                v-for="tag in tags"
                                :key="tag.name"
                                closable
                                :disable-transitions="false"
                                :type="tag.type"
                                style="margin:0 8px;"
                                @close="handleClose(tag)">
                                {{tag.name}}
                            </el-tag>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="项目介绍">
                        <el-col :span="10">
                            <el-input type="textarea" v-model="itemintroduce" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="官网链接">
                        <el-col :span="10">
                            <el-input placeholder="请输入链接" v-model="officelink" >
                                <template slot="prepend" >Http://</template>
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="白皮书">
                        <el-col :span="10">
                            <el-input style="margin-left:3%;" placeholder="请输入链接" v-model="whitebooklink">
                                <template slot="prepend">Http://</template>
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
                        <li v-for="(item,items) in textlinks" v-bind:key="items"><span >{{item.textlinkname}}</span><span style="width:20%;">http://{{item.textlinkaddress}}</span>
                            <el-button @click="removetextlink(index)" size="small">删除</el-button>
                        </li>
                    </ul>
                    <!-- <el-form-item>
                       <el-button @click="adminiconLink" style="margin-left:9%;">管理图标链接</el-button>
                        <el-button @click="addiconlink" style="margin-left:9%;">新增图标链接</el-button>
                   </el-form-item> -->
                    <el-form-item style="margin-left:13%;">
                        <el-button>管理图标链接</el-button>
                        <el-button @click="addiconlink">新增图标链接</el-button>
                    </el-form-item>
                    <el-form-item label="图标下拉框">
                        <el-col :span="4">
                            <el-select v-model="selecticon" placeholder="选择图标" style="display:inline-block;">
                                <el-option label="微信" value="wechat"></el-option>
                                <el-option label="微博" value="weibo"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="selecttype" placeholder="选择类型" style="display:inline-block;">
                                <el-option label="链接" value="wechat"></el-option>
                                <el-option label="图片" value="weibo"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-input style="position: absolute;width:30%;" v-model="selectcontent" ></el-input>
                        </el-col>
                    </el-form-item>
                    <ul class="iconlinklist">
                        <li v-for="(item,items) in iconlinks" v-bind:key="items"><span >{{item.selecticon}}</span><span style="width:20%;">{{item.selecttype}}</span><span style="width:20%;">{{item.selectcontent}}</span>
                            <el-button @click="removeiconlink(index)" size="small">删除</el-button>
                        </li>
                    </ul>
                    <hr >
                    <br><br>
                    <el-form-itme style="margin-left:30%;">
                        <el-button @click="savedraft()">保存草稿</el-button>
                        <el-button @click="savepublish()">保存发布</el-button>
                    </el-form-itme>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {

        data() {
            return {
                dialogImageUrl:'',
                programName:'',
                icocost:'',
                icotime:'',
                selectlevelone:'',
                selectleveltwo:'',
                itemintroduce:'',
                officelink:'',
                whitebooklink:'',
                additem:'',
                //搜索标签
                sreachtab:'',
                //跳转编辑行业
                jumptrade:false,
                jumptab:false,
                //新建文字链接
                textlinks:[],
                textlinkname:'',
                textlinkaddress:'',
                //图标链接
                selecticon:'',
                selecttype:'',
                selectcontent:'',
                iconlinks:[],
                labelPosition: 'right',
                provs:[{label:"北京市",value:"北京市"},
                    {label:"天津市",value:"天津市"},
                    {label:"河北省",value:"河北省"},
                    {label:"山西省",value:"山西省"}] ,
                citys: [],
                selectProv: '',
                selectCity: '',
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                dialogImageUrl: '',
                dialogVisible: false,
                textarea: '',
                name: 'linxin',
                imageUrl: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                icotime: '',
                value8: '',
                value9: '',
                value10:'',
                value11:'',
                tags: []
            }
        },
        mounted(){

        },

        watch:{
            //搜索tab
            sreachtab(curVal,oldVal){
                console.log(oldVal )
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{


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
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            onSubmit() {
                console.log('submit!');
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            getProv: function (prov) {
                let tempCity=[];
                this.citys=[];
                this.selectCity='';
                let allCity=[{
                    prov: "北京市",
                    label: "北京市"
                }, {
                    prov: "天津市",
                    label: "天津市"
                }, {
                    prov: "河北省",
                    label: "石家庄市"
                }, {
                    prov: "河北省",
                    label: "唐山市"
                }, {
                    prov: "河北省",
                    label: "秦皇岛市"
                }, {
                    prov: "河北省",
                    label: "邯郸市"
                }, {
                    prov: "河北省",
                    label: "邢台市"
                }, {
                    prov: "河北省",
                    label: "保定市"
                }, {
                    prov: "河北省",
                    label: "张家口市"
                }, {
                    prov: "河北省",
                    label: "承德市"
                }, {
                    prov: "河北省",
                    label: "沧州市"
                }, {
                    prov: "河北省",
                    label: "廊坊市"
                }, {
                    prov: "河北省",
                    label: "衡水市"
                }, {
                    prov: "山西省",
                    label: "太原市"
                }, {
                    prov: "山西省",
                    label: "大同市"
                }, {
                    prov: "山西省",
                    label: "阳泉市"
                }, {
                    prov: "山西省",
                    label: "长治市"
                }, {
                    prov: "山西省",
                    label: "晋城市"
                }, {
                    prov: "山西省",
                    label: "朔州市"
                }, {
                    prov: "山西省",
                    label: "晋中市"
                }, {
                    prov: "山西省",
                    label: "运城市"
                }, {
                    prov: "山西省",
                    label: "忻州市"
                }, {
                    prov: "山西省",
                    label: "临汾市"
                }, {
                    prov: "山西省",
                    label: "吕梁市"
                }];
                for (var val of allCity){
                    if (prov == val.prov){
                        console.log(val);
                        tempCity.push({label: val.label, value: val.label})
                    }
                }
                this.citys = tempCity;
            },
            getCity: function (city) {
                console.log(city);
                console.log(this.selectCity)
            }

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
    /* 页面样式 */
    .createitem{width:50%;border: 1px solid #ccc;padding: 20px 30px;}
    .textlinklist li{list-style-type: none;margin-left:15%;}
    .textlinklist li span {border: 1px solid #ccc;height: 28px;}

</style>
