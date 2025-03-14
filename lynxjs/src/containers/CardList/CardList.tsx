import styles from "./CardList.module.css";

function CardList({ children }) {
  return <view className={styles.CardList}>{children || "loading"}</view>;
}

export default CardList;
