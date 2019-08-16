/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const timeDifference = function(current, previous) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const elapsed = current - previous;
  let plural = 's';
  if (elapsed < msPerMinute) {
    const seconds = Math.round(elapsed / 1000);
    if (seconds === 1) plural = '';
    return seconds + ' second' + plural + ' ago';
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    if (minutes === 1) plural = '';
    return minutes + ' minute' + plural + ' ago';
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    if (hours === 1) plural = '';
    return hours + ' hour' + plural + ' ago';
  } else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    if (days === 1) plural = '';
    return days + ' day' + plural + ' ago';
  } else if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    if (months === 1) plural = '';
    return months + ' month' + plural + ' ago';
  } else {
    const years = Math.round(elapsed / msPerYear);
    if (years === 1) plural = '';
    return years + ' year' + plural + ' ago';
  }
};




const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// CREATE TWEET ELEMENT
const createTweetElement = function(tweet) {
  const currentDate = new Date();
  const markup = $(`
    <article class="tweet">
      <img src="${tweet.user.avatars}"<>
        <h3>${tweet.user.name}</h3>
          <h3 class="handle">${tweet.user.handle}</h3>
          <p>${tweet.content.text}</p>
          <footer>${timeDifference(currentDate, tweet.created_at)}
          <div class="footer-icons"> <i class="far fa-heart"></i> <i class="far fa-comment-alt"></i> 
          <i class="fas fa-retweet"></i> </div>
      </footer>
    </article>`);

  return markup;
};


// RENDER TWEET ELEMENT
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $("#tweet-wrapper").prepend(createTweetElement(tweet));
  }
};

// LOAD TWEETS
const loadTweets = function() {
  return $.ajax({
    url: '/tweets/',
    type: "GET",
    success: function (data) {
      $("#tweet-wrapper").empty();
      //console.log(data);
      renderTweets(data);
    }
  });
};

// DOCUMENT READY
$(document).ready(function() {
  loadTweets();

  const $form = $('#form');
  $form.on('submit', function(event) {
    const url = $(this).attr("action");
    const type = $(this).attr("method");
    event.preventDefault();
    const data = $(this).serialize();

    const msgArea = data.substring(5);
    if (msgArea === "" || msgArea === null) {
      $("#error1").slideDown(200).delay(2000).fadeOut(400);
    }
    if (msgArea.length > 140) {
      $("#error2").slideDown(200).delay(2000).fadeOut(400)(function() {
        return $(this).delay(2000).then(function() {
          return $(this).fadeOut(400);
        });
      });
    }
    $.ajax({
      url: url,
      type: type,
      data: data
    })
      .then(function() {
        loadTweets();
        console.log('Success', data);
        // $('#tweet-wrapper').append(morePostsHtml);
        $(".msg").val(""); //get rid of text once submitted
      });
  });


  $(".comp-container").hide();
  $("#nav-arrow").on("click", function() {
    $(".comp-container").slideToggle("complete", function() {
      $(".comp-container").focus();
      $(".msg").focus();
    });
  });
  // w3schools + https://paulund.co.uk/how-to-create-an-animated-scroll-to-top-button-with-jquery
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('#topbutton').fadeIn();
    } else {
      $('#topbutton').fadeOut();
    }
  });

  $('#topbutton').click(function() {
    window.scrollTo(0, 0);
  });

  $("#error1").hide();
  $("#error2").hide();


});