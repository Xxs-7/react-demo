import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { PersonDataType, createNew, fetchData } from "../helper";

function Demo({ setRoute }: { setRoute?: (uri: string) => void }) {
  const { data: peopleList } = useQuery({
    queryKey: ["query-demo"],
    queryFn: () => fetchData("people", 0),
  });
  const { mutate: create, isPending } = useMutation({
    mutationFn: (data: PersonDataType) => createNew("people", data),
    onSuccess: () => {
      setRoute?.("query");
    },
  });

  const onSubmit = (data: PersonDataType) => {
    create({
      ...data,
      id: (getMaxId(peopleList) + 1).toString(),
    });
  };

  return <Form onSubmit={onSubmit} isBusy={isPending} />;
}

const getMaxId = (list?: PersonDataType[]) => {
  if (!list?.length) return 0;

  const ids = list.map((x: PersonDataType) => parseInt(x.id)).sort((a: number, b: number) => (a < b ? 1 : -1));
  return ids[0];
};

const Form = ({ onSubmit, isBusy }: { isBusy: boolean; onSubmit: (data: PersonDataType) => void }) => {
  const refName = useRef<HTMLInputElement | null>(null);
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPhone = useRef<HTMLInputElement | null>(null);

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!refName.current?.value || !refEmail.current?.value || !refPhone.current?.value) return;
    else
      onSubmit({
        id: "",
        name: refName.current.value,
        email: refEmail.current.value,
        phone: refPhone.current.value,
      });
  };

  return (
    <div className='container'>
      <form
        action=''
        style={{
          fontSize: "1.4rem",
        }}
      >
        <div>
          <label>Name</label>
          <input ref={refName} type='text' />
        </div>
        <div>
          <label>Email</label>
          <input ref={refEmail} type='text' />
        </div>
        <div>
          <label>Phone</label>
          <input ref={refPhone} type='text' />
        </div>
        <div>
          <div></div>
          <button disabled={isBusy} onClick={submit}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default {
  Component: Demo,
  route: "create",
  order: 4,
};
