'use client'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './swiper'

const OPTIONS: EmblaOptionsType = { direction: 'rtl', loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function App() {
  return (
    <>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} /></>
  )
}
