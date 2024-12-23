import { useMutation, useQuery } from "@tanstack/react-query";
import Spin from "../img/spin.svg";
import { fetchData, remove } from "../helper";
import { List } from "../list";
import { queryClient } from "../index";

type PersonDataType = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type MutationPayloadType = {
  id: string;
};
type MutationResultType = {
  errorCode: string;
};

function Demo({}: { setRoute?: (uri: string) => void }) {
  const { data, refetch, isLoading, isFetching, isRefetching } = useQuery<PersonDataType[]>({
    queryKey: ["query-demo"],
    queryFn: () => fetchData("people", 0),
    staleTime: 1 * 1000,
    gcTime: 1 * 1000,
  });

  const { mutate: deleteItem } = useMutation<MutationResultType, Error, MutationPayloadType>({
    mutationFn: (payload) => remove("people", payload.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["query-demo"],
      });
    },
  });

  return (
    <>
      <StatusIndicator {...{ isLoading, isFetching, isRefetching }} />

      <List
        items={data}
        onClick={
          (id: string) => deleteItem({ id }) // setRoute?.(`details/${id}`)
        }
      />

      <button onClick={() => refetch()}>Refresh</button>
    </>
  );
}

export const StatusIndicator = ({
  isLoading,
  isFetching,
  isRefetching,
}: {
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
}) => (
  <>
    {!!isLoading && <h4>Loading...</h4>}
    {!!isRefetching && <h4>Refetching...</h4>}
    {!!isFetching && <BusySign />}
  </>
);

const BusySign = () => <img src={Spin} className='logo' alt='Busy' />;

export const DeleteButton = ({ id }: { id: string }) => {
  const { mutate: removeItem } = useMutation({
    mutationFn: (id: string) => remove("people", id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["query-demo"],
      });
    },
  });

  const onClick = () => {
    if (!!confirm(`Confirm to delete #${id}?`)) {
      removeItem(id);
    }
  };

  return <button onClick={onClick}>Delete</button>;
};

export default {
  Component: Demo,
  route: "query",
  order: 2,
};
