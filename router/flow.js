var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var template = require('../lib/template.js');
var http_request = require('request');
const YouTubeNode = require('youtube-node');
let youtube_key = "AIzaSyCylaAPkxiY5Cqv-o6arGXa-bgU_Im0-yw";
let YouTube = new YouTubeNode();
YouTube.setKey(youtube_key);
router.use(express.static('./'));

router.get('/', function(request, response){
    var html = template.HTML("그 해 우리는", '함께해서 더러웠고 다신 보지 말자!로 끝났어야 할 인연이 10년이 흘러 카메라 앞에 강제 소환 되어 펼쳐지는 청춘 다큐를 가장한 아찔한 로맨스 드라마',  "#완벽해피엔딩" + '<br><br>' +"#큰위기두번", '', 'XEmDmBYbYro', '12', 92.28158);
    console.log("ok");
    response.send(html);
});


router.get('/load_process', function(request, response){
    var drama_title = request.query.name_drama_title;
    var arr_youtube_title = [];
    console.log(drama_title)
    var joy_search_results_youtube_title = [];
    var joy_search_results_youtube_id = [];
    var joy_sentiment_confidences_positive = [];
    var sad_search_results_youtube_title = [];
    var sad_search_results_youtube_id = [];
    var sad_sentiment_confidences_negative = [];

    var optionParams={
        part:"snippet",
        key:"AIzaSyCylaAPkxiY5Cqv-o6arGXa-bgU_Im0-yw",
        type:"video",
        maxResults:3,
        regionCode:"KR",
       // order: "rating" // cannot resolve this..
    };
 
    http_request.get({
        uri: 'https://raw.githubusercontent.com/bonapark00/2022_Summer_Ybigta_Project_Spoiler/main/db.json',
        method : 'GET',
        headers: {
        'Content-Type': 'json'
        }
    }, function(error, res, body){
        console.log(drama_title);
        body = JSON.parse(body);
        console.log(body[drama_title]);
        var drama_description = body[drama_title][1];
        var drama_eipsode_num_joy = body[drama_title][2];
        var drama_hashtag = '#' + body[drama_title][4] + '<br><br>' + '#' + body[drama_title][5];
 
        var count_joy = 0;

        var search_term = drama_title + " " +  drama_eipsode_num_joy + "클립";

        YouTube.search(search_term, 3, optionParams, function (error, result, body) {
            if (error) {
                is_error = 1;
                console.log(error);
            }
            for (let j = 0; j < 3 && result.items[j] != undefined; j++) {
                var youtube_title = result.items[j].snippet.title;
 
                joy_search_results_youtube_title.push(youtube_title);
                console.log(joy_search_results_youtube_title);
                joy_search_results_youtube_id.push(result.items[j].id.videoId);
 
            
            // Call Clova sentiment API
            http_request.post({
                uri: 'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze',
                // method : 'POST',
                body:{'content': youtube_title}  ,
                headers : {
                    'X-NCP-APIGW-API-KEY-ID' : 'p8iuffpz1k',
                    'X-NCP-APIGW-API-KEY' :'iSpakA9g0czplZH17Hpx7nw2dsiXAe72oWa1mGCD'},
                json : true
                },
                function(error, res, body) {
                    if (!error ) { // && response.statusCode === 200
                        // console.log(body);
                        //console.log(body + "\n");
                        //  if(i==0){
                            joy_sentiment_confidences_positive.push(body.document.confidence.positive);
                            //console.log(body.document);
                            console.log("count joy + " + count_joy + " j: " + j);

                            console.log("1. joy senitment confidence array: " + joy_sentiment_confidences_positive);
                            console.log("1. sad senitment confidence array: " + sad_sentiment_confidences_negative);

                            if(joy_sentiment_confidences_positive.length==3){
                                var max_confidence_positive = Math.max.apply(Math, joy_sentiment_confidences_positive);
                                var index_max_confidence_positive = joy_sentiment_confidences_positive.indexOf(max_confidence_positive);
                                console.log("not first..?");
                                console.log("joy max : " + index_max_confidence_positive);
                                var final_joy_youtube_title = joy_search_results_youtube_title[index_max_confidence_positive];
                                var final_joy_youtube_id = joy_search_results_youtube_id[index_max_confidence_positive];
                                var html = template.HTML(drama_title, drama_description, drama_hashtag, final_joy_youtube_title, final_joy_youtube_id, drama_eipsode_num_joy, max_confidence_positive);
                                response.send(html);
                            }

                            /**
                             
                        }else{
                            sad_sentiment_confidences_negative.push(body.document.confidence.negative);
                            console.log("count sad + " + count_sad + " j: " + j);
                            console.log("2. joy senitment confidence array: " + joy_sentiment_confidences_positive);
                            console.log("2. sad senitment confidence array: " + sad_sentiment_confidences_negative);
        
                            if(sad_sentiment_confidences_negative.length==3){
                                console.log("count sad + " + count_sad + " j: " + j);
                                var max_confidence_negative = Math.min.apply(Math, sad_sentiment_confidences_negative);
                                var index_max_confidence_negative = sad_sentiment_confidences_negative.indexOf(max_confidence_negative);
                                var final_sad_youtube_title = sad_search_results_youtube_title[index_max_confidence_negative];
                                var final_sad_youtube_id = sad_search_results_youtube_id[index_max_confidence_negative];
                                console.log("hey");
                                console.log(joy_search_results_youtube_id);
                                console.log(max_confidence_negative, final_joy_youtube_id);
                                
                            // }
                        //}

                                */

                    }
                    else{
                        console.log(error.stack);
                        console.log("hi");
                    }
                });

            }
        //response.send(html);
        
        });
        //}
    });
    //    console.log(joy_sentiment_confidences_positive);
    //    var max_confidence_positive = Math.max.apply(Math, joy_sentiment_confidences_positive);
    //    var max_confidence_negative = Math.min.apply(Math, sad_sentiment_confidences_negative);

    //    console.log("max: " + max_confidence_positive);
    //    console.log("min: " + max_confidence_negative);

      //  var index_max_confidence_positive = joy_sentiment_confidences_positive.indexOf(max_confidence_positive);
      //  var index_max_confidence_negative = sad_sentiment_confidences_negative.indexOf(max_confidence_negative);
      //  var final_joy_youtube_title = joy_search_results_youtube_title[index_max_confidence_positive];
      //  var final_joy_youtube_id = joy_search_results_youtube_id[index_max_confidence_positive];
      //  var final_sad_youtube_title = sad_search_results_youtube_title[index_max_confidence_negative];
      //  var final_sad_youtube_id = sad_search_results_youtube_id[index_max_confidence_negative];

});

module.exports = router;
