// --- 模块导入与初始化 ---
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const https = require('https');

const app = express();
const port = 3000;

// --- 全局中间件与静态文件配置 ---
app.use(cors()); // 启用CORS，允许跨域请求
app.use(express.json()); // 解析JSON格式的请求体

// --- 目录与文件路径配置 ---
// 配置并确保图片上传目录存在
const uploadsDir = path.join(__dirname, 'uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');
const postsDir = path.join(uploadsDir, 'posts');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir);
if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);

// 配置静态资源服务，用于访问 static 和 uploads 目录下的文件
app.use('/static', express.static(path.resolve(__dirname, '../static')));
app.use('/uploads', express.static(uploadsDir));

// 数据库文件路径
const dbPath = path.join(__dirname, 'database', 'db.json');

// 配置 multer 的存储引擎，用于处理文件上传
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		// 根据请求路径动态判断上传目录
		if (req.path.includes('avatar')) {
			cb(null, avatarsDir); // 上传头像
		} else if (req.path.includes('post')) {
			cb(null, postsDir); // 发布作品
		} else {
			cb(new Error('无效的上传路径'), null);
		}
	},
	filename: function(req, file, cb) {
		// 生成唯一文件名，防止覆盖
		const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
		cb(null, uniqueSuffix);
	}
});
const upload = multer({
	storage: storage
});


// --- 数据库辅助函数 ---
/**
 * @description 同步读取并解析db.json文件内容
 * @returns {object} 解析后的JSON数据库对象
 */
function readDB() {
	const data = fs.readFileSync(dbPath, 'utf8');
	return JSON.parse(data);
}

/**
 * @description 将数据对象格式化并同步写入db.json文件
 * @param {object} data - 需要写入数据库的完整JSON对象
 */
function writeDB(data) {
	fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}


// =================================================================
// --- API 路由定义 ---
// =================================================================

// --- (一) 通用 API ---

/**
 * @description 获取所有艺术风格分类数据
 * @route GET /api/art-styles
 */
app.get('/api/art-styles', (req, res) => {
	try {
		const db = readDB();
		res.json({ success: true, art_styles: db.art_styles || [] });
	} catch (error) {
		res.status(500).json({ success: false, message: '读取数据库时出错', error: error.message });
	}
});

/**
 * @description 获取首页 "每日一赏" 的推荐内容
 * @route GET /api/featured
 */
app.get('/api/featured', (req, res) => {
	try {
		const db = readDB();
		const featured = db.featured_content;

		if (!featured || !featured.type || !featured.id) {
			return res.status(404).json({ success: false, message: '未设置推荐内容' });
		}
		
		// 根据推荐类型，在对应的集合中查找具体条目
		const collectionName = `${featured.type}s`; // e.g., 'courses', 'posts'
		const collection = db[collectionName] || [];
		const featuredItem = collection.find(item => item.id === featured.id);

		if (featuredItem) {
			res.json({ success: true, item: { ...featuredItem, ...featured } });
		} else {
			res.status(404).json({ success: false, message: '推荐的内容未找到' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: '获取推荐内容失败', error: error.message });
	}
});


// --- (二) 用户与认证 API ---

/**
 * @description 用户登录
 * @route POST /api/login
 */
app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ success: false, message: '用户名和密码不能为空' });
	}
	try {
		const db = readDB();
		const user = db.users.find(u => u.username === username && u.password === password);

		if (user) {
			// 确保用户有一个默认头像
			if (!user.avatar) {
				user.avatar = `http://localhost:${port}/static/logo.png`;
			}
			const { password, ...userToReturn } = user; // 从返回数据中移除密码
			res.json({ success: true, message: '登录成功', user: userToReturn });
		} else {
			res.status(401).json({ success: false, message: '用户名或密码错误' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: '服务器内部错误', error: error.message });
	}
});

/**
 * @description 用户注册
 * @route POST /api/register
 */
app.post('/api/register', (req, res) => {
	const { username, password, nickname } = req.body;
	if (!username || !password || !nickname) {
		return res.status(400).json({ success: false, message: '用户名、密码和昵称均不能为空' });
	}
	try {
		const db = readDB();
		if (db.users.find(u => u.username === username)) {
			return res.status(409).json({ success: false, message: '用户名已存在' });
		}
		
		const newUser = {
			id: (db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) : 0) + 1,
			username,
			password, 
			nickname,
			avatar: '',
			bio: '这位用户很神秘，什么也没留下...',
			achievements: []
		};
		db.users.push(newUser);
		writeDB(db);
		
		res.status(201).json({ success: true, message: '注册成功！' });
	} catch (error) {
		res.status(500).json({ success: false, message: '服务器内部错误', error: error.message });
	}
});

/**
 * @description 更新用户个人资料
 * @route PUT /api/profile
 */
app.put('/api/profile', (req, res) => {
    const { userId, nickname, bio } = req.body;
    if (!userId || !nickname) {
        return res.status(400).json({ success: false, message: '用户ID和昵称不能为空' });
    }
    try {
        const db = readDB();
        const userIndex = db.users.findIndex(u => u.id === parseInt(userId, 10));

        if (userIndex > -1) {
            // 更新用户资料
            db.users[userIndex].nickname = nickname;
            db.users[userIndex].bio = bio;
            
            // 同步更新该用户所有帖子中的作者昵称
            (db.posts || []).forEach(post => {
                if (post.userId === parseInt(userId, 10)) {
                    post.userNickname = nickname;
                }
            });

            writeDB(db);
            
            const { password, ...updatedUser } = db.users[userIndex];
            res.json({ success: true, message: '资料更新成功', user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: '用户不存在' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: '更新资料失败', error: error.message });
    }
});

/**
 * @description 上传用户头像
 * @route POST /api/upload-avatar
 */
app.post('/api/upload-avatar', upload.single('avatar'), (req, res) => {
	const userId = parseInt(req.body.userId, 10);
	const file = req.file;
	if (!userId || !file) {
		return res.status(400).json({ success: false, message: '缺少用户ID或文件' });
	}
	
	const avatarUrl = `http://localhost:${port}/uploads/avatars/${file.filename}`;
	
	try {
		const db = readDB();
		const userIndex = db.users.findIndex(u => u.id === userId);
		if (userIndex > -1) {
			db.users[userIndex].avatar = avatarUrl;
			writeDB(db);
			res.json({ success: true, message: '头像上传成功', avatarUrl: avatarUrl });
		} else {
			res.status(404).json({ success: false, message: '用户不存在' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: '服务器内部错误', error: error.message });
	}
});

/**
 * @description 获取用户的成就列表
 * @route GET /api/achievements
 */
app.get('/api/achievements', (req, res) => {
	const userId = req.query.userId ? parseInt(req.query.userId, 10) : null;
	if (!userId) {
		return res.status(401).json({ success: false, message: '请提供用户ID' });
	}
	try {
		const db = readDB();
		const allBadges = db.badges || [];
		
		// 计算各项指标
		const userPosts = (db.posts || []).filter(p => p.userId === userId);
		const userOrders = (db.orders || []).filter(o => o.userId === userId);
		const userProgress = (db.user_progress || []).filter(p => p.userId === userId);
		const totalLikes = userPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
		const totalComments = (db.posts || []).reduce((sum, post) => sum + (post.comments || []).filter(c => c.userId === userId).length, 0);
		const completedCourses = userProgress.filter(p => p.certificateAwarded).length;
		
		// 根据指标判断成就达成状态
		const achievements = allBadges.map(badge => {
			let isEarned = false;
			switch (badge.badgeId) {
				case 1: isEarned = userPosts.length > 0; break; 
				case 2: isEarned = completedCourses > 0; break; 
				case 3: isEarned = userOrders.length > 0; break; 
				case 4: isEarned = totalComments >= 5; break; 
				case 5: isEarned = totalLikes >= 10; break;  
				
			}
			return { ...badge, isEarned };
		});
		
		res.json({ success: true, achievements });
	} catch (error) {
		res.status(500).json({ success: false, message: '获取成就失败', error: error.message });
	}
});


// --- (三) 社区与帖子 API ---

/**
 * @description 获取帖子列表 (支持排序、分页、用户状态)
 * @route GET /api/posts
 */
app.get('/api/posts', (req, res) => {
	try {
		const db = readDB();
		const currentUserId = req.query.userId ? parseInt(req.query.userId, 10) : null;
		const sortBy = req.query.sortBy || 'latest';
		const page = req.query.page ? parseInt(req.query.page, 10) : 1;
		const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;

		// 附加当前用户的点赞和收藏状态
		let allPosts = (db.posts || []).map(post => ({
			...post,
			isLiked: currentUserId ? (post.likedBy || []).includes(currentUserId) : false,
			isCollected: currentUserId ? (post.collectedBy || []).includes(currentUserId) : false
		}));
		
		// 排序
		if (sortBy === 'popular') {
			allPosts.sort((a, b) => {
				const scoreA = (a.likes || 0) * 1 + (a.collectionCount || 0) * 2 + (a.comments || []).length * 3;
				const scoreB = (b.likes || 0) * 1 + (b.collectionCount || 0) * 2 + (b.comments || []).length * 3;
				return scoreB - scoreA;
			});
		} else {
			allPosts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); // 按时间倒序
		}
		
		// 分页
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const paginatedPosts = allPosts.slice(startIndex, endIndex);
		const hasMore = endIndex < allPosts.length;
		
		res.json({ success: true, posts: paginatedPosts, hasMore: hasMore });
	} catch (error) {
		res.status(500).json({ success: false, message: '读取作品时出错', error: error.message });
	}
});

/**
 * @description 发布新帖子
 * @route POST /api/posts
 */
app.post('/api/posts', upload.single('image'), (req, res) => {
	const { userId, title, description, artCategory } = req.body;
	const file = req.file;
	if (!userId || !title || !file) {
		return res.status(400).json({ success: false, message: '用户ID、标题和图片为必填项' });
	}
	try {
		const db = readDB();
		const user = db.users.find(u => u.id == userId);
		if (!user) {
			return res.status(404).json({ success: false, message: '发布用户不存在' });
		}
		
		const newPost = {
			id: (db.posts.length > 0 ? Math.max(...db.posts.map(p => p.id)) : 0) + 1,
			userId: parseInt(userId),
			userNickname: user.nickname,
			userAvatar: user.avatar,
			title,
			description: description || '',
			imageUrl: `http://localhost:${port}/uploads/posts/${file.filename}`,
			artCategory: artCategory || '其他',
			createdAt: Date.now(),
			likes: 0,
			likedBy: [],
			collectionCount: 0,
			collectedBy: [],
			comments: []
		};
		db.posts.unshift(newPost); // 新帖子放在最前面
		writeDB(db);
		
		res.status(201).json({ success: true, message: '发布成功', post: newPost });
	} catch (error) {
		res.status(500).json({ success: false, message: '服务器内部错误', error: error.message });
	}
});

/**
 * @description 点赞或取消点赞帖子
 * @route POST /api/posts/:id/like
 */
app.post('/api/posts/:id/like', (req, res) => {
	const postId = parseInt(req.params.id);
	const { userId } = req.body;
	if (!userId) {
		return res.status(401).json({ success: false, message: '请先登录' });
	}
	try {
		const db = readDB();
		const postIndex = db.posts.findIndex(p => p.id === postId);
		if (postIndex === -1) {
			return res.status(404).json({ success: false, message: '帖子不存在' });
		}
		
		const post = db.posts[postIndex];
		if (!post.likedBy) post.likedBy = [];
		
		const userLikeIndex = post.likedBy.indexOf(userId);
		if (userLikeIndex > -1) {
			post.likedBy.splice(userLikeIndex, 1); // 取消点赞
		} else {
			post.likedBy.push(userId); // 点赞
		}
		post.likes = post.likedBy.length;
		
		writeDB(db);
		res.json({ success: true, likes: post.likes, isLiked: userLikeIndex === -1 });
	} catch (error) {
		res.status(500).json({ success: false, message: '服务器内部错误', error: error.message });
	}
});

/**
 * @description 收藏或取消收藏帖子
 * @route POST /api/posts/:id/collect
 */
app.post('/api/posts/:id/collect', (req, res) => {
	const postId = parseInt(req.params.id);
	const { userId } = req.body;
	if (!userId) {
		return res.status(401).json({ success: false, message: '请先登录' });
	}
	try {
		const db = readDB();
		const postIndex = db.posts.findIndex(p => p.id === postId);
		if (postIndex === -1) {
			return res.status(404).json({ success: false, message: '帖子不存在' });
		}
		
		const post = db.posts[postIndex];
		if (!post.collectedBy) post.collectedBy = [];
		
		const userCollectIndex = post.collectedBy.indexOf(userId);
		if (userCollectIndex > -1) {
			post.collectedBy.splice(userCollectIndex, 1); // 取消收藏
		} else {
			post.collectedBy.push(userId); // 收藏
		}
		post.collectionCount = post.collectedBy.length;
		
		writeDB(db);
		res.json({ success: true, collectionCount: post.collectionCount, isCollected: userCollectIndex === -1 });
	} catch (error) {
		res.status(500).json({ success: false, message: '服务器内部错误', error: error.message });
	}
});

/**
 * @description 获取用户收藏的帖子列表
 * @route GET /api/collections
 */
app.get('/api/collections', (req, res) => {
	const userId = req.query.userId ? parseInt(req.query.userId, 10) : null;
	if (!userId) {
		return res.status(401).json({ success: false, message: '请提供用户ID' });
	}
	try {
		const db = readDB();
		const collectedPosts = (db.posts || [])
			.filter(p => (p.collectedBy || []).includes(userId))
			.map(p => ({
				...p,
				isLiked: (p.likedBy || []).includes(userId),
				isCollected: true,
			}))
			.sort((a, b) => b.createdAt - a.createdAt);
			
		res.json({ success: true, posts: collectedPosts });
	} catch (error) {
		res.status(500).json({ success: false, message: '获取收藏列表失败', error: error.message });
	}
});

/**
 * @description 发表评论
 * @route POST /api/posts/:id/comments
 */
app.post('/api/posts/:id/comments', (req, res) => {
	const postId = parseInt(req.params.id);
	const { userId, content } = req.body;
	if (!userId || !content) {
		return res.status(400).json({ success: false, message: '用户ID和评论内容不能为空' });
	}
	try {
		const db = readDB();
		const postIndex = db.posts.findIndex(p => p.id === postId);
		if (postIndex === -1) {
			return res.status(404).json({ success: false, message: '帖子不存在' });
		}
		
		const user = db.users.find(u => u.id === userId);
		if (!user) {
			return res.status(404).json({ success: false, message: '用户不存在' });
		}
		
		const post = db.posts[postIndex];
		if (!post.comments) post.comments = [];
		
		const newComment = {
			commentId: (post.comments.length > 0 ? Math.max(...post.comments.map(c => c.commentId)) : 0) + 1,
			userId: userId,
			userNickname: user.nickname,
			userAvatar: user.avatar,
			content: content,
			createdAt: Date.now()
		};
		post.comments.unshift(newComment); // 新评论放在最前面
		
		writeDB(db);
		res.status(201).json({ success: true, message: '评论成功', comment: newComment });
	} catch (error) {
		res.status(500).json({ success: false, message: '服务器内部错误', error: error.message });
	}
});

/**
 * @description 删除帖子
 * @route DELETE /api/posts/:id
 */
app.delete('/api/posts/:id', (req, res) => {
	const postId = parseInt(req.params.id);
	const userId = req.query.userId ? parseInt(req.query.userId, 10) : null;
	if (!userId) {
		return res.status(401).json({ success: false, message: '请先登录或提供用户ID' });
	}
	try {
		const db = readDB();
		const postIndex = db.posts.findIndex(p => p.id === postId);
		if (postIndex === -1) {
			return res.status(404).json({ success: false, message: '帖子不存在' });
		}
		
		const post = db.posts[postIndex];
		if (post.userId !== userId) {
			return res.status(403).json({ success: false, message: '你没有权限删除此作品' });
		}
		
		// 从数据库中删除帖子记录
		db.posts.splice(postIndex, 1);
		writeDB(db);
		
		// 尝试从服务器文件系统中删除对应的图片文件
		try {
			const filename = path.basename(new URL(post.imageUrl).pathname);
			const filePath = path.join(__dirname, 'uploads', 'posts', filename);
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}
		} catch (fileError) {
			console.error('删除帖子图片文件失败 (可忽略):', fileError);
		}
		
		res.json({ success: true, message: '作品删除成功' });
	} catch (error) {
		res.status(500).json({ success: false, message: '服务器内部错误', error: error.message });
	}
});


// --- (四) 课程与学习 API ---

/**
 * @description 获取所有课程列表
 * @route GET /api/courses
 */
app.get('/api/courses', (req, res) => {
	try {
		const db = readDB();
		res.json({ success: true, courses: db.courses || [] });
	} catch (error) {
		res.status(500).json({ success: false, message: '读取课程数据时出错', error: error.message });
	}
});

/**
 * @description 获取单个课程详情
 * @route GET /api/courses/:id
 */
app.get('/api/courses/:id', (req, res) => {
	try {
		const db = readDB();
		const courseId = parseInt(req.params.id);
		const course = (db.courses || []).find(c => c.id === courseId);
		if (course) {
			res.json({ success: true, course });
		} else {
			res.status(404).json({ success: false, message: '课程未找到' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: '读取课程数据时出错', error: error.message });
	}
});

/**
 * @description 获取用户对特定课程的学习进度
 * @route GET /api/progress
 */
app.get('/api/progress', (req, res) => {
	const userId = req.query.userId ? parseInt(req.query.userId) : null;
	const courseId = req.query.courseId ? parseInt(req.query.courseId) : null;
	if (!userId || !courseId) {
		return res.status(400).json({ success: false, message: '用户ID和课程ID不能为空' });
	}
	try {
		const db = readDB();
		let progress = (db.user_progress || []).find(p => p.userId === userId && p.courseId === courseId);
		if (!progress) {
			// 返回一个初始化的空进度对象
			progress = { userId, courseId, completedChapters: [] };
		}
		res.json({ success: true, progress });
	} catch (error) {
		res.status(500).json({ success: false, message: '读取进度数据时出错', error: error.message });
	}
});

/**
 * @description 更新用户课程进度 (标记完成某一章节)
 * @route POST /api/progress
 */
app.post('/api/progress', (req, res) => {
	const { userId, courseId, chapterId } = req.body;
	if (!userId || !courseId || !chapterId) {
		return res.status(400).json({ success: false, message: '用户ID、课程ID和章节ID不能为空' });
	}
	try {
		const db = readDB();
		if (!db.user_progress) db.user_progress = [];
		
		const course = (db.courses || []).find(c => c.id === courseId);
		if (!course) {
			return res.status(404).json({ success: false, message: '课程不存在' });
		}
		
		let progress = db.user_progress.find(p => p.userId === userId && p.courseId === courseId);
		if (progress) {
			// 如果已有进度，更新已完成章节列表 (使用 Set 去重)
			progress.completedChapters = [...new Set([...progress.completedChapters, chapterId])];
		} else {
			// 如果没有进度，创建新记录
			progress = {
				id: (db.user_progress.length > 0 ? Math.max(...db.user_progress.map(p => p.id)) : 0) + 1,
				userId,
				courseId,
				completedChapters: [chapterId]
			};
			db.user_progress.push(progress);
		}
		
		// 检查是否所有章节都已完成，以颁发证书
		let justCompleted = false;
		if (progress.completedChapters.length === course.outline.length && !progress.certificateAwarded) {
			progress.certificateAwarded = true;
			progress.awardDate = new Date().toISOString();
			justCompleted = true; // 标记为刚刚完成
		}
		
		writeDB(db);
		res.json({ success: true, message: '进度更新成功', progress, justCompleted });
	} catch (error) {
		res.status(500).json({ success: false, message: '更新进度时出错', error: error.message });
	}
});

/**
 * @description 获取用户获得的所有证书
 * @route GET /api/certificates
 */
app.get('/api/certificates', (req, res) => {
	const userId = req.query.userId ? parseInt(req.query.userId, 10) : null;
	if (!userId) {
		return res.status(401).json({ success: false, message: '请提供用户ID' });
	}
	try {
		const db = readDB();
		const certificates = (db.user_progress || [])
			.filter(p => p.userId === userId && p.certificateAwarded)
			.map(progress => {
				const courseInfo = (db.courses || []).find(c => c.id === progress.courseId);
				return courseInfo ? {
					courseId: courseInfo.id,
					title: courseInfo.title,
					instructor: courseInfo.instructor,
					coverImage: courseInfo.coverImage,
					awardDate: progress.awardDate,
				} : null;
			})
			.filter(Boolean); // 过滤掉找不到课程信息的无效证书
			
		res.json({ success: true, certificates });
	} catch (error) {
		res.status(500).json({ success: false, message: '获取证书列表失败', error: error.message });
	}
});


// --- (五) 商城、购物车与订单 API ---

/**
 * @description 获取所有商品列表
 * @route GET /api/products
 */
app.get('/api/products', (req, res) => {
	try {
		const db = readDB();
		res.json({ success: true, products: db.products || [] });
	} catch (error) {
		res.status(500).json({ success: false, message: '读取商品数据时出错', error: error.message });
	}
});

/**
 * @description 获取单个商品详情
 * @route GET /api/products/:id
 */
app.get('/api/products/:id', (req, res) => {
	try {
		const db = readDB();
		const productId = parseInt(req.params.id);
		const product = (db.products || []).find(p => p.id === productId);
		if (product) {
			res.json({ success: true, product });
		} else {
			res.status(404).json({ success: false, message: '商品未找到' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: '读取商品数据时出错', error: error.message });
	}
});

/**
 * @description 获取用户的购物车内容
 * @route GET /api/cart
 */
app.get('/api/cart', (req, res) => {
    const userId = req.query.userId ? parseInt(req.query.userId, 10) : null;
    if (!userId) {
		return res.status(401).json({ success: false, message: '请提供用户ID' });
	}
    try {
        const db = readDB();
        let userCart = (db.carts || []).find(c => c.userId === userId);
        if (!userCart) {
            userCart = { userId, items: [] }; 
        }
		
        userCart.items = userCart.items.map(item => {
            const product = (db.products || []).find(p => p.id === parseInt(item.productId));
            return { ...item, productDetails: product || null }; 
        }).filter(item => item.productDetails); 
		
        res.json({ success: true, cart: userCart });
    } catch (error) {
        res.status(500).json({ success: false, message: '获取购物车失败', error: error.message });
    }
});

/**
 * @description 添加商品到购物车
 * @route POST /api/cart/add
 */
app.post('/api/cart/add', (req, res) => {
	const { userId, productId, quantity } = req.body;
	if (!userId || !productId || !quantity) {
		return res.status(400).json({ success: false, message: '缺少必要参数' });
	}
	
	const numProductId = parseInt(productId, 10);

	try {
		const db = readDB();
		if (!db.carts) db.carts = [];
		
		let cartIndex = db.carts.findIndex(c => c.userId === userId);
		if (cartIndex === -1) {
			db.carts.push({ userId, items: [] });
			cartIndex = db.carts.length - 1;
		}
		
		const cart = db.carts[cartIndex];
		const itemIndex = cart.items.findIndex(item => item.productId === numProductId);

		if (itemIndex > -1) {
			// 如果商品已存在
			cart.items[itemIndex].quantity += quantity;
		} else {
			// 如果商品不存在
			cart.items.push({ productId: numProductId, quantity });
		}
		
		writeDB(db);
		res.json({ success: true, message: '已加入购物车' });
	} catch (error) {
		res.status(500).json({ success: false, message: '添加购物车失败', error: error.message });
	}
});

/**
 * @description 更新购物车中商品的数量
 * @route POST /api/cart/update
 */
app.post('/api/cart/update', (req, res) => {
	const { userId, productId, quantity } = req.body;
	if (!userId || !productId || quantity === undefined) {
		return res.status(400).json({ success: false, message: '缺少必要参数' });
	}
	try {
		const db = readDB();
		const cart = (db.carts || []).find(c => c.userId === userId);
		if (!cart) {
			return res.status(404).json({ success: false, message: '购物车未找到' });
		}
		
		const itemIndex = cart.items.findIndex(item => item.productId === productId);
		if (itemIndex > -1) {
			if (quantity > 0) {
				cart.items[itemIndex].quantity = quantity; // 更新数量
			} else {
				cart.items.splice(itemIndex, 1); // 如果数量为0，则移除
			}
		}
		
		writeDB(db);
		res.json({ success: true, message: '购物车已更新' });
	} catch (error) {
		res.status(500).json({ success: false, message: '更新购物车失败', error: error.message });
	}
});

/**
 * @description 从购物车移除商品
 * @route POST /api/cart/remove
 */
app.post('/api/cart/remove', (req, res) => {
	const { userId, productId } = req.body;
	if (!userId || !productId) {
		return res.status(400).json({ success: false, message: '缺少必要参数' });
	}
	try {
		const db = readDB();
		const cart = (db.carts || []).find(c => c.userId === userId);
		if (!cart) {
			return res.status(404).json({ success: false, message: '购物车未找到' });
		}
		
		const initialLength = cart.items.length;
		cart.items = cart.items.filter(item => item.productId !== productId);
		
		if (cart.items.length < initialLength) {
			writeDB(db);
			res.json({ success: true, message: '商品已移除' });
		} else {
			res.status(404).json({ success: false, message: '商品未在购物车中' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: '移除商品失败', error: error.message });
	}
});

/**
 * @description 创建新订单
 * @route POST /api/orders
 */
app.post('/api/orders', (req, res) => {
	const { userId, items, totalPrice, shippingAddress } = req.body;
	if (!userId || !items || items.length === 0 || totalPrice === undefined || !shippingAddress) {
		return res.status(400).json({ success: false, message: '缺少必要的订单信息' });
	}
	try {
		const db = readDB();
		if (!db.orders) db.orders = [];
		
		const newOrder = {
			orderId: 'HY' + Date.now() + Math.floor(Math.random() * 1000),
			userId: parseInt(userId),
			items,
			totalPrice: parseFloat(totalPrice),
			shippingAddress: shippingAddress,
			status: '待付款',
			createdAt: new Date().toISOString()
		};
		db.orders.unshift(newOrder); // 新订单放最前
		
		// 清空购物车
		const cartIndex = (db.carts || []).findIndex(c => c.userId === parseInt(userId));
		if (cartIndex > -1) {
			db.carts[cartIndex].items = [];
		}
		
		writeDB(db);
		res.status(201).json({ success: true, message: '下单成功', order: newOrder });
	} catch (error) {
		res.status(500).json({ success: false, message: '创建订单失败', error: error.message });
	}
});

/**
 * @description 获取用户的订单列表
 * @route GET /api/orders
 */
app.get('/api/orders', (req, res) => {
	const userId = req.query.userId ? parseInt(req.query.userId, 10) : null;
	if (!userId) {
		return res.status(401).json({ success: false, message: '请提供用户ID' });
	}
	try {
		const db = readDB();
		const userOrders = (db.orders || [])
			.filter(o => o.userId === userId)
			.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 按时间倒序
			
		res.json({ success: true, orders: userOrders });
	} catch (error) {
		res.status(500).json({ success: false, message: '获取订单列表失败', error: error.message });
	}
});

/**
 * @description 获取单个订单详情
 * @route GET /api/orders/:id
 */
app.get('/api/orders/:id', (req, res) => {
    const orderId = req.params.id;
    try {
        const db = readDB();
        const order = (db.orders || []).find(o => o.orderId === orderId);
        if (order) {
            res.json({ success: true, order });
        } else {
            res.status(404).json({ success: false, message: '订单未找到' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: '获取订单详情失败', error: error.message });
    }
});

/**
 * @description 更新订单状态 (如: 支付、发货)
 * @route PUT /api/orders/:id/status
 */
app.put('/api/orders/:id/status', (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ success: false, message: '缺少状态参数' });
    }
    try {
        const db = readDB();
        const orderIndex = (db.orders || []).findIndex(o => o.orderId === orderId);
        if (orderIndex > -1) {
            db.orders[orderIndex].status = status;
            writeDB(db);
            res.json({ success: true, message: '订单状态更新成功' });
        } else {
            res.status(404).json({ success: false, message: '订单未找到' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: '更新订单状态失败', error: error.message });
    }
});

/**
 * @description 删除订单
 * @route DELETE /api/orders/:id
 */
app.delete('/api/orders/:id', (req, res) => {
    const orderId = req.params.id;
    try {
        const db = readDB();
        const initialLength = db.orders.length;
        db.orders = (db.orders || []).filter(o => o.orderId !== orderId);
		
        if (db.orders.length < initialLength) {
            writeDB(db);
            res.json({ success: true, message: '订单删除成功' });
        } else {
            res.status(404).json({ success: false, message: '要删除的订单不存在' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: '删除订单失败', error: error.message });
    }
});


// --- (六) 地址管理 API ---

/**
 * @description 获取用户的地址列表
 * @route GET /api/addresses
 */
app.get('/api/addresses', (req, res) => {
	const userId = req.query.userId ? parseInt(req.query.userId, 10) : null;
	if (!userId) {
		return res.status(401).json({ success: false, message: '请提供用户ID' });
	}
	try {
		const db = readDB();
		const user = (db.users || []).find(u => u.id === userId);
		if (!user) {
			return res.status(404).json({ success: false, message: '用户不存在' });
		}
		res.json({ success: true, addresses: user.addresses || [] });
	} catch (error) {
		res.status(500).json({ success: false, message: '获取地址列表失败', error: error.message });
	}
});

/**
 * @description 添加新地址
 * @route POST /api/addresses
 */
app.post('/api/addresses', (req, res) => {
	const { userId, name, phone, region, detail, isDefault } = req.body;
	if (!userId || !name || !phone || !region || !detail) {
		return res.status(400).json({ success: false, message: '缺少必要参数' });
	}
	try {
		const db = readDB();
		const userIndex = (db.users || []).findIndex(u => u.id === userId);
		if (userIndex === -1) {
			return res.status(404).json({ success: false, message: '用户不存在' });
		}
		
		if (!db.users[userIndex].addresses) db.users[userIndex].addresses = [];
		const addresses = db.users[userIndex].addresses;
		
		const newAddress = {
			id: (addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) : 0) + 1,
			name, phone, region, detail,
			isDefault: !!isDefault
		};
		
		// 如果新地址是默认地址，则将其他地址设为非默认
		if (newAddress.isDefault) {
			addresses.forEach(addr => addr.isDefault = false);
		}
		addresses.push(newAddress);
		
		writeDB(db);
		res.status(201).json({ success: true, message: '地址添加成功', address: newAddress });
	} catch (error) {
		res.status(500).json({ success: false, message: '添加地址失败', error: error.message });
	}
});

/**
 * @description 更新指定地址
 * @route PUT /api/addresses/:id
 */
app.put('/api/addresses/:id', (req, res) => {
	const addressId = parseInt(req.params.id);
	const { userId, name, phone, region, detail, isDefault } = req.body;
	if (!userId || !name || !phone || !region || !detail) {
		return res.status(400).json({ success: false, message: '缺少必要参数' });
	}
	try {
		const db = readDB();
		const userIndex = db.users.findIndex(u => u.id === userId);
		if (userIndex === -1) {
			return res.status(404).json({ success: false, message: '用户不存在' });
		}
		
		const addresses = db.users[userIndex].addresses || [];
		const addressIndex = addresses.findIndex(a => a.id === addressId);
		if (addressIndex === -1) {
			return res.status(404).json({ success: false, message: '地址不存在' });
		}
		
		// 如果要更新为默认地址，则将其他地址设为非默认
		if (!!isDefault) {
			addresses.forEach(addr => addr.isDefault = false);
		}
		
		db.users[userIndex].addresses[addressIndex] = { ...addresses[addressIndex], name, phone, region, detail, isDefault: !!isDefault };
		writeDB(db);
		
		res.json({ success: true, message: '地址更新成功' });
	} catch (error) {
		res.status(500).json({ success: false, message: '更新地址失败', error: error.message });
	}
});

/**
 * @description 删除指定地址
 * @route DELETE /api/addresses/:id
 */
app.delete('/api/addresses/:id', (req, res) => {
	const addressId = parseInt(req.params.id);
	const { userId } = req.body;
	if (!userId) {
		return res.status(400).json({ success: false, message: '缺少用户ID' });
	}
	try {
		const db = readDB();
		const userIndex = db.users.findIndex(u => u.id === userId);
		if (userIndex === -1) {
			return res.status(404).json({ success: false, message: '用户不存在' });
		}
		
		const initialLength = db.users[userIndex].addresses.length;
		db.users[userIndex].addresses = (db.users[userIndex].addresses || []).filter(a => a.id !== addressId);
		
		if (db.users[userIndex].addresses.length < initialLength) {
			writeDB(db);
			res.json({ success: true, message: '地址删除成功' });
		} else {
			res.status(404).json({ success: false, message: '要删除的地址不存在' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: '删除地址失败', error: error.message });
	}
});

/**
 * @description 将指定地址设为默认
 * @route POST /api/addresses/:id/default
 */
app.post('/api/addresses/:id/default', (req, res) => {
	const addressId = parseInt(req.params.id);
	const { userId } = req.body;
	if (!userId) {
		return res.status(400).json({ success: false, message: '缺少用户ID' });
	}
	try {
		const db = readDB();
		const userIndex = db.users.findIndex(u => u.id === userId);
		if (userIndex === -1) {
			return res.status(404).json({ success: false, message: '用户不存在' });
		}
		
		const addresses = db.users[userIndex].addresses || [];
		const targetAddress = addresses.find(a => a.id === addressId);
		if (!targetAddress) {
			return res.status(404).json({ success: false, message: '地址不存在' });
		}
		
		// 先将所有地址设为非默认，再将目标地址设为默认
		addresses.forEach(addr => addr.isDefault = false);
		targetAddress.isDefault = true;
		
		writeDB(db);
		res.json({ success: true, message: '默认地址设置成功' });
	} catch (error) {
		res.status(500).json({ success: false, message: '设置默认地址失败', error: error.message });
	}
});


// --- (七) 外部服务代理 API ---

/**
 * @description 代理腾讯地图逆地址解析API (经纬度->地址)
 * @route GET /api/maps/reverse-geocode
 */
app.get('/api/maps/reverse-geocode', (req, res) => {
    const { lat, lng } = req.query;
    const key = 'LQUBZ-SJOYJ-GD3F2-DQOCF-PSRFK-3TBV3';
    
    if (!lat || !lng) {
        return res.status(400).json({ success: false, message: '缺少经纬度参数' });
    }
    
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${key}&get_poi=0`;

    https.get(url, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => { data += chunk; });
        apiRes.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                res.send(parsedData); // 直接将腾讯地图的返回结果转发给前端
            } catch (e) {
                res.status(500).json({ success: false, message: '解析腾讯地图返回数据失败', raw: data });
            }
        });
    }).on('error', (err) => {
        res.status(500).json({ success: false, message: '请求腾讯地图API失败', error: err.message });
    });
});


// =================================================================
// --- 服务器启动 ---
// =================================================================
app.listen(port, () => {
	console.log(`✅ 绘影后端服务已启动，正在监听 http://localhost:${port}`);
});
