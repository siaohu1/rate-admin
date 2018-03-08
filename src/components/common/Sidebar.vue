<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-document',
                        index: 'projectList',
                        title: '项目列表'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'industryList',
                        title: '行业列表'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'votingList',
                        title: '投票列表'
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'tagManagement',
                        title: '标签管理'
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
        text-align: center;
    }
</style>
