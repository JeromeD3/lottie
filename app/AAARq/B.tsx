import { useQuery } from '@tanstack/react-query'
import { getTranslation } from './actions'

export default function B({ currentId }: any) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['translation', currentId],
    queryFn: () =>
      getTranslation({
        currentId,
      }),
    retry: true,
    retryDelay: 500,
  })

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>loading</div>
  if (data) {
    return (
      <>
        <>{data.result.targetText}</>
      </>
    )
  }
}
