import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

function News(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const update = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let Data = await fetch(url);
        props.setProgress(30);
        let ParsedData = await Data.json();
        props.setProgress(70);
        setArticles(ParsedData.articles)
        setTotalResults(ParsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${props.category} - NewsMonkey`;
        update();
    }, [])
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let Data = await fetch(url);
        let ParsedData = await Data.json();
        setArticles(articles.concat(ParsedData.articles))
        setTotalResults(ParsedData.totalResults)
    };
    return (
        <div>
            <>
                <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        </div>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News

