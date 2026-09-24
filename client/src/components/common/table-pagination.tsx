import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type TablePaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const TablePagination = ({
  page,
  totalPages,
  onPageChange,
}: TablePaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  const getPages = (): (number | "ellipsis")[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    if (page <= 3) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages]
    }

    if (page >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages]
  }

  const pages: (number | "ellipsis")[] = getPages()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page === 1}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            onClick={(event) => {
              event.preventDefault()

              if (page > 1) {
                onPageChange(page - 1)
              }
            }}
          />
        </PaginationItem>

        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={page === item}
                onClick={(event) => {
                  event.preventDefault()
                  onPageChange(item)
                }}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={page === totalPages}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
            onClick={(event) => {
              event.preventDefault()

              if (page < totalPages) {
                onPageChange(page + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TablePagination
