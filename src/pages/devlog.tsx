import { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { POSTS_PER_PAGE } from '@/notion/config'
import { getCachedDatabaseItems } from '@/notion/utils/getCachedDatabaseItems'
import { parseDatabaseItems } from '@/notion/utils/parseDatabaseItems'
import { initBlogInfo } from '@/notion/notion'
import PageHead from '@/components/common/PageHead'
import Banner from '@/components/views/Banner'
import PostList from '@/components/views/PostList'
import type { IDevLogData, IBlogData } from '@/notion/types'

interface IDevLog {
  data: IDevLogData[]
  blogData: IBlogData
}

const Devlog = ({ data, blogData }: IDevLog) => {
  const { query } = useRouter()
  const currentPage = query.page ? parseInt(query.page.toString(), 10) : 1
  const [postData, setPostData] = useState(data.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage))
  const [postCount] = useState(data.length)

  useEffect(() => {
    setPostData(data.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage))
  }, [currentPage, data])
  return (
    <section className="">
      <Banner data={blogData} />
      <PageHead subTitle="DevLog" />
      <PostList data={postData} />
    </section>
  )
}

export const getStaticProps: GetStaticProps<IDevLog> = async () => {
  const databaseId = process.env.NOTION_DATABASEID
  try {
    if (!databaseId) throw new Error('DATABASE_ID is not defined')
    const databaseItems = await getCachedDatabaseItems(databaseId)
    const parsedData = parseDatabaseItems(databaseItems)
    const blogData = await initBlogInfo(databaseId)
    return {
      props: {
        data: parsedData,
        blogData,
      },
      revalidate: 60 * 5,
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true,
    }
  }
}

export default Devlog
