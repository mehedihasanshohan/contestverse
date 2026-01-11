"use client";
import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import 'swiper/css/effect-coverflow';
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Title from "../../../components/Title";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);

  return (
    <div className="py-12 bg-base-200 pt-24 pb-24">
      <Title>User Reviews</Title>
      <Swiper
        loop = {true}
        effect = {'coverflow'}
        grabCursor = {true}
        centeredSlides = {true}
        slidesPerView = {3}
        autoplay = {{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect = {{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          scale: 0.75,
          modifier: 1,
          slideShadows: true,
        }}
        pagination= {true}
        modules={[EffectCoverflow , Autoplay, Pagination]}
        className="mySwiper"
      >
        {reviews.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-base-100 shadow-md mt-4 rounded-xl p-6 border">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={item.user_photoURL}
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.userName}</h3>
                  <p className="text-sm">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`text-yellow-500 ${
                      idx < Math.round(item.ratings)
                        ? "opacity-100"
                        : "opacity-30"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="opacity-80">{item.review}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;