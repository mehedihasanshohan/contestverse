import React from "react";
import Banner from "../Banner/Banner";
import Reviews from "../reviews/Reviews";
import PopularContests from "../PopularContests";
import WinnerAdvertisement from "../Winner/WinnerAdvertisement";
import WinnerSection from "../Winner/WinnerSection";
import HowItWorks from "../../HowItWorks/HowItWorks";
import CallToAction from "../../CallToAction/CallToAction";
import StatsSection from "../../StatsSection/StatsSection";
import UpcomingContests from "../../UpcomingContests/UpcomingContets";
import NewsLetter from "../../NewsLetter/NewsLetter";
import PerformanceMetrics from "../../PerformanceMetrics/PerformanceMetrics";

const reviewsPromise = fetch('/data/reviews.json').then(res => res.json());

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <PopularContests></PopularContests>
      <WinnerAdvertisement></WinnerAdvertisement>
      <HowItWorks></HowItWorks>
      <UpcomingContests></UpcomingContests>
      <NewsLetter></NewsLetter>
      <PerformanceMetrics></PerformanceMetrics>
      <StatsSection></StatsSection>

    </>
  );
};

export default Home;
