export let a="hello";
export let key='77d3a9a44835177590d6fda42991e44e';
export const baseUrl='https://api.themoviedb.org/3';
export const options = {
          method: 'GET',
          headers: {
                     accept: 'application/json',
                     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2QzYTlhNDQ4MzUxNzc1OTBkNmZkYTQyOTkxZTQ0ZSIsInN1YiI6IjY0NzU2ZjBjYzI4MjNhMDBjNDIxNzFjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XXCQz5IO_7qSJQWCO6dWKi0SzDe17Y8Yw8j4udPEppk'
                   }
         };
export  const apiPaths={
                fetchAllCategories:`${baseUrl}/genre/movie/list?api_key=${key}`,
                fetchTrending:`${baseUrl}/trending/movie/day?api_key=${key}`,
                fetchLatest:`${baseUrl}/movie/latest?api_key=${key}`,
                fetchTopRated:`${baseUrl}/movie/top_rated?api_key=${key}`,
                fetchById:(id)=>{`https://api.themoviedb.org/3/movie/959108/videos?api_key=let key='77d3a9a44835177590d6fda42991e44e';`},
                fetchSimilarMovies:(id)=>{`${baseUrl}/movie/${id}/similar?api_key=${key}`},
                fetchList:(id)=>`${baseUrl}/discover/movie?api_key=${key}&with_genres=${id}`,
                imgPath:`https://image.tmdb.org/t/p/original`,
                 movieTrailerUrl:(mviQuery,title)=>`${baseUrl}/movie/${mviQuery}/videos?language=${title}`,
        }

export  function load(){
             trendingMovies();//banner...
             allcategoriesMovies(apiPaths.fetchTopRated,"Top Rated");
             allCategories();
        }

//creating random movie for banner background..../
export   function trendingMovies(){
              allcategoriesMovies(apiPaths.fetchTrending,"Trending Now")
                .then(List=>{
                             const ranInd=parseInt(Math.random()*(List.length))
                             bannerSection(List[ranInd]);
                            }).catch(err=>console.error(err))
          }

//banner information....
export    async function bannerSection(movie){
             await fetch( apiPaths.movieTrailerUrl(movie.id,movie.original_title),options)
                    .then(res=>res.json())
                    .then(res=>{
                            const bnr_content=document.getElementById('banner-content');
                            const bnr=document.getElementById('bnr-cnt');
                            bnr.style.backgroundImage=`url(${apiPaths.imgPath}${movie.backdrop_path})`;
                            let mvi=`https://www.youtube.com/embed/${res.results[0].key}`;
      
                            setTimeout(()=>document.getElementById('bnrvdo1').src=`https://www.youtube.com/embed/${res.results[0].key}?autoplay=1&mute=1`,3000); 
                           document.getElementById('bnrvdo1').src=`https://www.youtube.com/embed/${res.results[0].key}?autoplay=1&mute=1`; 
                            const div=document.createElement('div');
                            div.innerHTML=` 
                                          <div class="banner-fadeTop"></div>
                                          <h2 class="banner-title">${movie.title}</h2>
                                          <p class="banner-info">Trending in movies | Released-${movie.release_date}</p>
                                          <p class="banner-overview">${movie.overview && movie.overview.length>50? movie.overview.trim()+'...':movie.overview}</p>
                                          <div class="action-buttons-cont">
                                                 <button class="action-button"id="plly"  value='${mvi}'><i class="bi bi-play-fill"></i>&nbsp;&nbsp;Play</button>
                                                 <button class="action-button" id="info"><i class="bi bi-info-circle"></i>&nbsp;&nbsp;More Info</button>
                                          </div>
                                          <div id='volume'><i class="bi bi-volume-up"></i></div>
                                          <div class="banner-fadeBottom"></div> `;
                            bnr_content.append(div);
              })
           }



//fetching all type of moveies.....
export   function allCategories(){
                   fetch(apiPaths.fetchAllCategories)
                   .then(res=>res.json()).then(res=>{
                                   const categories=res.genres;
                                   if(Array.isArray(categories) && categories.length){
                                           categories.forEach.slice(0,3)(category=>{
                                                 allcategoriesMovies(apiPaths.fetchList(category.id),category.name);
                                            })   
                                   }
                    })
                   .catch(err=>console.log(err));
          }




    //creating list of all movies according to their types...
export   function allcategoriesMovies(Url,categoryName){
                       return fetch(Url)
                 .then(res=>res.json()).then(res=>{
                          const movies=res.results;
                         if(Array.isArray(movies) && movies.length){
                              buildMoviesSection(movies.slice(0,3),categoryName);
                         return movies;
                  }
                 }).catch(err=>console.log(err));
          }
  
 
    
   
   // placing movies in html dynamically...
 async function buildMoviesSection(moviesList,categoryName){
            const moviesCon=document.getElementById('movies-cont');
            const movielist=await moviesList.map(item=>{
              
              return `
                      <div class='movie-item'  onmouseenter="movieTrailer('${item.id}','${item.title}','yt${item.id}','y${item.id}')">
                              <img class="movie-item-img" src="${apiPaths.imgPath}${item.backdrop_path}" alt="${item.title}">
                              <div id='titl'>'${item.title}'</div>
                              <div class="mvi-play"  onmouseleave="stop('yt${item.id}')"> 
                                    <div class='' >
                                        <img id='y${item.id}' class="immg movie-item-img" src="${apiPaths.imgPath}${item.backdrop_path}" alt="${item.title}">
                                    </div>
                                    <iframe id='yt${item.id}' src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                    <div id='volume'><i class="bi bi-volume-up"></i></div>
                                    <div id='details'> 
                                         <div id='play'>
                                             <i class="bi bi-play-circle-fill"></i>
                                             <i class="bi bi-plus-circle" onclick="saveInfo('${item.id}','${item.title}','${item.backdrop_path}')"></i>
                                             <i class="bi bi-hand-thumbs-up"></i>
                                         </div>
                                         <div id='expnd' class='expnd'> 
                                              <i class="bi bi-caret-down-fill"></i>
                                          </div>
                                    </div>
                                     <div id='titll'>
                                         <div>  <span class='vlu'>Title </span>&nbsp${item.title}</div>
                                          <div><span class='vlu'>Lang </span>&nbsp${item.original_language}</div>
                                          <div> <span class='vlu'>Type </span>&nbsp${item.media_type}</div>
                                          <div>  <span class='vlu'>Pop.</span>&nbsp&nbsp ${item.popularity}</div>
                                          <div> <span class='vlu'>Rel/on</span> ${item.release_date}</div>
                                     </div>
                               </div>
                       </div>`;
            
             }).join('');
            const movieSessionHtml=   ` 
                                          <h2 class="movies-section-heading" >${categoryName} <span class="explore-nudge">Explore All</span></h2>
                                          <div class="movies-row" >
                                               ${movielist}
                                           </div>
                                           <button type="button" class="btn btn1" id='prev'><i class="bi bi-chevron-compact-left"></i></button>
                                           <button type="button" class="btn btn01" id='next'><i class="bi bi-chevron-compact-right"></i></button>`;
            const el=document.createElement('div');
            el.className='movies-section';
            el.setAttribute("item-display-m","3");
            el.innerHTML=movieSessionHtml;
            moviesCon.append(el);
          
        }
     
export  async function movieTrailer(movieName,title,iframeId,imag){
            if(!movieName) return;
            await fetch( apiPaths.movieTrailerUrl(movieName,title),options)
            .then(res=>res.json())
            .then(res=>{ 
              let videoIdd=res.results[0].key;
              document.getElementById(imag).scr=`url("")`;
             let youTubeUrl=`https://www.youtube.com/embed/${videoIdd}`;console.log(youTubeUrl)
             setTimeout(()=>document.getElementById(imag).src=''),5000;
             document.getElementById(iframeId).src=`https://www.youtube.com/embed/${videoIdd}?autoplay=1&mute=1`;

            })
              .catch(err=>console.log(err));

 }

export  function stop(iframeId){
           document.getElementById(iframeId).src=``;
        }

       //onload events.....
       window.addEventListener('load', async function(){
            load();
            window.addEventListener('scroll',()=>{
               const hdr=document.getElementById('header');
               if(this.window.scroll>5){
                  hdr.classList.add('black-bg')
               }else hdr.classList.remove('black-bg');
            });
       }) 


       
          
 //saving movies in savelist...
export function saveInfo(a,b,c){
           let item = {
                        id:a,
                        title:b,
                        backdrop_path:c,
                      };
         let retrived = JSON.parse(localStorage.getItem("accounts"));
         let retrived1 =sessionStorage.getItem("email");
         retrived.forEach(element => {
                   if(element.email==retrived1){
                        element.moviesList.push(item);
                        localStorage.setItem("accounts",JSON.stringify(retrived));   
                      }
                  })
  
        }


 //basic functionalities.....       
export   function functionalities(){
             $(document).ready(()=>{
                   var slider= document.getElementsByClassName('movies-row');
                   var item= document.getElementsByClassName('movie-item');
  
                  setTimeout(()=>{ 
                     var expnd=document.getElementsByClassName('expnd');
                     let rowLength=(item.length/slider.length)*item[0].offsetWidth - screen.width;
                     let count=[];
                     for(let i=0;i<slider.length;i++){
                           count[i]=0;
                           var btn1= document.getElementsByClassName('btn1');
                           var btn0= document.getElementsByClassName('btn01');
                           var plytn= document.getElementsByClassName('bi-play-circle-fill');
 
                           //left to right slider..
                           btn1[i].addEventListener('click',()=>{
                                 if(count[i]<0){
                                    count[i]=count[i] + screen.width/3;
                                    slider[i].style.left=`${count[i]}px`;
                                  }
                           });

                            //right to left slider..
                           btn0[i].addEventListener('click',()=>{
                              if(count[i]>-rowLength){
                                   count[i]=count[i] - screen.width/3;
                                   slider[i].style.left=`${count[i]}px`;
                               }
                            })
                      }
                      for(let j=0;j<expnd.length;j++){
                        // playing banner video ..
                         plytn[j].addEventListener('click',moviePlay);
                         //details...
                         expnd[j].addEventListener('click',expand);
                       };

                        //playing movie..
                           $('button#plly').click(moviePlay)
                        //home link..
                           $('#home').click(()=>{
                                $('section').css('display','block');
                                $('.ply').css('display','none')
                           })
                        //info section...
                          $('button#info').click(()=>expand());
                        //closing details..
                          $('.crs').click(()=>{
                                 $(`.bttm`).css('display','block');
                                 $(`.movie-exp-o`).css('display','none');
                                 $(`.movie-exp`).css('display','none');
                                 $(`.main`).css('position','relative'); 
                           })
     
                         //movie play function..
                           function moviePlay(){
                                    $('#header').addClass('black-bg');
                                    $('section').css('display','none');
                                    $('.ply').css('display','block');
                                    $('#mvi-pg').attr('src',$('button#plly').val());
                            }
                         //info display function..
                            function expand(){
                                   $(`.movie-exp-o`).css('display','block');
                                   $(`.movie-exp`).css('display','block');
                                   $(`.main`).css('position','fixed'); 
                                   $(`.bttm`).css('display','none');
                            }
                          //navigations...
                         for(let i=0;i<6;i++){ 
                                   $('.nav-item').eq(i).click(()=>{
                                      if(i==0){
                                         window.location.href='mn.html';
                                      }
                                      if(i==1){
                                         window.location.href='tvshows.html';
                                      }
                                      if(i==2){
                                         window.location.href='movies.html';
                                      }
                                      if(i==3){
                                         window.location.href='newsandpopuler.html';
                                      }
                                     if(i==4){
                                         window.location.href='mylist.html';
                                      }
                                     if(i==5){
                                         window.location.href='Br_Language.html';
                                      }
                                   })
                          }
    
                  } ,3000);
               })
         }
   
  
 
  
   