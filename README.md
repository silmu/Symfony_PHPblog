# FullStack Blog page

Simple fullstack webpage created with Symfony and React.

# Steps to follow

1. Copy the folder to SymfonyMAMP and rename to "web". Then cd to "web"
2. Install dependencies using `composer install`
3. Install front-end dependencies using `npm install`
<!-- 4. Do the migration:

   - Open file .env in "SYMFONY-MAMP" folder (not the "web" folder!)
   - Rename database to `DATABASE_NAME=ToDOdb `. ToDOdb is the database we use for the to do list.
   - Open Docker > symfony-mamp_www_1 > CLI
   - cd to "web" folder
   - Run `php bin/console make:migration`
   - Run `php bin/console doctrine:migrations:migrate`. If you get errors that ToDOdb doesn't exist restart docker container a few times. -->

4. Afterwards you can run webpack encore using following command
   `npm run watch`
5. Start Docker container SYMFONY-MAMP
6. Visit URL: http://localhost:8007/ to see the app
7. Use Crtl + C to stop the watch

# Tech stack

1.  [Symfony](https://symfony.com/)
2.  [PHP](https://www.php.net/)
3.  [React](https://reactjs.org)
4.  [MySQL](https://www.mysql.com)
5.  [SymfonyMAMP](https://github.com/kalwar/Symfony-MAMP)
