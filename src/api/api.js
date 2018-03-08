import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    baseURL: 'https://bit.macsen318.com/btoken/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, headers) {

        return qs.stringify({
            ...data,
            sys: 'admin',
            token: 'tgkGGr9lWkPJqL4yJaLQwekJclOuM6O+lACXInVouRpra5t0WWPInIZjzeybmANo',
            systemVersion:7,
            pVersion:1,
            version:1,
            system:'win',
            channel : 1,
            mobileInfo:'rate-admin',
        })
    }]
})

instance.interceptors.response.use(res => { // 拦截请求后的状态
    if (res.data.ret === 1) {
        return res.data.data
    } else {
        return Promise.reject(res.data)
    }
})

//评级项目列表
export const projectList = params => {
    return instance.post('/rate/admin/project_list',params)
}
//评级项目新增
export const addProject = params => {
    return instance.post('rate/admin/add_project', params)
}
//评级项目编辑
export const editProject = params => {
    return instance.post('/rate/admin/edit_project', params)
}
//评级项目增加章节
export const bannerDelete = params => {
    return instance.post('/rate/admin/addChapterForProject', params)
}
//编辑标签/删除标签
export const modifyOrDeleteTag = params => {
    return instance.post('/rate/admin/modifyOrDeleteTag', params)
}
//编辑一级行业
export const editClassFirst = params => {
    return instance.post('/rate/admin/edit_class_first', params)
}
//删除二级行业
export const deleteClassSecond = id => {
    return instance.post('/rate/admin/delete_class_second', {id})
}
//下架/归档项目
export const adultList = id => {
    return instance.post('/rate/admin/offProject', id)
}
//新建标签
export const addTag = params => {
    return instance.post('/admin/tag/add',params)
}
//查询标签列表
export const getTagList = () => {
    return instance.post('/admin/tag/list')
}
//点击标签获取币列表
export const getTagIcoList = params => {
    return instance.post('/admin/coin/all_coins_by_tagid',params)
}
//查询一级行业列表
export const getFristIndustryList = () => {
    return instance.post('/admin/class/look_first')
}
//新建一级行业列表
export const addFristIndustryList = params => {
    return instance.post('/admin/class/add_first',params)
}
//删除行业列表
export const removeIndustry = params => {
    return instance.post('admin/class/del',params)
}
//查看二级行业列表
export const getSecondIndustryList = params => {
    return instance.post('/admin/class/look_second',params)
}
//新建二级行业列表
export const addSecondIndustryList = params => {
    return instance.post('/admin/class/add_second',params)
}
//点击二级行业查看对应币列表
export const getSecondIcoList = params => {
    return instance.post('/admin/class/look_project',params)
}
