import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



// import required modules
import { Mousewheel, Pagination } from "swiper";

export default function SwiperConvert() {
  return (
    <>
      <Swiper
        direction={"vertical"}
        slidesPerView='auto'
        spaceBetween={10}
        mousewheel={true}
        
        modules={[Mousewheel]}
        className="mySwiper"
        style={{height:'400px'}}>
        <SwiperSlide >
          <div className='flex items-center'>
        

        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week1</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week2</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week3</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week4</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week5</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week6</span><br></br><br></br>
        </div>
        <div style={{ borderLeft: '2px solid #e1e9ec', height: '280px', margin: '0px 20px',marginLeft:'30px'}}></div>
        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '20px' }}> 2 hours</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
        </div>
        <div style={{ borderLeft: '2px solid #e1e9ec', height: '280px', margin: '0px 20px',marginLeft:'20px'}}></div>
        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 40$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 30$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 30$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
        </div>
        </div></SwiperSlide>
        <SwiperSlide><div className='flex items-center'>
        

        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week1</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week2</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week3</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week4</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week5</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week6</span><br></br><br></br>
        </div>
        <div style={{ borderLeft: '2px solid #e1e9ec', height: '280px', margin: '0px 20px',marginLeft:'30px'}}></div>
        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '20px' }}> 2 hours</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
        </div>
        <div style={{ borderLeft: '2px solid #e1e9ec', height: '280px', margin: '0px 20px',marginLeft:'20px'}}></div>
        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 40$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 30$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 30$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
        </div>
        </div></SwiperSlide>
        <SwiperSlide><div className='flex items-center'>
        

        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week1</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week2</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week3</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week4</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px' }}> Week5</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '30px'}}> Week6</span><br></br><br></br>
        </div>
        <div style={{ borderLeft: '2px solid #e1e9ec', height: '280px', margin: '0px 20px',marginLeft:'30px'}}></div>
        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '20px' }}> 2 hours</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '2px'}}> 1 hours 30 minutes</span><br></br><br></br>
        </div>
        <div style={{ borderLeft: '2px solid #e1e9ec', height: '280px', margin: '0px 20px',marginLeft:'20px'}}></div>
        <div className='pt-5 '>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 40$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 30$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px' }}> 30$</span> <br></br><br></br>
          <span style={{ color: '#45606a', fontWeight: '100', marginLeft: '10px'}}> 30$</span><br></br><br></br>
        </div>
        </div></SwiperSlide>
      
      </Swiper>
    </>
  );
}
