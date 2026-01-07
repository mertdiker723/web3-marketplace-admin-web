import { reactive } from 'vue'
import { defineStore } from 'pinia'

type SnackbarColor = 'success' | 'error' | 'warning' | 'info'

interface SnackbarState {
  show: boolean
  message: string
  color: SnackbarColor
  icon: string
}

export const useSnackbarStore = defineStore('snackbar', () => {
  const state = reactive<SnackbarState>({
    show: false,
    message: '',
    color: 'info',
    icon: '',
  })

  const showSnackbar = (message: string, color: SnackbarColor = 'info', icon?: string) => {
    state.message = message
    state.color = color
    state.icon = icon || getDefaultIcon(color)
    state.show = true
  }

  const showSuccess = (message: string) => {
    showSnackbar(message, 'success', 'mdi-check-circle')
  }

  const showError = (message: string) => {
    showSnackbar(message, 'error', 'mdi-alert-circle')
  }

  const showWarning = (message: string) => {
    showSnackbar(message, 'warning', 'mdi-alert')
  }

  const showInfo = (message: string) => {
    showSnackbar(message, 'info', 'mdi-information')
  }

  const hideSnackbar = () => {
    state.show = false
  }

  const getDefaultIcon = (color: SnackbarColor): string => {
    const icons: Record<SnackbarColor, string> = {
      success: 'mdi-check-circle',
      error: 'mdi-alert-circle',
      warning: 'mdi-alert',
      info: 'mdi-information',
    }
    return icons[color]
  }

  return {
    state,
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar,
  }
})
