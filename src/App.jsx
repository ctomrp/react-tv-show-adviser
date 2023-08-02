import { BACKDROP_BASE_URL } from './config';
import { useEffect } from 'react';
import { TVShowAPI } from './api/tv-show';
import s from './style.module.css';
import { useState } from 'react';

export function App(){

    const [currentTVShow, setCurrentTVShow] = useState();

    async function fetchPopulars(){
        const popularTVShowList = await TVShowAPI.fetchPopulars();
        if(popularTVShowList.length > 0){
            setCurrentTVShow(popularTVShowList[0]);
        }
    }

    useEffect(()=>{
        fetchPopulars();
    },[]);

    console.log(currentTVShow);

    return (
        <div className={s.main_container}
        style={{
            background: currentTVShow
              ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
                 url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
              : "black",
          }}
        >
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <div>LOGO</div>
                        <div>Subtitle</div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <input type="text" style={{width:"100%"}}/>
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>Tv show detail</div>
            <div className={s.recommended_tv_shows}>Recommended tv show</div>
        </div>
    );
}