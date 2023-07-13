import request from '@/utils/request'
import { generateUUID } from '@/utils/generateUUID'
const userid = localStorage.getItem('uid')
/**
 *
 * @param {*} act 行为
 * @param {*} page 页面
 * @param {*} gameId 游戏ID
 * @param {*} playTime 游戏时间
 * @returns
 */
export function userAct(act, page, gameId, playTime){
  return request({
    url: '/user/act',
    method: 'post',
    data: {
      act,
      page,
      gameId,
      playTime,
      uid: userid,
      uuid: generateUUID(),
    },
  })
}

/**
 *
 * @returns 获取首页tab列表
 */
export function getHomeBar(){
  return request({
    url: '/game/index',
    method: 'get',
  })
}

/**
 * 通过类别查游戏列表
 * pageSize 页码
 * limit 页容量
 * categoryId 分类id
 * @param {*} data
 * @returns
 */
export function getGameList(data){
  return request({
    url: '/game/getGamePageByCategory',
    method: 'post',
    data,
  })
}

/**
 * 通过游戏id获取游戏详情
 * @param {*} id
 * @returns
 */
export function getGameInfo(id){
  return request({
    url: `/game/getGameById/${id}`,
    method: 'get',
  })
}

/**
 * 获取推荐游戏列表
 * @param {*} data gameId 当前停留的gameId num 数量
 * @returns
 */
export function getSuggestGames(data){
  return request({
    url: '/game/suggest',
    method: 'post',
    data,
  })
}

/**
 * 获取搜索分类
 * @returns
 */
export function getCategoryList(){
  return request({
    url: '/game/categorylist',
    method: 'get',
  })
}
/**
 * 关键字查询
 * @param {*} key 搜索关键字
 * @param {*} page 页码
 * @param {*} limit 页容量
 * @returns
 */
export function getGameListByKey(key, page, limit){
  return request({
    url: `/game/search?key=${key}&page=${page}&pageSize=${limit}`,
    method: 'get',
  })
}

/**
 * 联系我们
 * @param {*} data
 * @returns
 */
export function contactUs(data){
  return request({
    url: '/contact/upload',
    method: 'post',
    data,
  })
}
