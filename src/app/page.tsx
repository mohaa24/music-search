"use client";
import { useState } from "react";
import styles from "./page.module.css";


type TSearchItem = {
  artistName: string;
  trackName: string;
  collectionName: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  trackId:number;
}; 

type TData = {
  resultCount:number
  results:TSearchItem[]
}

export default function Home() {
  const [searchString, setSearchString] = useState("jack");
  const [data, setData] = useState<null|TData>(null);

  const getData = async (string: string) => {
    try {
      const url = ` https://itunes.apple.com/search?term=${string}&entity=musicVideo`;

      const response = await fetch(url);

      if (!response.ok) {
        console.warn(response.status); // warn the user on api error
      }
      const dataJSON = await response.json();
      setData(dataJSON);
    } catch (error) {
      console.error(error); // other errors
    }
  };

  const onSearch = () => {
    getData(searchString);
  };

  const onType = (string:string) => {
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
              data.results.map((item:TSearchItem) => {
                return (
                  <div className={styles.cardContainer} key={item.trackId}>
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
