import { ref } from 'vue'
import { getGameListByKey } from '@/api/index'
export function keySearch(key){
  const gameListRef = ref([])
  const totalRef = ref(0)
  const pageRef = ref(1)
  const limitRef = ref(15)
  const getGameListByKeyFunc = async() => {
    const { data } = await getGameListByKey(key.value, pageRef.value, limitRef.value)
    const { result = [], total = 0 } = data
    gameListRef.value = result
    totalRef.value = total
  }
  return {
    gameListRef,
    getGameListByKeyFunc,
    pageRef,
    limitRef,
    totalRef,
  }
}
