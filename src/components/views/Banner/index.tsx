import { useState, memo } from 'react'
import Skeleton from './components/Skeleton'
import type { IBlogData } from '@/types/types'
import { text } from '@/styles/global'
import SNSList from '../SNSList'

const Banner = ({ data }: { data: IBlogData }) => {
  const [isLoad, setLoad] = useState(false)
  const onLoadImage = () => {
    setLoad(true)
  }
  return (
    <div className="Banner-wrap">
      <div className="Banner-top-wrap relative w-full md:h-[300px] h-[200px] rounded-[3px] overflow-hidden z-[-1] select-none">
        {!isLoad && <Skeleton />}
        <img src={data.coverURL} alt="kku.dev Top Banner" onLoad={onLoadImage} className="absolute top-[50%] translate-y-[-40%] l-[0] w-full h-[auto] " width="1200" height="700" />
      </div>
      <div className="flex justify-between items-center flex-col gap-[8px] py-[24px]">
        <h1 className={`${text.light} flex justify-between items-center text-head_lg fwb w-full`}>
          <div className="cursor-pointer ease hover:text-primary">
            {data.icon} {data.title}
          </div>
          <SNSList />
        </h1>
        <h2 className={`${text.normal} flex justify-start items-start text-lg pl-2 w-full`}>{data.description}</h2>
      </div>
    </div>
  )
}

export default memo(Banner)
