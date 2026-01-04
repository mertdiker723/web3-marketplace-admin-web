import dayjs from 'dayjs'

// Format date with dayjs Example: 04.01.2026 12:00 - DD.MM.YYYY HH:mm
export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return '-'
  return dayjs(date).format('DD.MM.YYYY HH:mm')
}
