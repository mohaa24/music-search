import { TSearchItem } from '@/app/page';
import styles from './card.module.css';

type TProps = {
    item:TSearchItem;

}
const Card = ({item}:TProps):JSX.Element=>{

    const shortenString = (string: string, maxLength: number) => {
      if (string.length <= maxLength) {
        return string; // Return the string as-is if it's within the limit
      }
      return string.substring(0, maxLength) + "..."; // Truncate and append "..."
    };

    return (
      <div className={styles.cardContainer} key={item.trackId}>
        <div className={styles.thumbnail}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${item.artworkUrl100})` }}
          ></div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            Track Name :{item.trackName ? ` ${shortenString(item.trackName,25)}` : " ---"}
          </div>
          <div className={styles.infoItem}>
            Artist :{item.artistName ? ` ${shortenString(item.artistName,25)}` : " ---"}
          </div>
          <div className={styles.infoItem}>
            Album :{item.collectionName ? ` ${shortenString(item.collectionName,35)}` : " ---"}
          </div>
        </div>
      </div>
    );
}
export default Card;