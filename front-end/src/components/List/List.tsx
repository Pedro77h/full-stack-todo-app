import { Column } from "components";
import { ITodo } from "types";
import { ListItem, ListItemProps } from "./ListItem";

type ListProps = {
  items: ITodo[];
  selectedIndex: number;
  onClick: (index: number) => void;
};

export const List: React.FC<ListProps> = ({ items, selectedIndex, onClick }) => {
  return (
    <Column py="10px">
      {items.map((item, index) => (
        <ListItem key={index} {...item} isActive={index === selectedIndex} index={index} onClick={onClick} />
      ))}
    </Column>
  );
};