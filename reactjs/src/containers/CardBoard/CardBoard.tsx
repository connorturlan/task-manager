import { useContext } from "react";
import styles from "./CardBoard.module.scss";
import CardList from "../../components/CardList";
import {
  BoardContext,
  BoardProvider,
} from "../../contexts/BoardContext/BoardContext";

export const CardBoardBox = (props) => {
  const { titles, cards } = useContext(BoardContext);

  return (
    <div className={styles.CardBoardContainer}>
      {/* <button onClick={createCard}>create?</button> */}
      <div className={styles.CardBoard}>
        {titles
          ? titles.map((title) => {
              return (
                <CardList
                  key={title.uuid}
                  title={title}
                  cards={cards.filter((card) => card.state === title.uuid)}
                />
              );
            })
          : "issue occured while getting workflow, contact your administrator"}
      </div>
    </div>
  );
};

export const CardBoard = (props: Object) => {
  return (
    <BoardProvider>
      <CardBoardBox />
    </BoardProvider>
  );
};
