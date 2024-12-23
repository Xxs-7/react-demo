import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../helper";

function Demo({ param }: { param?: string }) {
  const { data, isError, error } = useQuery({
    queryKey: ["query-demo", { id: param }],
    queryFn: () => fetchData(`people/${param}`, 0),
    retry: 1,
    enabled: !!param,
  });

  return !!isError ? (
    <ErrorIndicator {...{ error }} />
  ) : !param ? (
    <h1>NO param</h1>
  ) : !data ? (
    <h1>NO data</h1>
  ) : (
    <>
      <h5>#{data.id}</h5>
      <h5>{data.name}</h5>
      <h5>{data.email}</h5>
      <h5>{data.phone}</h5>
    </>
  );
}

export default {
  Component: Demo,
  route: "details",
  order: 3,
};

export const ErrorIndicator = ({ error }: { error: Error }) => (
  <div className='error'>
    <strong>Error: {error.message}</strong>
  </div>
);
