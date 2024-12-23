import React, { Suspense } from "react";
import { QueryErrorResetBoundary, useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { fetchData, remove } from "../helper";
import { List } from "../list";
import { queryClient } from "../index";
import Spin from "../img/spin.svg";

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

function Project() {
  const { data } = useSuspenseQuery<PersonDataType[]>({
    queryKey: ["query-demo"],
    queryFn: () => fetchData("people", 1000),
    staleTime: 1 * 1000,
    gcTime: 1 * 1000,
  });

  const { mutate: deleteItem } = useMutation<MutationResultType, Error, MutationPayloadType>({
    mutationFn: (payload) => remove("people", payload.id),
    onSuccess: (data) => {
      console.log(data.errorCode);
      queryClient.invalidateQueries({
        queryKey: ["query-demo"],
      });
    },
  });

  return (
    <>
      <List items={data} onClick={(id: string) => deleteItem({ id })} />
      {/* <button onClick={() => queryClient.invalidateQueries(["query-demo"])}>Refresh</button> */}
    </>
  );
}

const BusySign = () => <Spin className='logo' />;

function Demo() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              There was an error! <button onClick={() => resetErrorBoundary()}>Try again</button>
              <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
            </div>
          )}
          onReset={reset}
        >
          <Suspense fallback={<BusySign />}>
            <Project />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default {
  Component: Demo,
  route: "useSuspenseQuery",
  order: 5,
};
