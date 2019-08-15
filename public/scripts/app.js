/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const timeDifference = function (current, previous) {
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

const data = [{
    "user": {
      "name": "Ben",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirBen"
    },
    "content": {
      "text": "Just found out that to get in a relationship I can't constantly isolate myself from everyone...lots to process."
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Susan",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@TheRealSusan"
    },
    "content": {
      "text": "And in the end...the people you end up being closest to are the ones who send you memes while they're on the toilet."
    },
    "created_at": 1461113959088
  }
]

// CREATE TWEET ELEMENT
const createTweetElement = function (tweet) {
  const currentDate = new Date();
  const markup = $(`
    <article class="tweet">
      <img src="${tweet.user.avatars}"<>
        <h3>${tweet.user.name}</h3>
          <h3 class="handle">${tweet.user.handle}</h3>
          <p>${tweet.content.text}</p>
          <footer>${timeDifference(currentDate, tweet.created_at)}
          <div class="footer-icons"> <i class="far fa-heart"></i> <i class="far fa-comment-alt"></i> <i
        class="fas fa-retweet"></i> </div>
      </footer>
    </article>`);

  return markup;
};


// LOAD TWEETS
const loadTweets = function () {
  $.get('/tweets').then((result) => {
    renderTweets(result, false);
  });
};

// RENDER TWEET ELEMENT
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $("#tweet-wrapper").append(createTweetElement(tweet));
  }
};
// DOCUMENT READY
$(document).ready(function () {
  renderTweets(data);
  

  const $form = $('#form')
  $form.on('submit', function (event) {
    event.preventDefault(); //prevent default action 
    let url = $(this).attr("action"); //get form action url
    let type = $(this).attr("method"); //get form GET/POST method
    let data = $(this).serialize(); //Encode form elements for submission

    console.log('Button clicked, performing ajax call...');
    $.ajax({
      url: url,
      type: type,
      data: data
    }).then(function (morePostsHtml) {
      console.log('Success', data)
      loadTweets();
      $('#tweet-wrapper').append(morePostsHtml);
      $(".msg").val(""); //get rid of text once submitted
    });
  });
});
