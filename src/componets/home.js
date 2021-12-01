import './home.css';
import { useSelector } from 'react-redux';
import { countryList } from '../App';
import { dateNow } from '../App';

function Home(){
    const data = useSelector((state)=>state.dataReducer[0])
    return (
        <>
        <div className="row row-cols-2">
            {countryList.map((item)=>
            {
                return (<a href={`details/${item.toLowerCase()}`}>
                <div key={item} className="home-items col d-flex flex-row justify-content-between">
                    <div>{item}</div>
                    <div>{!!data ? data[dateNow].countries[item].today_new_confirmed : "0"}</div>
                </div>
                </a>)
            }
                )}
        </div>
        
        </>
    )
}

export default Home