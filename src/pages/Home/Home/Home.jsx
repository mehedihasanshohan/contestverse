import React from "react";
import Banner from "../Banner/Banner";
import Reviews from "../reviews/Reviews";
import PopularContests from "../PopularContests";
import WinnerAdvertisement from "../Winner/WinnerAdvertisement";
import WinnerSection from "../Winner/WinnerSection";

const reviewsPromise = fetch('/data/reviews.json').then(res => res.json());

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <PopularContests></PopularContests>
      <WinnerAdvertisement></WinnerAdvertisement>
    </>
  );
};

export default Home;
