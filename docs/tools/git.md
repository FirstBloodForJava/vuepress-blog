# git



## 在git新建项目

新建.gitignore文件上传到git仓库

~~~bash
git add .gitignore #添加到暂存区
git commit -m '' #添加到本地仓库

git remote add origin https://github.com/FirstBloodForJava/spring_official.git #添加远程仓库的 URL
git remote add origin git@github.com:your_username/your_repository.git # 关联远程Git仓库并且命名为origin
git remote add spring_official git@github.com:FirstBloodForJava/spring_official.git

git push -u origin master #-u 参数是为了将本地 Git 仓库的分支与远程 Git 仓库的分支关联起来，origin 为远程 Git 仓库的名称，master 为要推送的分支名称。
git push -u spring_official master

git push # 将本地仓库推送到远程仓库命令提示：fatal: The current branch master has no upstream branch.To push the current branch and set the remote as upstream, use git push --set-upstream origin master
# Git 不知道要将更改推送到哪个分支。这通常是由于您尚未将本地分支与远程分支关联而导致的
git push --set-upstream origin master # 该命令将在远程仓库中创建一个名为 master 的分支，并将您当前的分支与其关联

~~~



## 生成SSH密钥

~~~bash
# 生成私钥公钥
ssh-keygen -t ed25519 -C "your_email@example.com" # -t ed25519表示使用Ed25519算法生成密钥对,还有rsa、dsa、ecdas等
ssh-keygen -t ed25519 -C "1164864987@qq.com"
ssh-keygen -t ed25519 -C "1164864987@qq.com" -f "D:\keys\spring_official" #将密钥文件保存在 D:\keys 目录下

# 查询密钥
ssh-add -l 
#出现 Could not open a connection to your authentication agent. 执行eval $(ssh-agent)
#出现 The agent has no identities.表示没有配置SSH密钥

# 添加密钥
ssh-add D:/keys/spring_official
# Identity added: D:/keys/spring_official (1164864987@qq.com) 表示添加成功

#将公钥添加到github
将spring_official.pub文件内容复制，在gitbub的Settings下的SSH and GPG keys新建ssh key，粘贴内容
~~~

![生成文件信息](http://47.101.155.205/image-20230417122535275.png)



## idea git 使用



![image-20230417160657549](http://47.101.155.205/image-20230417160657549.png)



## git checkout

~~~bash
git checkout <branckName> # 切换分支，
git checkout -b <new-branch> # 创建并切换到一个新的分支

~~~





## git branch

本地分支

~~~bash
git branch # 查询本地分支
git branch -d <branch-name> # 删除分支
git branch | grep -v "master" | xargs git branch -D # 如果当前选中的不是master分支，则删除失败
git branch <branch-name> # 新建分支


~~~



## git push

~~~bash
git push # 将当前分支的本地提交推送到远程仓库的同名分支。
git push origin <branch> # 指定分支的本地提交推送到远程仓库(连接名为origin)的同名分支

git push origin <本地分支名>:<远程分支名> # origin 表示连接名 
git push origin master:master

git push --all # 将本地所有分支推送到远程仓库。
git push --tags # 将本地所有标签推送到远程仓库。
git push --force # 强制推送本地提交，覆盖远程仓库上的提交。慎用，可能导致冲突和数据丢失。

git push -u origin main:master #将本地的main分支推送到远程的master分支，把推送的分支和远程仓库的分支建立“关联关系”，方便以后的推送和拉取操作。
~~~





## git remote

~~~bash
#查询
git remote -v

# 删除远程仓库连接
git remote rm <remote_name>
git remote rm origin

# 新增 origin为仓库别名
git remote add origin <url>
git remote add origin https://github.com/FirstBloodForJava/spring_official.git

#修改
git remote set-url <remote_name> <new_url> # remote_name是你要修改的远程仓库的名称，new_url是新的远程仓库的URL。
git remote set-url origin https://github.com/FirstBloodForJava/spring_official.git


~~~



## git pull

从远程仓库获取`最新的提交记录`并将其合并到本地分支。

~~~bash
git pull # 默认会将远程仓库的代码(例如当前分支为main分支，则origin的main分支)拉取到当前本地分支
git pull <remote> <branch> # 从远程仓库连接remote的branch分支拉取最新的代码
git pull --rebase # 在拉取远程仓库最新代码之前，先将本地仓库未提交的修改先提交到本地仓库，再拉取远程仓库的最新代码，最后将本地修改的代码合并到最新代码之后。
git pull --no-rebase # 拉取最新的代码，并采用 merge 的方式进行合并，不使用 rebase 的方式
git pull --squash # 将所有远程提交的更改压缩为一个单独的提交，并将其添加到暂存区中
~~~





## git merge

~~~bash
git merge --continue
git merge --abort
~~~



## git fetch

用于从远程仓库获取最新的代码和提交记录，但不会将这些更新合并到本地分支上，而是只是将它们下载到本地，用户可以在本地查看、比较和合并它们。

~~~bash
git fetch --all # 所有的远程仓库获取最新的代码和提交记录到本地，但不会合并到本地分支
git fetch <remote> # 从定的远程仓库(remote)获取最新的代码和提交记录到本地，但不会合并到本地分支
git fetch <remote> <branch> # 从指定的远程仓库获取指定分支的最新代码和提交记录到本地，但不会合并到本地分支
git fetch --tags # 从远程仓库获取所有的标签信息到本地。

~~~



## git reset

~~~bash
git reset HEAD^n # 表示回退到当前 HEAD 的前 n 个版本
git reset <commit值> # 回退到的版本的commit提交值

~~~



## git revert

撤销一个已提交的修改。

用于撤销指定的提交（commit），并生成一个新的提交来反转该提交的更改。这个新的提交可以被 push 到远程仓库来分享给其他开发者

~~~bash
git revert <commit-id> # 撤销指定的提交，并创建一个新的提交记录来记录这个撤销操作。
git revert <commit-id> --no-commit # 撤销的更改放在工作目录中，撤销之后手动编辑工作目录并提交修改

git revert <commit-id-1> <commit-id-2> ... # 这个命令会按照给定的提交顺序，从最新的提交开始逐一撤销每个提交，并创建一个新的提交记录来记录这个撤销操作

git revert -n <commit-id> # 撤销指定的更改，相当于自己修改了文件，需要自己手动add，commit命令提交这个新的修改

git revert <commit-id>..HEAD # 撤销指定提交之后的所有更改，并创建一个新的提交来记录这个撤销操作

git revert <commit-id>^..HEAD # 撤销指定提交之前的所有更改，并创建一个新的提交来记录这个撤销操作
~~~



## git stash

暂存当前修改的代码，以便在未来恢复。

~~~ bash
git stash save [massage] # 将当前工作目录下的所有修改保存到stash中，massage表示一个描述修改
git stash list # 列出当前存储在stash中的所有项
git stash apply [stash] # 应用存储在stash中的指定或最新的修改，并将其应用到当前工作目录
git stash pop [stash] # 应用存储在stash中的指定或最新的修改，并从stash中删除该项
git stash drop [stash] # 删除存储在stash中的指定或最新的修改
git stash clear # 删除stash中的所有修改
git stash branch <brachName> [stash] # 基于指定的stash创建一个新的分支，并将其用于该分支

~~~





## git diff

显示当前工作目录中与暂存区或本地仓库中不同的内容

~~~bash
git diff # 显示当前工作目录中与暂存区之间的差异
git diff <commit> # 显示当前工作目录与指定的提交之间的差异
git diff <commit> <commit> # 显示两个提交之间的差异
git diff <branch> <branch> # 显示两个分支之间的差异

git diff --cached # 显示暂存区和最新提交之间的差异
git diff --name-only # 只显示有差异的文件名
git diff --color-words #以单词为单位比较文件差异并加上颜色高亮
git diff --stat # 显示文件差异的统计信息
git diff --check #检查空格错误
git diff --word-diff # 以单词为单位比较文件差异，不用的地方用不同的颜色标出来

~~~



## git tag

创建、列出或删除 Git 仓库中的标签

git标签分为两种：轻量标签和附注标签

轻量标签是指向某个提交的引用，不包含额外的信息

附注标签包含标签名，标签创建者，标签注释等信息

默认情况下创建轻量标签，创建附注标签，只需要在标签后面加上`-a`

~~~bash
git tag #列出所有标签
git tag -l <pattern> #列出任意匹配的标签
git tag <tagname> # 给当前提交打标签
git tag <tagname> <commit> # <commit>为提交的id，git log可以查看，给历史提交打标签
git tag -a <tagname> -m '<message>' # 给当前提交打带注释的标签
git show <tagname> # 查看标签信息

git tag -d <tagname> #删除标签

git push origin <tagname> # 推送标签到远程仓库
git push origin --tags # 推送所有标签到远程仓库

git checkout <tagname> # 检出某个标签
~~~





## 远程分支合并

将远程分支master合并至main分支

~~~bash
git checkout <main>
git pull origin <main>
git merge origin/master # 将远程仓库的master分支合并到本地的main分支上
# （如果两个分支没有共同起点）
git merge origin/master --allow-unrelated-histories # 合并后可能需要手动解决冲突

# 解决冲突代码后执行代码git merge --continue 会报错，提示需要将文件add或者commit之后才能继续，
git add . # 添加到暂存区
git commit -m '' # commit之后，没有冲突，就会自动退出main/MERGING状态


git push origin main # 推送代码到远程分支main
~~~



![合并出现冲突](http://47.101.155.205/image-20230417221728060.png)



![冲突文件信息](http://47.101.155.205/image-20230417223454056.png)



不能直接git merge --continue

![修改之后文件需要git add和commit](http://47.101.155.205/image-20230417224205403.png)



git status *.gitignore查询这个文件的状态

![git status查询文件状态](http://47.101.155.205/image-20230417224459198.png)



![git add及commit自动退出merge](http://47.101.155.205/image-20230417225028972.png)



最终git push

![push](http://47.101.155.205/image-20230417225215708.png)

## git本地账号切换

~~~bash
#当前项目替换
git config user.name "Your Name"
git config user.email "your_email@example.com"

git config user.name "FirstBloodForJava"
git config user.email "1164864987@qq.com"

#全局替换
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"

~~~



## git代理

~~~bash
# 查询当前代理配置
git config http.proxy
git config https.proxy

# 只给当前git项目配置代理
git config http.proxy http://your_proxy_address:your_proxy_port
git config https.proxy http://your_proxy_address:your_proxy_port

git config --local http.proxy http://127.0.0.1:33210
git config --local https.proxy https://127.0.0.1:33210

# 全局配置代理
git config --global http.proxy http://your_proxy_address:your_proxy_port
git config --global https.proxy http://your_proxy_address:your_proxy_port

# 取消当前git代理
git config --unset http.proxy
git config --unset https.proxy

# 取消全局代理
git config --global --unset http.proxy
git config --global --unset https.proxy

~~~



## git rebase

![image-20230808215735619](http://47.101.155.205/image-20230808215735619.png)



当前选中的master分支，rebase 'master' onto 'origin/main'意思是将当前分支（通常是master分支）的修改应用到origin/main分支上。(还不是很清楚)



## git merge

![image-20230808221315854](http://47.101.155.205/image-20230808221315854.png)

将 `origin/main` 分支上的最新提交合并到本地 `master` 分支上

~~~bash
# main分支在这里为主分支,本地切换为master分支
checkout master

# 将main分支上面的修改合并至本地分支master
git merge origin/main

~~~



## 码云

### 生成公钥

~~~bash
# C:\Users\oycm\.ssh 目录下：

ssh-keygen -t ed25519 -C "xxxxx@xxxxx.com" <public-key>

cat ~/.ssh/id_ed25519.pub <public-key>

~~~

