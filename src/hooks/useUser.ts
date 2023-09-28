import { fetchUsers } from "../services/users";
import { type User } from '../types.d'
import { useInfiniteQuery } from '@tanstack/react-query'


export const useUsers = () =>{
  const { isLoading, 
    isError, 
    data, 
    refetch, 
    fetchNextPage, 
    hasNextPage 
  } = useInfiniteQuery<{
     nextCursor?: number, users: User[] }>(
      ['users'],
      fetchUsers,
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        //cancela el hacer que haga fetch cuando va y viene entre paginas
        refetchOnWindowFocus: false
      }
  )

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users : data?.pages?.flatMap(page => page.users) ?? [],
    hasNextPage
  }
}