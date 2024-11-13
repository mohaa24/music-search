"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Card from "./components/card/card";
import Spinner from "./components/spinner/spinner";

export type TSearchItem = {
  artistName: string;
  trackName: string;
  collectionName: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  trackId: number;
};

type TData = {
  resultCount: number;
  results: TSearchItem[];
};

export default function Home() {
  const [searchString, setSearchString] = useState("jack");
  const [data, setData] = useState<null | TData>(null);
  const [pageState, setPageState] = useState<"results" | "search" | "loading">(
    "search"
  );

  const getData = async (string: string) => {
    try {
      const url = ` https://itunes.apple.com/search?term=${string}&entity=musicVideo`;

      const response = await fetch(url);

      if (!response.ok) {
        console.warn(response.status); // warn the user on api error
      }
      const dataJSON = await response.json();
      setData(dataJSON);
      setPageState('results')
    } catch (error) {
      console.error(error); // other errors
    }
  };


  
  const onSearch = () => {
    getData(searchString);
    setPageState("loading");
  };

  const onType = (string: string) => {
    setSearchString(string);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="">iTunes Search</h1>
        {pageState === "results" && (
          <div className={styles.backBtnCtr}>
            <button
              className={styles.backBtn}
              onClick={() => {
                setPageState("search");
              }}
            >
              {" "}
              Back to search
            </button>
          </div>
        )}
        {pageState === "loading" && (
          <div className={styles.loading}>
            Loading... <Spinner size={20} />
          </div>
        )}
        {pageState === "search" && (
          <div className={styles.searchContainer}>
            <div className={styles.wrap}>
              <div className={styles.search}>
                <input
                  type="text"
                  value={searchString}
                  placeholder="search here.."
                  onChange={(event) => {
                    onType(event.target.value);
                  }}
                  className={styles.searchTerm}
                />
                <button
                  onClick={() => {
                    onSearch();
                  }}
                  className={styles.searchButton}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}

        {pageState === "results" && (
          <div className={styles.resultsContainer}>
            <div className={styles.results}>
              {data &&
                data.results &&
                data.results.map((item: TSearchItem) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Card item={item}></Card>
                  );
                })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
