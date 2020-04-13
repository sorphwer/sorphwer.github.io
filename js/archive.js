/*
Credits: this script is shamelessly borrowed from
https://github.com/kitian616/jekyll-TeXt-theme
*/
(function() {
  function queryString() {
    console.log("queryString()");
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    //console.log('queryString()');
    var i = 0, queryObj = {}, pair;
    var queryStr = window.location.search.substring(1);
    var queryArr = queryStr.split('&');
    for (i = 0; i < queryArr.length; i++) {
      pair = queryArr[i].split('=');
      // If first entry with this name
      if (typeof queryObj[pair[0]] === 'undefined') {
        queryObj[pair[0]] = pair[1];
        // If second entry with this name
      } else if (typeof queryObj[pair[0]] === 'string') {
        queryObj[pair[0]] = [queryObj[pair[0]], pair[1]];
        // If third or later entry with this name
      } else {
        queryObj[pair[0]].push(pair[1]);
      }
    }
    console.log('queryString()returns:');
    console.log(queryObj);
    return queryObj;
  }


//this function change the url
  var setUrlQuery = (function() {
    console.log("setUrlQuery()");
   
    var baseUrl =  window.location.href.split('?')[0];
    return function(query) {
      if (typeof query === 'string') {
        console.log("URL reset",query);
        window.history.replaceState(null, '', baseUrl + query);
      } else {
        console.log("URL reset",baseUrl);
        window.history.replaceState(null, '', baseUrl);
       
      }
    };
  })();






  $(document).ready(function() {
    console.log("ready()")
    var $tags = $('.js-tags');
    var $articleTags = $tags.find('.tag-button');
    //var $tagShowAll = $tags.find('.tag-button--all');
    var $result = $('.js-result');
    var $sections = $result.find('section');
    var sectionArticles = []
    var $lastFocusButton = null;
    var sectionTopArticleIndex = [];
    var hasInit = false;
    console.log('Element ready');
    $('.tag-button--all').addClass('focus');
    $sections.each(function() {
      sectionArticles.push($(this).find('.item'));
    });

    function init() {
      console.log("init()")
      var i, index = 0;
      for (i = 0; i < $sections.length; i++) {
        sectionTopArticleIndex.push(index);
        index += $sections.eq(i).find('.item').length;
      }
      sectionTopArticleIndex.push(index);
    }

    function searchButtonsByTag(_tag/*raw tag*/) {
      console.log("seachButtonsByTag()");
      if (!_tag) {
        return $tagShowAll;
      }
      var _buttons = $articleTags.filter('[data-encode="' + _tag + '"]');
      if (_buttons.length === 0) {
        return $tagShowAll;
      }
      return _buttons;
    }

    function buttonFocus(target) {
      console.log("buttonFocus()");
      if (target) {
        target.addClass('focus');
        $('.tag-button--all').removeClass('focus');
        $lastFocusButton && !$lastFocusButton.is(target) && $lastFocusButton.removeClass('focus');
        $lastFocusButton = target;
      }
    }

    function tagSelect (tag/*raw tag*/, target) {
      console.log("tagSelect()");
      var result = {}, $articles;
      var i, j, k, _tag;

      for (i = 0; i < sectionArticles.length; i++) {
        $articles = sectionArticles[i];
        for (j = 0; j < $articles.length; j++) {
          if (tag === '' || tag === undefined) {
            result[i] || (result[i] = {});
            result[i][j] = true;
          } else {
            var tags = $articles.eq(j).data('tags').split(',');
            for (k = 0; k < tags.length; k++) {
              if (tags[k] === tag) {
                result[i] || (result[i] = {});
                result[i][j] = true; break;
              }
            }
          }
        }
      }

      for (i = 0; i < sectionArticles.length; i++) {
        result[i] && $sections.eq(i).removeClass('d-none');
        result[i] || $sections.eq(i).addClass('d-none');
        for (j = 0; j < sectionArticles[i].length; j++) {
          if (result[i] && result[i][j]) {
            sectionArticles[i].eq(j).removeClass('d-none');
          } else {
            sectionArticles[i].eq(j).addClass('d-none');
          }
        }
      }

      hasInit || ($result.removeClass('d-none'), hasInit = true);

   
      if (target) {
        buttonFocus(target);
        _tag = target.attr('data-encode');
        console.log("tag is",_tag);
        if (_tag === '' || typeof _tag !== 'string') {
          setUrlQuery();
        } else {
          setUrlQuery('?tag=' + _tag);//important!!!!!!!!!!!!!!!!
        }
      } else {
        buttonFocus(searchButtonsByTag(tag));
      }
    }
    

    var query = queryString(), 
        _tag = query.tag;

    init(); 
    tagSelect(_tag);

    $tags.on('click', 'a', function() {   /* only change */
      tagSelect($(this).data('encode'), $(this));
    });

  });
})();