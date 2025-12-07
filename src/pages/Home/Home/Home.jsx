import React from "react";
import Banner from "../Banner/Banner";
import Reviews from "../reviews/Reviews";
import PopularContests from "../PopularContests";

const reviewsPromise = fetch('/data/reviews.json').then(res => res.json());

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <PopularContests></PopularContests>
    </>
  );
};

export default Home;
