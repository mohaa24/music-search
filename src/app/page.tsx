'use client'
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [searchString, setSearchString] = useState("jack");
  const [data, setData] = useState(null);

  const getData = async (string) => {
    try {
      const url = ` https://itunes.apple.com/search?term=${string}&entity=musicVideo`;
      const response = await fetch(url);
      const dataJSON = await response.json();
      setData(dataJSON);
    } catch (error) {
      console.error(response.status);
    }
  };

  const onSearch = () => {
    getData(searchString);
  };

  const onType = (string) => {
    setSearchString(string);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="">iTunes Search</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            value={searchString}
            placeholder="search here.."
            onChange={(event) => {
              onType(event.target.value);
            }}
          />
          <button
            onClick={() => {
              onSearch();
            }}
          >
            {" "}
            Search
          </button>
        </div>

        <div className={styles.resultsContainer}>
          <div className={styles.results}>
            {data &&
              data.results &&
              data.results.map((item) => {
                return (
                  <div className={styles.cardContainer}>
                    <div className={styles.thumbnail}>
                      {/* <img src={item.artworkUrl60} /> */}
                    </div>
                    <div className={styles.info}>
                      <div className={styles.infoItem}>
                        Track Name :{item.trackName}
                      </div>
                      <div className={styles.infoItem}>
                        Artist :{item.artistName}
                      </div>
                      <div className={styles.infoItem}>
                        Album :{item.collectionName}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
