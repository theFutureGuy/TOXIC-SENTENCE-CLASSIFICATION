const POST_COMMENT_BTN = document.getElementById('post');
const COMMENT_TEXT = document.getElementById('comment');
const COMMENTS_LIST = document.getElementById('commentsList');


const PROCESSING_CLASS = 'processing';

const TOXIC_CLASS = 'toxic';

const TOXIC_THRESHOLD = 75;

POST_COMMENT_BTN.addEventListener('click', handleCommentPost);


function handleCommentPost() {
  if (! POST_COMMENT_BTN.classList.contains(PROCESSING_CLASS)) {
    let currentComment = COMMENT_TEXT.innerText.trim();
    //basecase
    if (currentComment.length === 0) 
    {
      COMMENT_TEXT.innerText = '';  
      COMMENT_TEXT.focus();
    } 
    
    else {
      POST_COMMENT_BTN.classList.add(PROCESSING_CLASS);
      COMMENT_TEXT.classList.add(PROCESSING_CLASS);
    
        let div = document.createElement('div');
        div.classList.add('relative', 'col-span-full', 'rounded-2xl', 'overflow-hidden', 'border', 'border-gray-80', 'border-opacity-20', 'shadow-2xl', 'mt-8', 'p-4', 'md:text-2xl', 'text-gray-80');
        let p = document.createElement('p');
        p.innerText = currentComment.split(' ').slice(0, 20).join(' ');

        div.appendChild(p);
        COMMENTS_LIST.prepend(div);

      // Reset comment text.
      COMMENT_TEXT.innerText = '';
      
    
      loadAndPredict(currentComment).then(function(toxicityLevel) {

        POST_COMMENT_BTN.classList.remove(PROCESSING_CLASS);
        COMMENT_TEXT.classList.remove(PROCESSING_CLASS);
        if (toxicityLevel >= TOXIC_THRESHOLD) {
          div.classList.add(TOXIC_CLASS);
        } 
      });
    }
  }
}