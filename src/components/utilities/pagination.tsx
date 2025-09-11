'use client'
import { Button } from '@/components/ui/button'
import { generatePagination } from '@/lib/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

const PaginationTemplate = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  const paginationNumbers = generatePagination(currentPage, totalPages)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
        {/* Previous Button */}
        <Button variant="outline" size="sm" disabled={currentPage <= 1} asChild={currentPage > 1}>
          {currentPage > 1 ? (
            <Link href={`${baseUrl}?page=${currentPage - 1}`}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Link>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </>
          )}
        </Button>

        {/* Page Numbers */}
        {paginationNumbers.map((pageNumber, index) => (
          <div key={index}>
            {pageNumber === '...' ? (
              <Button variant="ghost" size="sm" disabled>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant={currentPage === pageNumber ? 'default' : 'outline'}
                size="sm"
                asChild
              >
                <Link href={`${baseUrl}?page=${pageNumber}`}>{pageNumber}</Link>
              </Button>
            )}
          </div>
        ))}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          asChild={currentPage < totalPages}
        >
          {currentPage < totalPages ? (
            <Link href={`${baseUrl}?page=${currentPage + 1}`}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Link>
          ) : (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </>
          )}
        </Button>
      </div>

      {/* Page Info */}
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  )
}

export default PaginationTemplate
