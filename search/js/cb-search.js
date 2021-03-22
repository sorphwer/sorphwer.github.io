$(document).ready(function () {
    var time1 = 0;
    var show = false;
    var names = new Array(); //文章名字等
    var urls = new Array(); //文章地址
    $(document).keyup(function (e) {
        var time2 = new Date().getTime();
        if (e.keyCode == 17) {
            var gap = time2 - time1;
            time1 = time2;
            if (gap < 500) {
                if (show) {
                    $(".cb-search-tool").css("display", "none");
                    show = false;
                } else {
                    $(".cb-search-tool").css("display", "block");
                    show = true;
                    $("#cb-search-content").val("");
                    $("#cb-search-content").focus();
                }
                time1 = 0;
            }
        } else if (e.keyCode == 27) {
            $(".cb-search-tool").css("display", "none");
            show = false;
            time1 = 0;
        }
    });

    $("#cb-search-content").keyup(function (e) {
        var time2 = new Date().getTime();
        if (e.keyCode == 17) {
            var gap = time2 - time1;
            time1 = time2;
            if (gap < 500) {
                if (show) {
                    $(".cb-search-tool").css("display", "none");
                    show = false;
                } else {
                    $(".cb-search-tool").css("display", "block");
                    show = true;
                    $("#cb-search-content").val("");
                    $("#cb-search-content").focus();
                }
                time1 = 0;
            }
        }
    });

    $("#cb-close-btn").click(function () {
        $(".cb-search-tool").css("display", "none");
        show = false;
        time1 = 0;
    });

    $("#cb-search-btn").click(function () {
        $(".cb-search-tool").css("display", "block");
        show = true;
        $("#cb-search-content").val("");
        $("#cb-search-content").focus();
        time1 = 0;
    });

    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
          let matches, substringRegex;
          //init q-gram set
          let fuzzySet = FuzzySet(arr=names);
          

          // an array that will be populated with substring matches
          matches = [];
      
          // regex used to determine if a string contains the substring `q`
          substrRegex = new RegExp(q, 'i');
      
          // iterate through the pool of strings and for any string that
          // contains the substring `q`, add it to the `matches` array
          $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
              matches.push(str);
            }
          });

          //if no result, try fuzzy search
          if (matches.length===0) {
            let qgramResult = fuzzySet.get(q,minScore=0.2);
            console.log(qgramResult);
            if(qgramResult){
                matches.push(qgramResult[1]);
            }
          }
      
          cb(matches);
        };
      };

    $.getJSON("/search/cb-search.json").done(function (data) {
        if (data.code == 0) {
            for (var index in data.data) {
                var item = data.data[index];
                names.push(item.title);
                urls.push(item.url);
            }

            $("#cb-search-content").typeahead({
                // source: names,
                name: 'names',
                source: substringMatcher(names),
                afterSelect: function (item) {
                    $(".cb-search-tool").css("display", "none");
                    show = false;
                    window.location.href = (urls[names.indexOf(item)]);
                    return item;
                }
            });
        }
    });
    // .error(function (data, b) {

    // });

});
