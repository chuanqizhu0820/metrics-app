import './home.css';
import { useSelector } from 'react-redux';
import { countryList } from '../App';
import { dateNow } from '../App';

function Home(){
    const data = useSelector((state)=>state.homeReducer[0])
    let count = 0
    if (!!data){
    const dataArr = Object.values(Object.values(data)[0].countries);
    dataArr.forEach(item=>{
        count = count + item.today_new_confirmed;
    })
    };
    return (
        <>
        <div className="row">
            <div className="title-box col d-flex flex-column align-items-center">
            <div className="title-date">{dateNow}</div>
            <div className="title-text"> Worldwide</div>
            <div className="title-num">new cases: {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
        </div>
        </div>
        <div className="row row-cols-2">
            {countryList.map((item, idx)=>
            {
                const colorType = Math.floor((idx+1)/2)%2===0 ? "dark" : "shallow";
                const paddingType = idx%2 ===0 ? "left":"right";
                return (
                <a key={item} href={`details/${item.toLowerCase()}`} className={`item-box-${colorType} item-box-${paddingType} col`}>
                    <div className="d-flex flex-column align-items-center">
                    <div className="country-text">{item}</div>
                    <div className="case-text">New cases: {!!data ? data[dateNow].countries[item].today_new_confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}</div>
                    </div>
                </a>   
              )
            }
                )}
        </div>
        
        </>
    )
}

export default Home