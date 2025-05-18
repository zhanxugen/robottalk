

//先把所有的接口给调试成功先

//因为涉及到登录后的令牌问题，我们需要封装一下get和post方法

var methods = (function () {
    BASE_URL = 'https://study.duyiedu.com';
    TOKEN_CONST = 'token'


    async function get(url) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_CONST);
        if (token) {
            headers.authorization = 'Bearer ' + token;
        }
        return await fetch(BASE_URL + url, {
            method: 'GET',
            headers,
        });
    }


    async function post(url, postObj) {
        const headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem(TOKEN_CONST);

        if (token) {
            headers.authorization = 'Bearer ' + token;
        }
        return await fetch(BASE_URL + url, {
            method: 'POST',
            headers,
            body: JSON.stringify(postObj),
        });
    }



    //发送注册信息
    async function sendRegister(regObj) {
        const resp = await post('/api/user/reg', regObj);
        return await resp.json();
    }


    //发送登录信息
    async function sendLogin(loginObj) {
        const resp = await post('/api/user/login', loginObj);
        const data = await resp.json();
        // console.log(data);
        if (data.code === 0) {
            localStorage.setItem(TOKEN_CONST, resp.headers.get('authorization'));
        }
        return data;
    }

    //验证账号
    async function sendExists(loginId) {
        const resp = await get('/api/user/exists' + `?loginId=${loginId}`);
        return await resp.json();
    }

    //当前登录的用户信息
    async function sendProfile() {
        return await get('/api/user/profile').then(resp => resp.json());
    }

    //发送聊天消息
    async function sendChat(contentObj) {
        const resp = await post('/api/chat', contentObj);
        return await resp.json();
    }

    //获取聊天记录
    async function sendChatHistory() {
        const resp = await get('/api/chat/history');
        return await resp.json();
    }

    //删除登录的效果
    function clearLogin() {
        localStorage.removeItem(TOKEN_CONST);
    }

    return {
        sendRegister,
        sendLogin,
        sendExists,
        sendProfile,
        sendChat,
        sendChatHistory,
        clearLogin
    }

})()

