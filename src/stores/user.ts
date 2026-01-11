import { reactive } from 'vue'
import { defineStore } from 'pinia'

import type { IUser } from '@/types/user/user.model'

interface IUserState {
  data: Partial<IUser> | null
}

export const useUserStore = defineStore('user', () => {
  const state = reactive<IUserState>({
    data: null,
  })

  const setUser = (userData: Partial<IUser>) => {
    state.data = userData
  }

  const clearUser = () => {
    state.data = null
  }

  return {
    state,
    setUser,
    clearUser,
  }
})
