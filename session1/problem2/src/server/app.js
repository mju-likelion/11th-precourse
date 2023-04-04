import database from './store.js';

/**
 *
 * @param {['GET','POST']} method
 * @param {['post','user']} path
 */
export const handleDb = (method, path, value) => {
  if (method === 'GET') {
    return handleGet(path, value);
  } else if (method === 'POST') {
    return handlePost(path, value);
  } else {
    return new Error('method가 잘못됐습니다.');
  }
};

/**
 *
 * @param {['post','user']} path
 * @param {string | null} value
 */
const handleGet = (path, value = null) => {
  if (path === 'post') {
    return getPosts();
  } else if (path === 'user') {
    return getUser(value);
  } else {
    return new Error(`${path}는 없는 GET API입니다.`);
  }
};

let id = 10;
/**
 *
 * @param {['post','user']} path
 * @param {{text: string, author: string}} value
 */
const handlePost = (path, value) => {
  if (path === 'post') {
    savePost({ id: id++, ...value });
  } else {
    return new Error(`${path}는 없는 POST API입니다.`);
  }
};

// 성능 이슈로 인해 1.5초 뒤에 포스팅 목록을 반환해줍니다.
const getPosts = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(database.posts), 1500);
  });

// 포스팅을 등록합니다.
const savePost = (post) => {
  database.posts.push(post);
};

/**
 * @param {string} userName
 * 특정 유저 정보를 보여줍니다.
 * */
const getUser = (userName) => {
  const users = database.users;
  const findUser = users.find((user) => user.name === userName);
  if (findUser) {
    return findUser;
  } else {
    return { error: `이름이 ${userName}인 유저를 찾을 수 없습니다.` };
  }
};
