import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateStr: string | null) => {
  if (!dateStr) return 'N/A'

  const date = new Date(dateStr)
  const formatter = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
  })
  return formatter.format(date)
}

export const formatSeason = (season: string | null) => {
  if (!season) return 'N/A'
  const seasonMap: Record<string, string> = {
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    winter: 'Winter',
  }
  return seasonMap[season] || season
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // Jika total halaman kurang dari atau sama dengan 7, tampilkan semua
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Jika halaman saat ini di awal (1-3)
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // Jika halaman saat ini di akhir (totalPages-2 sampai totalPages)
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // Untuk halaman di tengah
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}
