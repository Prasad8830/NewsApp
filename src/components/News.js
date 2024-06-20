import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults:0
    };
  }

  async updateNews() {
    this.props.setProgress(5);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f2e35689aa74f3c9ac36ee0d7e12413&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false})
    this.updateNews();
  }
  handleNextClick = async () => {
    //console.log("next");
    // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f2e35689aa74f3c9ac36ee0d7e12413&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // //console.log(parsedData);

    // this.setState({
    //   page:this.state.page+1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePrevClick = async () => {
    //console.log("prev");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f2e35689aa74f3c9ac36ee0d7e12413&page${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // //console.log(parsedData);

    // this.setState({
    //   page:this.state.page-1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
    this.setState({page:this.state.page+1});
    // this.updateNews();
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f2e35689aa74f3c9ac36ee0d7e12413&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h4 className="text-center ">NewsMonkey - Top Headlines</h4>
        {/* {this.state.loading&&<Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length<this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row ">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    {" "}
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                  
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
      
    );
  }
}
