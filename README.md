# todolist

The front-end part uses pure CSS, JavaScript, and the back-end uses Nodejs's Express framework to build a server to synchronize the MySQL database in real time.

## fature

- login/register（Use session to monitor user login status）
- add/delete、compelete/cancel todolist
- get the number of agents in real time

## Page display

- **main page**

  ![main](https://items-picture.oss-cn-beijing.aliyuncs.com/todo/main.png)

- **register**

  ![register](https://items-picture.oss-cn-beijing.aliyuncs.com/todo/retister.gif)

- **login**

  ![login](https://items-picture.oss-cn-beijing.aliyuncs.com/todo/login.gif)

- **test**

  ![test](https://items-picture.oss-cn-beijing.aliyuncs.com/todo/handle.gif)

## MySQL data sheet

### userinfo

```
create table userinfo(`UserName` varchar(64) not null,`UserPass` varchar(64) not null, primary key(UserName));
```

### todolist

```
create table todo_list(`todo_id` int not null auto_INCREMENT,`UserName` varchar(64) not null,`todo` varchar(999) not null,`createTime` varchar(13) not null, primary key(todo_id));
```

### donelist

```
create table done_list(`done_id` int not null auto_INCREMENT,`UserName` varchar(64) not null,`done` varchar(999) not null,`createTime` varchar(13) not null, primary key(done_id));
```

## assets source

- background-image：https://pixabay.com/
- font-family：https://fonts.google.com/
- font-icon：http://www.fontawesome.com.cn/