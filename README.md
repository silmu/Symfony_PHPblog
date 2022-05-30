# FullStack Blog page

Simple fullstack webpage created with Symfony and React.
You can register a new user and login.
Each user has a personal privite account where they can create posts.
Main page contains a shared feed of public posts that everyone can see.

# Steps to follow

1. Copy the folder to SymfonyMAMP and rename to "web". Then cd to "web"
2. Install dependencies using `composer install`
3. Install front-end dependencies using `npm install`
4. Create database: copy the content of createStatements.sql file and run it in phpMyAdmin.
5. Afterwards you can run webpack encore using following command
   `npm run watch`
6. Start Docker container SYMFONY-MAMP
7. Visit URL: http://localhost:8007/ to see the app
8. Use Crtl + C to stop the watch
9. You can use username "admin" with password "admin" or username "admin2" with password "admin". Alternatively, you can register a new user.

# Tech stack

1.  [Symfony](https://symfony.com/)
2.  [PHP](https://www.php.net/)
3.  [React](https://reactjs.org)
4.  [MySQL](https://www.mysql.com)
5.  [SymfonyMAMP](https://github.com/kalwar/Symfony-MAMP)
