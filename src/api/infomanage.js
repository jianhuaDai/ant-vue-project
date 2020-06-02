import { axios } from '@/utils/request'

const api = {
  ADDARCHIVESINFO: '/documents',
  DELETEARCHIVESINFO: '/documents/delete',
  GETARCHIVESINFOLIST: '/documents/page_query'
}
// 添加档案信息
/**
 *
 * @param {
 attachment_url	string
附件链接
author	string
发布人
create_at	string
创建时间
delete_at	string
删除时间
document_id	string
档案编码
regionalism_id	string
行政区划代码
title	string
标题
update_at	string
更新时间
version	integer
版本
water_id	string
河湖编码
type	integer
档案类型:1,一河一档 2,一河一策
 * }
 */
export function addArchivesInfo (params) {
  return axios({
    url: api.ADDARCHIVESINFO,
    method: 'post',
    data: params
  })
}
// 编辑档案信息
export function updateArchivesInfo (id, params) {
    return axios({
        url: `/documents/${id}`,
        method: 'put',
        data: params
    })
}
// 删除档案（逻辑删除）
export function deleteArchivesInfo (id) {
    return axios({
        url: `${api.DELETEARCHIVESINFO}/${id}`,
        method: 'post'
    })
}

// 分页查询档案信息
/**
 * @param {
 * id	string
 主键编码
 keyword	string
 关键词查询
 page	integer
 页数
 page_size	integer
 页大小
 regionalism_id	string
 行政区划代码
 status	integer
 状态1启用0禁用
 type	integer
档案类型:1,一河一档 2,一河一策
 title	string
 标题
 water_name	string
 河湖名称
 * } params
 */
export function getArchivesList (params) {
    return axios({
        url: api.GETARCHIVESINFOLIST,
        method: 'post',
        data: params
    })
}

// 分页查询河湖
export function getRiversAndLakes (params) {
    return axios({
        url: '/water_infos/page_query',
        method: 'post',
        data: params
    })
}
