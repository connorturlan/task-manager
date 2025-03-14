import { useContext, useEffect, useState } from "react";
import {
  BoardContext,
  CardInterface,
  TitleInterface,
  TitleProps,
} from "../../contexts/BoardContext/BoardContext";
import styles from "./CardList.module.scss";

interface CardProps {
  data: CardInterface;
  props: TitleProps;
}

const Card = ({ data, props }: CardProps) => {
  const { DeleteCard } = useContext(BoardContext);
  const [showModal, setModalState] = useState(false);

  const deleteCard = () => {
    confirm("are you sure you want to delete this card?") && DeleteCard(data);
  };

  const handleDragStart = (event: any) => {
    event.dataTransfer.setData("application/json", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <div
        className={styles.Card}
        onClick={() => {
          setModalState(true);
        }}
        onDragStart={handleDragStart}
        draggable
      >
        <h3>{data.name}</h3>
        <p>Assigned to: {data.assignee}</p>
        <p>{data.description}</p>
        {props.allowDelete && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              deleteCard();
            }}
          >
            ⨉
          </button>
        )}
        {props.allowTimers && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              console.log("timer started");
            }}
          >
            time
          </button>
        )}
      </div>
      {showModal && (
        <CardModal
          data={data}
          HandleHide={() => {
            setModalState(false);
          }}
        />
      )}
    </>
  );
};

interface CardModalProps {
  data: CardInterface;
  HandleHide?: () => void;
}

const CardModal = ({ data, HandleHide }: CardModalProps) => {
  const { UpdateCard } = useContext(BoardContext);

  const HandleCardNameUpdate = (event) => {
    data.name = event.target.value;
    UpdateCard(data);
  };

  const HandleCardDescriptionUpdate = (event) => {
    data.description = event.target.value;
    UpdateCard(data);
  };

  const HandleCardAssigneeUpdate = (event) => {
    data.assignee = event.target.value;
    UpdateCard(data);
  };

  return (
    <div className={styles.CardModal_Blackout} onClick={HandleHide}>
      <div
        className={styles.CardModal}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onKeyDown={(event) => event.key === "Enter" && HandleHide()}
      >
        <h3>Name</h3>
        <input onChange={HandleCardNameUpdate} value={data.name} />
        <h3>Description</h3>
        <input
          onChange={HandleCardDescriptionUpdate}
          value={data.description}
        />
        <h3>Assignee</h3>
        <input onChange={HandleCardAssigneeUpdate} value={data.assignee} />
      </div>
    </div>
  );
};

interface CardListProps {
  title: TitleInterface;
  cards: CardInterface[];
}

export const CardList = ({ title, cards }: CardListProps) => {
  const { CreateCard, UpdateCard } = useContext(BoardContext);

  const [hoverClassName, setHoverClassName] = useState("");

  const createCard = () => {
    console.log("let's go!");
    CreateCard({
      uuid: "",
      name: "hello, world!",
      description: "hello, world!",
      assignee: "connor",
      state: title.uuid,
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setHoverClassName(styles.CardList_DragHover);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setHoverClassName("");
  };

  const handleDragDrop = (event) => {
    event.preventDefault();
    setHoverClassName("");
    const json = event.dataTransfer.getData("application/json");
    const data = JSON.parse(json) as CardInterface;

    data.state = title.uuid;
    UpdateCard(data);
  };

  return (
    <div
      className={`${styles.CardList} ${hoverClassName}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
    >
      <h2 className={styles.CardListTitle}>{title.name}</h2>
      {title.props && title.props.allowCreate && (
        <button onClick={createCard}>+</button>
      )}
      {cards.map((card) => {
        return <Card key={card.uuid} data={card} props={title.props || {}} />;
      })}
    </div>
  );
};
