import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    baseURL: 'https://bit.macsen318.com/btoken/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, headers) {
        // Do whatever you want to transform the data

        return qs.stringify({
            ...data,
            sys: 'admin',
            token: localStorage.token
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
export const projectList = parmas => {
    return instance.post('/rate/admin/project_list',parmas)
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
