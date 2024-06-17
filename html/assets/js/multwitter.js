let confBtn = document.getElementById('confBtn');

// Hide / show configuration
confBtn.addEventListener('click', function() {
    let state = confBtn.getAttribute('state');

    if(state == 'closed') {
        document.getElementById('feedConfsContainer').style.display = 'block';
        confBtn.textContent = 'Hide configuration';
        confBtn.setAttribute('state', 'opened');
    } else {
        document.getElementById('feedConfsContainer').style.display = 'none';
        confBtn.textContent = 'Show configuration';
        confBtn.setAttribute('state', 'closed');
    }
});

// Switch theme configuration 
function switchTheme() {
    let theme = sessionStorage.getItem('theme');
    sessionStorage.setItem('theme', (theme == 'light' || theme == null) ? 'dark' : 'light');
    location.reload();
}

/***************************/ 
/******Loading feeds********/
/***************************/

// Loading feeds configuration + feeds display
document.addEventListener("DOMContentLoaded", function() {
    Object.keys(sessionStorage).sort().forEach((feedID, index) => {
        if(feedID.indexOf('feed-') > -1) {
            addFeedInput(feedID, sessionStorage.getItem(feedID)); 
        }
    });

    let theme = sessionStorage.getItem('theme');
    if(theme == 'light' || theme == null) { theme = 'light'; } else { theme = 'dark'; }
    document.documentElement.setAttribute('class', theme);

    // Display the saved feeds on loading
    displayFeeds();
});

function displayFeeds() {
    let feedsContainer = document.getElementById('feedsContainer');

    // clean html
    feedsContainer.innerHTML = '';

    Object.keys(sessionStorage).sort().forEach((feedID, index) => {

        if(feedID.indexOf('feed-') > -1) {
            // Create the container for the feed content
            let feedContainer = document.createElement('div');
            feedContainer.setAttribute('class', 'feedContainer');

            // Create the feed content link
            let feedContent = document.createElement('a'); 
            feedContent.setAttribute('class', 'twitter-timeline');
            feedContent.setAttribute('href', sessionStorage.getItem(feedID)+'?ref_src=twsrc%5Etfw');
            feedContent.textContent ='Loading feed ...';
            // If theme is set 
            let theme = sessionStorage.getItem('theme');
            if(typeof theme != 'undefined' && theme != null) {
                feedContent.setAttribute('data-theme', theme);
            }            

            // Add the a tag to feed container
            feedContainer.append(feedContent);
            // Add the feed container to global feeds container
            feedsContainer.append(feedContainer);
        }
    });
}

  
/***************************/ 
/********Adding feeds*******/
/***************************/
let addFeedBtn = document.getElementById('addFeed');

// add button trigger to display new feed source input
addFeedBtn.addEventListener('click', function() {
    let id = 'feed-'+document.querySelectorAll('.feedSource').length;
    addFeedInput(id);
});

// Create the inputs
function addFeedInput(id, feedVal = '') {
    // Create the input
    let newFeed = document.createElement('input');
    newFeed.setAttribute("type", "text");
    newFeed.setAttribute('id', id);
    newFeed.setAttribute('class', 'feedSource');
    newFeed.setAttribute('onchange', 'saveFeed(\''+id+'\')');

    if(feedVal != '') {
        newFeed.value = feedVal;
    }

    // Create the wrapper for the input and the button
    let inputWrapper = document.createElement('div');
    inputWrapper.setAttribute('class', 'inputWrapper');

    // Create the delete button related to the input
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'deleteBtn');
    deleteButton.setAttribute('onclick', 'removeFeed(\''+id+'\')');
    deleteButton.textContent = 'X'; 

    // Combine Wrapper + input + button
    inputWrapper.append(newFeed);
    inputWrapper.append(deleteButton);

    // Add the wrapper to the DOM
    addFeedBtn.before(inputWrapper)
}

/***************************/ 
/********Saving feeds*******/
/***************************/

// Save the feed in sessionStorage
function saveFeed(id) {
    sessionStorage.setItem(id, document.getElementById(id).value);
}

/***************************/ 
/******Removing feeds*******/
/***************************/

// Remove feed from sessionStorage and DOM
function removeFeed(id) {
    if (window.confirm('Are you sure you want to remove this feed source? ('+sessionStorage.getItem(id)+')')) {
        sessionStorage.removeItem(id);
        document.getElementById(id).parentElement.remove();
    }    
}