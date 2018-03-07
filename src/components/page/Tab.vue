<template>
        <el-row :gutter="18" style="margin-left:10%;">
            <div class="newlabel">
                <el-button plain  @click="createlabel=true">创建标签</el-button>
                    <el-dialog title="创建标签" :visible.sync="createlabel"
                   >
                        <el-form >
                            <el-form-item label="标签名称" >
                                <el-input  type="text" v-model="labelname"></el-input>
                            </el-form-item>
                            <el-form-item label="字体颜色" >
                                <el-input type="color" v-model="fontcolor"></el-input>
                            </el-form-item>
                            <el-form-item label="背景颜色" >
                                <el-input type="color"  v-model="bgcolor"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="createlabel = false,addlabelok() " >确 定</el-button>
                        </div>
                    </el-dialog>
                <el-button plain @click="reviselabel=true">修改标签</el-button>
                 <el-dialog title="修改标签" :visible.sync="reviselabel">
                        <el-form >
                            <el-form-item label="标签名称" >
                            <el-input auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="reviselabel = false">确 定</el-button>
                        </div>
                    </el-dialog>
            </div>
            <el-col :span="7">
                <div class="labellist"  >
                    <ul>
                        <!--<li v-for="(item,items) in labellist" v-bind:key="items" style="margin:10% 30%;" size="medium" ref="labelname">{{item.labelname}}</li>-->
                    </ul>
                </div>
            </el-col>
             <el-col :span="16" class="labellist" style="padding-left:0px;padding-right:0px;">
                 <ul>
                     <li v-for="(item,items) in labellist" v-bind:key="items"  size="medium" ref="labelname">{{item.labelname}}</li>
                 </ul>
             </el-col>
        </el-row>
</template>
<script>
import Vue from 'vue';
    export  default {
        data(){
            return{
               createlabel:false,
               reviselabel:false,
               labelname:"",
               labellist:[],
               fontcolor:'#000000',
               bgcolor:'#ffffff',
               addlabel:''

            }
        },
        created (){
            // this.request();
        },
        mounted(){

        },
        methods:{

        }
    }
</script>
<style>

   .labellist ul li{list-style-type: none;height: 50px;border-bottom: 1px solid #ccc;line-height: 50px;
       margin: 0;}
    .labellist ul li:nth-of-type(odd){ background:#edf1f0;}
     .labellist ul  li:nth-of-type(even){ background:#ebddde;}
    .newlabel{margin-left: 10px;}
    .labellist{margin-top: 30px; height: 600px;border: 1px solid #ccc;}


</style>
