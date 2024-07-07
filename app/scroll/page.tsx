'use client'
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.css';

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  useEffect(() => {
    gsap.to(`.${styles.containerX}`, {
      opacity: 1,
      scrollTrigger: {
        trigger: `.${styles.containerX}`,
        start: "top top",
        end: "240%",
        scrub: true,
        pin: true,
      },
    });

    gsap.to(`.umxBlue`, {
      height: "100%",
      ease: "expo-out",
      scrollTrigger: {
        trigger: `.umxBlue`,
        scrub: true,
      },
    });

    gsap.to(`.${styles.blueBg}`, {
      height: "100%",
      ease: "expo-out",
      scrollTrigger: {
        trigger: `.${styles.blueBg}`,
        scrub: true,
      },
    });

    gsap.to(`.umxBlack`, {
      height: "100%",
      scrollTrigger: {
        start: "top top",
        end: "+1200",
        scrub: true,
      },
    });

    gsap.to(`.${styles.blackBg}`, {
      height: "100%",
      scrollTrigger: {
        trigger: `.${styles.blueBg}`,
        start: "top top",
        end: "+1200",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className={styles.containerX}>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[461px] min-h-[750px] h-screen z-[99]">
        <div className={`absolute bottom-0 w-full h-0 umxOrange`} style={{ overflow: 'hidden', height: '100%' }}>
          <div className=" absolute bottom-0 h-screen min-h-[750px] flex items-center ">
            <figure className={`${styles.umxImg} ${styles.umxF1}`} style={{ transform: 'translate(0px, 0px)' }}></figure>
          </div>
        </div>
        <div className={`absolute bottom-0 w-full h-0 umxBlue`} style={{ display: 'block', overflow: 'hidden', height: '0%' }}>
          <div className=" absolute bottom-0 h-screen min-h-[750px] flex items-center ">
            <figure className={`${styles.umxImg} ${styles.umxF2}`}></figure>
          </div>
        </div>
        <div className={`absolute bottom-0 w-full h-0 umxBlack`} style={{ display: 'block', overflow: 'hidden', height: '0%' }}>
          <div className=" absolute bottom-0 h-screen min-h-[750px] flex items-center ">
            <figure className={`${styles.umxImg} ${styles.umxF3}`}></figure>
          </div>
        </div>
      </div>
      
      <div className="absolute left-0 bottom-0 w-1/2 h-screen min-h-[750px] overflow-hidden">
        <div className={`absolute bottom-0 w-full h-0 overflow-hidden  bg-[#ffeee8] `} style={{ height: '100%' }}>
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[230px] h-screen flex flex-col items-start justify-center"
            style={{ transform: 'translate(-50%, 0%)' }}>
            <strong className='text-8xl text-[#f6683a]'>橙</strong>
            <p className='text-3xl text-[#fdbfab]'>大胆和前卫<br />的姿态</p>
          </div>
        </div>
        <div className={`absolute bottom-0 w-full h-0 overflow-hidden ${styles.blueBg}`} style={{ height: '0%' }}>
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[230px] h-screen flex flex-col items-start justify-center"
            style={{ transform: 'translate(-50%, 0%)' }}>
            <strong className='text-8xl text-[#38bec1]'>蓝</strong>
            <p className='text-3xl text-[#a5e2e4]'>挑战和突破<br />的精神</p>
          </div>
        </div>
        <div className={`absolute bottom-0 w-full h-0 overflow-hidden ${styles.blackBg}`} style={{ height: '0px' }}>
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[230px] h-screen flex flex-col items-start justify-center"
            style={{ transform: 'translate(-50%, 0%)' }}>
            <strong className='text-8xl text-[#182130]'>黑</strong>
            <p className='text-3xl text-[#94aab8]'>简洁跳动<br />的语言</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
