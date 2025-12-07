import React from "react";
import Banner from "../Banner/Banner";
import Reviews from "../reviews/Reviews";

const reviewsPromise = fetch('/data/reviews.json').then(res => res.json());

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </>
  );
};

export default Home;
