import "./List.css";

type ListItemDataType = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export const List = ({ items, onClick }: { items?: ListItemDataType[]; onClick?: (id: string) => void }) => {
  return !items?.length ? (
    <strong>No data available</strong>
  ) : (
    <ul>
      {items?.map((x: any, index: number) => (
        <li key={index} onClick={() => onClick?.(x.id)}>
          <div>#{x.id}</div>
          <div>{x.name}</div>
          <div>{x.phone}</div>
          <div>{x.email}</div>
        </li>
      ))}
    </ul>
  );
};
