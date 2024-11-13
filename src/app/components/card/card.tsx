import { TSearchItem } from '@/app/page';
import styles from './card.module.css';

type TProps = {
    item:TSearchItem;

}
const Card = ({item}:TProps):JSX.Element=>{

    return (
      <div className={styles.cardContainer} key={item.trackId}>
        <div className={styles.thumbnail}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${item.artworkUrl100})` }}
          ></div>
        </div>
        <div className={styles.info}>
          <div className={styles.infoItem}>Track Name :{item.trackName}</div>
          <div className={styles.infoItem}>Artist :{item.artistName}</div>
          <div className={styles.infoItem}>Album :{item.collectionName}</div>
        </div>
      </div>
    );
}
export default Card