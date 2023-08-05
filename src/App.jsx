import { BACKDROP_BASE_URL } from './config';
import { TVShowDetail } from './components/TVShowDetail/TVShowDetail';
import { useEffect } from 'react';
import { TVShowAPI } from './api/tv-show';
import s from './style.module.css';
import { useState } from 'react';
import { Logo } from './components/Logo/Logo';
import logoImg from "./assets/images/logo.png"
import { TVShowList } from './components/TVShowList/TVShowList';
import { SearchBar } from './components/SearchBar/SearchBar';

export function App(){

    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);


    async function fetchPopulars(){
        try{
            const popularTVShowList = await TVShowAPI.fetchPopulars();
            if(popularTVShowList.length > 0){
                setCurrentTVShow(popularTVShowList[0]);
            }
        }catch(error){
            alert("Something went wrong");
        }
    }
    
    async function fetchRecommendations(tvShowId){
        try{
            const recommendationsListResp = await TVShowAPI.fetchRecommendations(tvShowId);
            if(recommendationsListResp.length > 0){
                setRecommendationList(recommendationsListResp.slice(0,10));
            }
        }catch(error){
            alert("Something went wrong");
        }
    }
    
    async function searchTVShow(tvShowName){
        try {
            const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
            if(searchResponse.length > 0){
                setCurrentTVShow(searchResponse[0]);
            }
        } catch (error) {
            alert("Something went wrong");
        }
    }

    useEffect(()=>{
        fetchPopulars();
    },[]);
    
    useEffect(()=>{
        if(currentTVShow){
            fetchRecommendations(currentTVShow.id);
        }
    },[currentTVShow]);

    function updateCurrentTVShow(tvShow){
        setCurrentTVShow(tvShow);
    }
    
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
                        <Logo image={logoImg} title={"Watowatch"} subtitle={"Find a show you may like"} />
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <SearchBar onSubmit={searchTVShow} />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommended_tv_shows}>
                {currentTVShow && <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recommendationList} />}
            </div>
        </div>
    );
}