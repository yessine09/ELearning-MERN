import React, { useEffect, useRef } from 'react'
import Swiper from 'swiper'
import "swiper/css";


import { Card777 } from './Card777';
import { Card77 } from './Card77';
import { Card7777 } from './Card7777';
import { Card } from '@material-tailwind/react';

type Props = {
  className: string
  items?: number
}

const Courses: React.FC<Props> = ({ className, items = 6 }) => {
  const swiperRef = useRef(null)

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        slidesPerView: 'auto',
        spaceBetween: 10,
        grabCursor: true, // changer le curseur lorsque vous saisissez une carte
        centeredSlides: true, //centrer les cartes
        autoplay: {
          delay: 5000, // délai entre chaque glissement automatique
        },
        // masquer les cartes hors du conteneur principal lorsqu'on glisse
        breakpoints: {
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 5,
          },
        },
      })
    }
  }, [])

  return (
    <Card style={{
      boxShadow: '1px 2px 9px #0000003D', backgroundColor: ''
      , width: '750px', height: '350px', overflow: 'hidden'
    }}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-9'>
        <h3 className='card-title align-items-start flex-column' style={{ marginLeft: '25px' }}>
          <span className='card-label fw-bold ' style={{ color: '#3699ff', marginLeft: '10px', fontSize: '20px' }}>My Courses<span style={{ marginLeft: '180px' }}><img src='' /></span></span>
          <span className='mt-2' style={{ color: '#FFCC29', marginLeft: '10px', fontSize: '20px', fontFamily: 'inherit', fontWeight: 'lighter' }}>Social Media Designer Carrer  </span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body pt-15'>
        {/* begin::Item */}
        <div className="swiper-container" ref={swiperRef}>
          <div className='swiper-wrapper custom-swiper-wrapper' style={{ marginTop: '30px', marginLeft: '-180px' }}>
            <div className='swiper-slide  flex items-center'>
              <Card77 className='card-xl-stretch' />
              <div style={{ borderLeft: '2px solid #e1e9ec', height: '100px', margin: '0px 20px', marginTop: '-140px', marginLeft: '220px' }}></div>
            </div>
            <div className='swiper-slide col-xxl-3 flex items-center'>
              <Card77 className='card-xl-stretch' />
              <div style={{ borderLeft: '2px solid #e1e9ec', height: '100px', margin: '0px 20px', marginTop: '-140px', marginLeft: '220px' }}></div>
            </div>
            <div className='swiper-slide col-xxl-3 flex items-center'>
              <Card77 className='card-xl-stretch' />
              <div style={{ borderLeft: '2px solid #e1e9ec', height: '100px', margin: '0px 20px', marginTop: '-140px', marginLeft: '220px' }}></div>
            </div>
            <div className='swiper-slide col-xxl-3 flex items-center'>
              <Card77 className='card-xl-stretch' />
              <div style={{ borderLeft: '2px solid #e1e9ec', height: '100px', margin: '0px 20px', marginTop: '-140px', marginLeft: '220px' }}></div>
            </div>
            <div className='swiper-slide col-xxl-3 flex items-center'>
              <Card77 className='card-xl-stretch' />
              <div style={{ borderLeft: '2px solid #e1e9ec', height: '100px', margin: '0px 20px', marginTop: '-140px', marginLeft: '220px' }}></div>
            </div>
          </div>
        </div>
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </Card>
  )
}

export default Courses;
