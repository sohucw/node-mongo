# node 接口

### mongodb 快速启动

start mongodb

```bash
# mongodb安装路径 执行下面命令
# 语法是：mongod --dbpath [数据库目录]
$ F:\mongodb\bin\mongod --dbpath G:\study\MsInterface-me\data

$ /usr/local/mongodb/bin/mongod --dbpath ~/Desktop/ms-interface/_data/db
$ /usr/local/mongodb/bin/mongo
```

## mongodb 创建本地数据库

1. 创建数据库存储文件夹

```bash
# 创建data文件夹
$ mkdir _data

# 在当前目录下创建数据库文件夹
$ mkdir _data/db
```

2. 将 mongodb 关联起来

```bash
# 切换到 mongodb 路径下
$ cd /usr/local/mongodb/bin

# 将mongodb 关联起来
$ ./mongod --dbpath ~/Desktop/ms-interface/_data/db

# 打开新的terminal
$ command + N

# 进入mongodb bin目录
$ cd /usr/local/mongodb/bin

# 执行 连接数据库
$  ./mongo
```


### 开发环境

```bash
npm start
```
### 接口说明
- // 根据owner查下的接口 
- http://localhost:5000/api/v1/userEvents?returnValues.owner=0xf09B8dda559292111Af945e91717dA39eEF34Ade
- // 获取排名的接口
- http://localhost:5000/api/v1/userEventCounts