import { handleDb } from '../server/app.js';

/**
  포스팅 목록을 출력하는 함수를 작성하세요
  힌트:
  포스팅 목록을 불러오는 것은 1.5초가 소요됩니다.
  자바스크립트는 코드를 '비동기'적으로 처리합니다.
  즉, 1.5초를 다 기다리지 않고 다음 코드를 실행합니다.
*/
const getPosts = async () => {
  // createPostItem을 이용해 함수를 작성해보세요!
  $postContainer.innerHTML = '';
  const data = await handleDb('GET', 'post');
  data.map((item) => createPostItem(item));
};

/** 포스팅을 DB에 저장하는 함수를 handleDb에 적절히 파라미터를 넣어 완성해보세요 */
const savePost = (e) => {
  e.preventDefault();

  handleDb('POST', 'post', {
    text: $savePostInput.value,
    author: $savePostSelect.value,
  });

  $savePostInput.value = '';
  getPosts();
};

/** '유저이름'으로 검색해 결과를 출력해보세요! 출력 형식은 html을 참고해주세요 */
const getUser = (userName) => {
  const userInfo = handleDb('GET', 'user', userName);
  let hashTag = '';

  userInfo.info.forEach((tag) => (hashTag += `#${tag} `));

  $userName.textContent = userInfo.name;
  $userHashTag.textContent = hashTag;
};

///////////////////////////////////////////
// 이하 조작할 필요 없습니다. 대신, 해석해보세요!
///////////////////////////////////////////

// DOM을 조작하기 위해 html(document)에서 특정 엘리먼트들을 선택합니다.
const $postSaveBtn = document.querySelector('#savePostBtn');
const $savePostInput = document.querySelector('#savePostInput');
const $savePostSelect = document.querySelector('#savePostSelect');
const $postContainer = document.querySelector('#posts');
const $userSelect = document.querySelector('#userSelectButton');
const $userName = document.querySelector('#userNameText');
const $userHashTag = document.querySelector('#userInfoHashTag');

// post 정보를 읽어 html 엘리먼트로 바꿔줍니다.
const createPostItem = (item) => {
  const $newPost = document.createElement('li');
  const $id = document.createElement('h3');
  const $text = document.createElement('p');
  const $author = document.createElement('p');

  $text.textContent = item.text;
  $id.textContent = item.id;
  $author.textContent = item.author;

  $newPost.append($id, $text, $author);
  $postContainer.append($newPost);
};

const init = () => {
  getPosts();
  $postSaveBtn.addEventListener('click', savePost);
  $userSelect.addEventListener('change', () => getUser($userSelect.value));
};

document.addEventListener('DOMContentLoaded', init);
