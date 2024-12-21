import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';



const News=(props)=>  {

  

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  

  /* ye wala jo articles likha hai neeche vo ab kisi kaam ka nahi hai cuz hum dynamically fetch krre hai data api endpoint se 
  but this is just to show ki koi static data aise krke kar skte hai 
  articles=  [
    {
        "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
        "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
        "publishedAt": "2020-04-27T11:41:47Z",
        "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    },
    {
        "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
        },
        "author": null,
        "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
        "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
        "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
        "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
        "publishedAt": "2020-03-30T15:26:05Z",
        "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    }
]
    */
const capitalizeFirstLetter=(val)=> {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


const update=async()=>
{
  props.setProgress(0);
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
  
  setLoading(true)
  let data=await fetch(url);
  let parsedData= await data.json();
  setArticles(parsedData.articles)
  setLoading(false)
  setTotalResults(parsedData.totalResults)
  
  props.setProgress(100);
}

useEffect(() => {
  update();
}, []);
//async componentDidMount(){  /* we are doing this cux upr articles mei jo likha hai agar hum vo use krenge toh 10 saal baad bhi same
 // news show hogi. so we are using the api endpoint to news api wali site pe di hai and usse data fetch krke vo state se set kar rahe hai articles mei */
 // console.log("cdm");
  
 // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=732bff451c134b6cbcce39526439a77e&pageSize=${props.pageSize}`;
  // this.setState({loading:true});
  // let data=await fetch(url);
  // let parsedData= await data.json();
  // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false});
//this.update()

//}
 
  const handleprevclick=async()=>{
     setPage(page-1)
    
    update()
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=732bff451c134b6cbcce39526439a77e&page=${this.state.page -1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parsedData= await data.json();
    //     this.setState({
    //      page: this.state.page-1,
    //      articles: parsedData.articles,
    //      loading:false
    //     })
  }
  const handlenextclick=async()=>{
    setPage(page+1)
    
    update()
  //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=732bff451c134b6cbcce39526439a77e&page=${this.state.page +1}&pageSize=${props.pageSize}`;
  //   this.setState({loading:true});
  //   let data=await fetch(url);
  // let parsedData= await data.json();
  //     this.setState({
  //      page: this.state.page+1,
  //      articles: parsedData.articles,
  //      loading:false
  //     })
  }

  
    console.log("render");
    return (
      
        <div className="container my-3">
          <h1 className="text-centre" style={{margin:"35px",marginTop:"75px"}}>NewsMonkey- {capitalizeFirstLetter(props.category)} Top Headlines</h1>
          
        {loading && <Spinner />} 
        <div className="row">
       
          {!loading && articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,40):null} description={element.description?element.description.slice(0,80):null} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author? "Unknown": element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
           
          <div className="container d-flex justify-content-end">
          <button disabled={page<=1} type="button" className="btn btn-dark mx-4" onClick={handleprevclick}> &larr; Previous</button>
          <button disabled={page +1 > Math.ceil(totalResults/props.pageSize)}type="button" className="btn btn-dark " onClick={handlenextclick}>Next &rarr;</button>
          </div>
        
        </div>
        
       
        
      </div>
    )
  
}
News.defaultProps = {
  country: 'us',
  pageSize:8,
  category:"general"
}
export default News
