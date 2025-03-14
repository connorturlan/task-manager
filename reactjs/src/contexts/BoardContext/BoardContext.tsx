import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface CardInterface {
  uuid: string;
  group?: string;
  name: string;
  description: string;
  assignee: string;
  state: string;
}

export interface TitleInterface {
  uuid: string;
  group?: string;
  name: string;
  description?: string;
  hidden?: boolean;
  props?: TitleProps;
}

export interface TitleProps {
  allowCreate?: boolean;
  allowDelete?: boolean;
  allowTimers?: boolean;
}

export interface BoardContextInterface {
  titles: TitleInterface[];
  cards: CardInterface[];
  CreateCard: (card: CardInterface) => void;
  ReadCard: (uuid: string) => CardInterface | undefined;
  UpdateCard: (card: CardInterface) => void;
  DeleteCard: (card: CardInterface) => void;
}

export const BoardContext = createContext({} as BoardContextInterface);

export const BoardProvider = ({ children }) => {
  const [titles, setTitles] = useState([
    {
      uuid: "0",
      name: "todo",
      props: { allowCreate: true, allowDelete: true },
    },
    { uuid: "1", name: "in-progress", props: { allowTimers: true } },
    { uuid: "2", name: "done", props: { allowCreate: true } },
    { uuid: "3", name: "archived", hidden: true },
  ] as TitleInterface[]);

  const [cards, setCards] = useState([] as CardInterface[]);

  const CreateCard = (card: CardInterface) => {
    if (card.uuid === "") card.uuid = uuidv4();

    const temp = cards.slice();
    temp.push(card);
    setCards(temp);
  };

  const ReadCard = (uuid: string): CardInterface | undefined => {
    const index = cards.findIndex((curr) => curr.uuid === uuid);

    if (index < 0) return undefined;

    return cards[index];
  };

  const UpdateCard = (card: CardInterface) => {
    const temp = cards.slice();
    const index = temp.findIndex((curr) => curr.uuid === card.uuid);
    temp[index] = card;
    setCards(temp);
  };

  const DeleteCard = (card: CardInterface) => {
    const temp = cards.slice();
    const index = temp.findIndex((curr) => curr.uuid === card.uuid);
    temp.splice(index, 1);
    setCards(temp);
  };

  const context: BoardContextInterface = {
    titles,
    cards,
    CreateCard,
    ReadCard,
    UpdateCard,
    DeleteCard,
  };

  return (
    <BoardContext.Provider value={context}>{children}</BoardContext.Provider>
  );
};
