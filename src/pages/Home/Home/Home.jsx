import React from "react";
import Banner from "../Banner/Banner";
import Reviews from "../reviews/Reviews";
import PopularContests from "../PopularContests";
import WinnerAdvertisement from "../Winner/WinnerAdvertisement";
import HowItWorks from "../../HowItWorks/HowItWorks";
import StatsSection from "../../StatsSection/StatsSection";
import UpcomingContests from "../../UpcomingContests/UpcomingContets";
import NewsLetter from "../../NewsLetter/NewsLetter";
import PerformanceMetrics from "../../PerformanceMetrics/PerformanceMetrics";

const reviewsPromise = fetch("/data/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <StatsSection></StatsSection>
      <PopularContests></PopularContests>
      <WinnerAdvertisement></WinnerAdvertisement>
      <HowItWorks></HowItWorks>
      <UpcomingContests></UpcomingContests>
      <PerformanceMetrics></PerformanceMetrics>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <NewsLetter></NewsLetter>
    </>
  );
};

export default Home;
