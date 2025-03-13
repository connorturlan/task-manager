import styles from "./CardListItem.module.css";

function CardListItem({ title, children }) {
  return (
    <view className={styles.CardListItem}>
      <text>{title || ""}</text>
      <view>{children || ""}</view>
    </view>
  );
}

export default CardListItem;
