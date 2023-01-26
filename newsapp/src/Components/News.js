import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} - NewsMonkey`;
    }
    async update() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let Data = await fetch(url);
        this.props.setProgress(30);
        let ParsedData = await Data.json();
        this.props.setProgress(70);
        this.setState({
            articles: ParsedData.articles,
            totalResults: ParsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.update();
    }
    handlePrev = async () => {
        console.log("previous");
        this.setState({
            page: this.state.page - 1,
        })
        this.update();
    }
    handleNext = async () => {
        console.log("next");
        this.setState({
            page: this.state.page + 1,
        })
        this.update();
    }
    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        });
        const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let Data = await fetch(url);
        let ParsedData = await Data.json();
        this.setState({
            articles: this.state.articles.concat(ParsedData.articles),
            totalResults: ParsedData.totalResults,
        })
    };
    render() {
        return (
            <>
                <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} author={element.author ? element.author : ""} date={element.publishedAt ? element.publishedAt : ""} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
