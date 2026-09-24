import { useSearchParams } from "react-router"

export type SortOrder = "asc" | "desc"

export type SortOption<TSort extends string> = {
  label: string
  value: TSort
}

export type TableParams<TSort extends string> = {
  search: string
  sortBy?: TSort
  sortOrder: SortOrder
  page: number
  limit: number
}

type UseTableParamsOptions<TSort extends string> = {
  defaultSortBy?: TSort
  defaultSortOrder?: SortOrder
  defaultLimit?: number
}

export const useTableParams = <TSort extends string>({
  defaultSortBy,
  defaultSortOrder = "desc",
  defaultLimit = 50,
}: UseTableParamsOptions<TSort> = {}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("search") ?? ""

  const sortByParam = searchParams.get("sortBy")

  const sortBy = sortByParam ? (sortByParam as TSort) : defaultSortBy

  const sortOrder =
    searchParams.get("sortOrder") === "asc" ? "asc" : defaultSortOrder

  const page = Number(searchParams.get("page")) || 1

  const limit = Number(searchParams.get("limit")) || defaultLimit

  const params: TableParams<TSort> = {
    search,
    sortBy,
    sortOrder,
    page,
    limit,
  }

  const setSearch = (value: string) => {
    setSearchParams((current) => {
      if (value.trim()) {
        current.set("search", value)
      } else {
        current.delete("search")
      }

      current.set("page", "1")

      return current
    })
  }

  const setSortBy = (value: TSort) => {
    setSearchParams((current) => {
      current.set("sortBy", value)
      current.set("page", "1")

      return current
    })
  }

  const setSortOrder = (value: SortOrder) => {
    setSearchParams((current) => {
      current.set("sortOrder", value)
      current.set("page", "1")

      return current
    })
  }

  const setPage = (value: number) => {
    setSearchParams((current) => {
      current.set("page", String(value))

      return current
    })
  }

  const setLimit = (value: number) => {
    setSearchParams((current) => {
      current.set("limit", String(value))
      current.set("page", "1")

      return current
    })
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  return {
    params,
    setSearch,
    setSortBy,
    setSortOrder,
    setPage,
    setLimit,
    clearFilters,
  }
}
