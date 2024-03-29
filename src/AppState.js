import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Post.js').Post[]} */
  posts: [],
  activePost: null,
  postsPage: '',
  olderPage: '',
  newerPage: '',
  ads: [],
  /** @type {import('./models/Profile.js').Profile|null} */
  profile: null,
  /** @type {import('./models/Profile.js').Profile[]} */
  profiles: [],

})
