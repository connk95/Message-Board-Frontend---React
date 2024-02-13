# Message Board Project (Frontend)

Welcome to my message board! This project aims to create a simple message board/SNS on which users can create an account, make posts, and interact with one another's posts. The frontend of this project was created using Typescript, React (Redux Toolkit), in a Vite environment. Styling was done using MUI.

## Table of Contents

- [Features](https://github.com/connk95/Message-Board-Frontend/main/README.md#features)
- [Demo](https://github.com/Message-Board-Frontend/blob/main/README.md#features)
- [Installation](https://github.com/connk95/Message-Board-Frontend/blob/main/README.md#installation)
- [Code Description](https://github.com/connk95/Message-Board-Frontend/blob/main/README.md#code-description)
- [Usage](https://github.com/connk95/Message-Board-Frontend/blob/main/README.md#usage)
- [Contributing](https://github.com/Message-Board-Frontend/blob/main/README.md#contributing)
- [License](https://github.com/connk95/Message-Board-Frontend/blob/main/README.md#license)
- [Acknowledgements](https://github.com/connk95/Message-Board-Frontend/blob/main/README.md#acknowledgements)

## Features

- Create an account or login using existing credentials.
- Make posts which can been seen by users across the site.
- Be social by interracting with and replying to other users' posts.
- View your post and comment history in the user tab.

## Demo

https://heroic-custard-3bcb1a.netlify.app/

## Installation

1. Clone this repository using the following command:
   ```
   git clone https://github.com/connk95/Message-Board-Frontend.git
   ```

2. Navigate to the project directory:
   ```
   cd Message-Board-Frontend
   ```

3. Run the app and view in your browser (You must have a backend running simultaneously!):
   ```
   npm run start
   ```

## Code Description

[App.tsx](https://github.com/connk95/Message-Board-Frontend/blob/main/src/App.tsx) - Contains the routing logic for the application's pages. Also contains logic for keeping the user logged in across all pages on the app.

[Pages](https://github.com/connk95/Message-Board-Frontend/tree/main/src/pages) - Contains the files for each page in the app. Users are greeted with the [Splash Page](https://github.com/connk95/Message-Board-Frontend/blob/main/src/pages/SplashPage.tsx) upon opening the app, and will have the option to create an account, login, or proceed to the home page if they are already logged in. The [Home Page](https://github.com/connk95/Message-Board-Frontend/blob/main/src/pages/HomePage.tsx) displays all of the posts made on the website, in order of most recent. Users can click on a post to view that post, or they can make a new post by clicking "New Post". The [New Post](https://github.com/connk95/Message-Board-Frontend/blob/main/src/pages/NewPost.tsx) page will prompt the user for a post title and body. The [Post Page](https://github.com/connk95/Message-Board-Frontend/blob/main/src/pages/PostPage.tsx) displays one post plus all of its comments, with an input box at the bottom for users to add comments. The header features a logo which allows users to navigate to the home page regardless of login status. The header also allows users to navigate to the [Login Page](https://github.com/connk95/Message-Board-Frontend/blob/main/src/pages/LoginPage.tsx), the [Signup Page](https://github.com/connk95/Message-Board-Frontend/blob/main/src/pages/SignUpPage.tsx), and the [User Page](https://github.com/connk95/Message-Board-Frontend/blob/main/src/pages/UserPage.tsx) on which the user can view their own posts and comments, and navigate to their respective post pages. Users who are not logged in cannot make new posts or comments.

[Redux](https://github.com/connk95/Message-Board-Frontend/tree/main/src/redux) - Contains the redux store, hooks, and subfolders with actions, slice, and type. The [Auth Actions](https://github.com/connk95/Message-Board-Frontend/blob/main/src/redux/auth/auth.actions.ts) allows for user login, persistence of user login, user logout, and create user. The [Post Actions](https://github.com/connk95/Message-Board-Frontend/blob/main/src/redux/post/post.actions.ts) allows for fetching a single or all posts, creating a new post, and creating a new comment. The [User Actions](https://github.com/connk95/Message-Board-Frontend/blob/main/src/redux/user/user.actions.ts) allows for creating and fetching users.

[Utilities.jsx](https://github.com/connk95/Message-Board-Frontend/blob/main/src/utils/utilities.jsx) - Contains logic for creating clickable links within post or message text.

[Header.tsx](https://github.com/connk95/Message-Board-Frontend/blob/main/src/components/header.tsx) - A header with the site logo, login and create account links (when not logged in), and user page and logout links (when logged in), as well as a welcome message.

## Usage

1. Create an account by clicking the "Create Account" button. You will be navigated to the sign up page, where you be prompted to input a username, email address, and password. For the sake of this project, you may use a fake email as it does not require varification.
2. On the home page, you can create a new post by clicking the "New Post" button, or navigate to other users' posts. Let's start by making a new post.
3. On the new post screen you will be prompted to enter a title and body. Once finished you may click "Submit". You will be redirected to the home page.
4. By clicking on your post you navigate to the post page, where you can leave a comment.
5. To view your posts and comments, you can navigate to the user page by clicking on the user icon in the top right.
6. You can logout by clicking "Logout" in the top right.

## Contributing

Contributions to this project are welcome! If you find any bugs or have ideas for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- This project was created by Connor Ketcheson.
- Stock images are from Storyset.
- Special thanks to [Edward Peng](https://github.com/edwardnz2017) for their guidance and support.

Enjoy your message board experience! If you have any questions or feedback, please don't hesitate to contact us.

---
