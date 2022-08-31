module.exports = {

    HTML:function(dramaTitle, dramaDescription, dramaHashtag, final_joy_youtube_title, final_joy_youtube_id, episode_num_max_joy, max_confidence_positive){
        return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
        
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        
            <title>Spoiler</title>
        
            <!-- Custom fonts for this template-->
            <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
            <link
                href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet">
        
            <!-- Custom styles for this template-->
            <link href="css/sb-admin-2.min.css" rel="stylesheet">
            <link href="../css/custom.css" rel="stylesheet">

            <script type="text/javascript"
                src="https://public.tableau.com/javascripts/api/tableau-2.min.js"></script>
            <script type="text/javascript">
                var viz;
        
                function initViz() {
                    var containerDiv = document.getElementById("vizContainer");
                    url = "https://public.tableau.com/views/_16614368631050/2?:language=ko-KR&:display_count=n&:origin=viz_share_link",
                        options = {
                            "select drama": "${dramaTitle}",
                            device: 'desktop',
                            hideTabs: true,
                            onFirstInteractive: function () {
                                listenToMarksSelection();
                        }
                    };
        
                    viz = new tableau.Viz(containerDiv, url, options);
                    document.getElementById("div_player_joy").style.display  = ''; // show youtube again
                    document.getElementById("sentiment_youtube_title").style.display = '';
                    document.getElementById("sentiment_youtube_ confidnece").style.display = '';

                    
                    console.log("~~");
                    
                    var requestURL = 'https://raw.githubusercontent.com/bonapark00/2022_Summer_Ybigta_Project_Spoiler/main/db.json';
                    var request = new XMLHttpRequest();
                    request.open('GET', requestURL);
        
                    request.responseType = 'json';
                    request.send();
                    
                    request.onload = function() {
                        db = request.response;
                        //console.log(db);
                    }
                      
                }
        
                function listenToMarksSelection() {
                    viz.addEventListener(tableau.TableauEventName.PARAMETER_VALUE_CHANGE, onParameterChange);
                }
        
        
                function onParameterChange(parameterEvent) {
                    console.log("Hello-!!!");
                    return parameterEvent.getParameterAsync().then(reportSelectParameters);
                }
        
                function reportSelectParameters(parameters) {
                    var result = "";
                    var drama_title = parameters._impl.$c.value;
                    console.log("Drama name: " + parameters._impl.$c.value); ///
                    document.getElementById("button_load_YoutubeVideo").innerHTML = drama_title + " 하이라이트 영상 보기";
                    document.forms['form_load_YoutubeVideo']['name_drama_title'].value = drama_title;
                    document.getElementById("div_player_joy").style.display  = 'none';
                    document.getElementById("sentiment_youtube_title").style.display = 'none';
                    document.getElementById("sentiment_youtube_ confidnece").style.display = 'none';

                    console.log("hey" + parameters._impl.$c.value);
                    var filename = parameters._impl.$c.value.replaceAll(':', '').replaceAll('?', '');
                    console.log("filename ----> " + filename);
                    document.getElementById("drama_description").innerHTML = db[parameters._impl.$c.value][1]; // ????
                    document.getElementById("drama_img").src = "../img/img/" + filename + ".jpeg";
                    document.getElementById("drama_name").innerHTML = "드라마 설명 / " + drama_title;
                    document.getElementById("drama_link").href = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query="+ "${dramaTitle}";
                    document.getElementById("hash_tag").innerHTML = "#" + db[parameters._impl.$c.value][4] + '<br><br>' + '#' + db[parameters._impl.$c.value][5];
                    console.log("../img/" + filename + ".jpeg");
                    console.log(db["${dramaTitle}"][1]);

                }
        
            </script>

            <style>
                .imageAlign {
                    margin-left: auto;
                    margin-right: auto;
                    display: block;
                }
            </style>
        </head>
        
        <body id="page-top" onload="initViz();">
        
            <!-- Page Wrapper -->
            <div id="wrapper">
        
        
        
                <!-- Sidebar -->
                <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        
                    <!-- Sidebar - Brand -->
                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                        <div class="sidebar-brand-text mx-3">Spoiler</div>
                    </a>
        
                    <!-- Divider -->
                    <hr class="sidebar-divider my-0">
        
                    <!-- Nav Item - Dashboard -->
                    <li class="nav-item">
                        <a class="nav-link" href="/">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>Home</span></a>
                    </li>
        
                    <!-- Divider -->
                    <hr class="sidebar-divider">
        
                    <!-- Heading -->
                    <div class="sidebar-heading">
                        Contents
                    </div>
        
                    <!-- Nav Item - Charts -->
                    <li class="nav-item">
                        <a class="nav-link" href="/pattern">
                            <i class="fas fa-fw fa-chart-area"></i>
                            <span>Emotion Pattern</span></a>
                    </li>
        
                    <!-- Nav Item - Tables -->
                    <li class="nav-item active">
                        <a class="nav-link" href="/flow">
                            <i class="fas fa-fw fa-table"></i>
                            <span>Emotion Flow</span></a>
                    </li>
                </ul>
                <!-- End of Sidebar -->
        
                
        
                <!-- Content Wrapper -->
                <div id="content-wrapper" class="d-flex flex-column">
        
                    <!-- Main Content -->
                    <div id="content">
        
                        <!-- Topbar -->
                        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <!-- Topbar Navbar -->
                        </nav>
                        <!-- End of Topbar -->
        
                        <!-- Begin Page Content -->
                        <div class="container-fluid">
        
                            <!-- Page Heading -->
                            <h1 class="h3 mb-2 text-gray-800">드라마 감정 흐름 알아보기</h1>
                            <p class="mb-4">
                                각각의 드라마별 감정 지수의 흐름 및 감정 지수 극점에서의 사건
                            </p>
                            
        
                            <div class="row">
        
                                <div class="col-xl-12 col-lg-7">
        
                                    <!-- Cluster Charts -->
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3">
                                            <h6 class="m-0 font-weight-bold text-primary">드라마 목록</h6>
                                        </div>
                                        <div class="card-body"  style="height: 640px;">
                                                <div id="vizContainer"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <!-- Illustrations -->
                            <div class = "row">

                                <!-- Basic drama info -->
                                <div class="col-lg-6 mb-4">
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3">
                                            <h6 id="drama_name" class="m-0 font-weight-bold text-primary">드라마 설명 / ${dramaTitle}</h6>
                                        </div>
                                        <div class="card-body" style="height: 640px;">                                    
                                            <div class="row">
                                                <img id="drama_img" class="img-fluid mt-3 mb-4 imageAlign" style="width: 260px; height: 360px;"
                                                    src="../img/img/${dramaTitle}.jpeg" alt="...">
                                                <div class="navbar navbar-expand navbar-light bg-light mt-3 mb-4 imageAlign" style="width: 260px; height: 360px;">
                                                    <p id="hash_tag" class="customFont">${dramaHashtag}</p>
                                                </div>
                                            </div>
                                            <nav class="navbar navbar-expand navbar-light bg-light mt-3 mb-4" style="width: 100%; height: 120px;">
                                                <div id="drama_description" class="font-weight-bold text-center imageAlign">${dramaDescription}</div>
                                            </nav>
                                            <a id="drama_link" target="_blank" rel="nofollow" href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${dramaTitle}">드라마 정보 더보기 &rarr;</a>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-lg-6 mb-4" id = "row_1">
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3">
                                            <h6 class="m-0 font-weight-bold text-primary">하이라이트 유튜브</h6>
                                        </div>
                                        <div id = "box_youtube" class="card-body text-center" style="height: 640px;">                                    
                        
                                            <!-- Youtube video loading  -->
                                            <form action = /flow/load_process name = "form_load_YoutubeVideo" method="get">
                                                <input type="text" name="name_drama_title"  style= "display:none" value="그 해 우리는">
                                                <button id = "button_load_YoutubeVideo" type = "submit" >${dramaTitle} ${episode_num_max_joy} 화 하이라이트 영상</button>
                                            </form>
                                            
                                                                
                                            <div id = "div_sentimentAnalysis">
                                                <div id = "sentiment_youtube_title"> ${final_joy_youtube_title}</div>
                                                <div id = "sentiment_youtube_ confidnece"> 💙유투브 제목 긍정지수💙 : ${max_confidence_positive}% "</div>

                                            </div>
                                            
                                            <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
                                            <div id="div_player_joy" class = "" style="width: 70%; height = 40%;"></div>
                                           
                                            
                                            <script>
                                                // 2. This code loads the IFrame Player API code asynchronously.
                                                var tag = document.createElement('script');
                                            
                                                tag.src = "https://www.youtube.com/iframe_api";
                                                var firstScriptTag = document.getElementsByTagName('script')[0];
                                                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
     

                                                // 3. This function creates an <iframe> (and YouTube player)
                                                //    after the API code downloads.
                                                var player;
                                                function onYouTubeIframeAPIReady() {
                                                player_joy = new YT.Player('div_player_joy', {
                                                  //  height: height,
                                                  //  width: width,
                                                    videoId: '${final_joy_youtube_id}',
                                                    playerVars: {
                                                    'playsinline': 1
                                                    },
                                                    events: {
                                                    // 'onReady': onPlayerReady,
                                                    'onStateChange': onPlayerStateChange
                                                    }
                                                });
                                                player_sad = new YT.Player('div_player_sad', {
                                                    //  height: height,
                                                    //  width: width,
                                                      videoId: '${final_joy_youtube_id}',
                                                      playerVars: {
                                                      'playsinline': 1
                                                      },
                                                      events: {
                                                      // 'onReady': onPlayerReady,
                                                      'onStateChange': onPlayerStateChange
                                                      }
                                                  });
                                                }
                                            
                                                // 4. The API will call this function when the video player is ready.
                                                function onPlayerReady(event) {
                                                event.target.playVideo();
                                                }
                                            
                                                // 5. The API calls this function when the player's state changes.
                                                //    The function indicates that when playing a video (state=1),
                                                //    the player should play for six seconds and then stop.
                                                var done = false;
                                                function onPlayerStateChange(event) {
                                                if (event.data == YT.PlayerState.PLAYING && !done) {
                                                    setTimeout(stopVideo, 6000);
                                                    done = true;
                                                }
                                                }
                                                function stopVideo() {
                                                player.stopVideo();
                                                }
                                            </script>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.container-fluid -->
                    </div>
                    <!-- End of Main Content -->
        
                    <!-- Footer -->
                    <footer class="sticky-footer bg-white shadow">
                    </footer>
                    <!-- End of Footer -->
        
                </div>
                <!-- End of Content Wrapper -->
        
        
                
            </div>
            <!-- End of Page Wrapper -->
        
        
        
            <!-- Bootstrap core JavaScript-->
            <script src="vendor/jquery/jquery.min.js"></script>
            <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        
            <!-- Core plugin JavaScript-->
            <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
        
            <!-- Custom scripts for all pages-->
            <script src="js/sb-admin-2.min.js"></script>
        
            <!-- Page level plugins -->
            <script src="vendor/chart.js/Chart.min.js"></script>
        
            <!-- Page level custom scripts -->
            <script src="js/demo/chart-area-demo.js"></script>
            <script src="js/demo/chart-pie-demo.js"></script>
            <script src="js/demo/chart-bar-demo.js"></script>
        
            <!-- Javascript event handler -->
            <script>
                // const container = document.getElementsByClassName("tableauPlaceholder")[0];
                // console.log(container);
                // container.addEventListener('click', function (e) {
                //     // 클릭된 요소가 무엇인지를 확인해야 함
                //     console.log("hello!");
                //     // if (e.target.classList.contains('tabComboBoxName')) {
                //     //     console.log("Contains!");
                //     // }
                // })
        
                // const temp = document.getElementsByClassName("h3 mb-2 text-gray-800");
                // console.log(temp[0]);
                // temp[0].addEventListener('click', function (e) {
                //     console.log("clicked!!!");
                // })
            </script>
        </body>
        
        </html>`;
    }


}