
function $(nodeStr) {
    return document.querySelector(nodeStr);
}

function $$(nodeStr) {
    return document.querySelectorAll(nodeStr);
}

function $$$(tagName) {
    return document.createElement(tagName);
}

//进入这个页面，就要去验证token是不是和服务器中的是对应起来的


(async function () {
    //获取当前的登录状态
    const resp = await methods.sendProfile();
    //如果没有登入，则直接返回，不做任何的操作
    const data = resp.data;
    if (!data) {
        alert('未登录，或登录已过期');
        return;
    }

    const doms = {
        aside: {
            nickname: $('.aside-name'),
            loginId: $('.aside-account'),
        },
        closeBtn: $('.close'),
        chatContainer: $('.chat-container'),
        form: $('.msg-container'),
        input: $('input'),
    }


    //登录成功的代码
    //叉掉按钮，取消登录
    doms.closeBtn.onclick = function () {
        methods.clearLogin();
        location.href = './login.html'
    }

    //侧边两个p元素
    doms.aside.nickname.innerText = data.nickname;
    doms.aside.loginId.innerText = data.loginId;

    //获取所有的历史记录
    async function getHistoryChat() {
        const resp = await methods.sendChatHistory();

        for (const element of resp.data) {
            addChat(element);
        }

        //每次返回到最后
        toBottom()

    }

    //发送聊天内容
    async function sendChatContent(chatContent) {

        addChat({
            from: data.loginId,
            to: null,
            content: chatContent,
            createdAt: new Date().getTime()
        });
        doms.input.value = '';
        toBottom();

        const resp = await methods.sendChat({ content: chatContent.trim() });
        addChat({
            from: null,
            to: data.loginId,
            ...resp.data
        })
        toBottom();
    }

    doms.form.onsubmit = function (e) {
        e.preventDefault();
        sendChatContent(doms.input.value);

    }



    function toBottom() {
        //超出了滚动的值，会被设置为最大值
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
    }


    function addChat(chatObj) {
        const div = $$$('div');
        div.classList.add('chat-item');
        if (chatObj.from) {
            div.classList.add('me');
        }

        const img = $$$('img');
        img.classList.add('chat-avatar');
        img.src = chatObj.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

        const contentDiv = $$$('div');
        contentDiv.classList.add('chat-content');
        contentDiv.innerText = chatObj.content;

        const dateDiv = $$$('div');
        dateDiv.classList.add('chat-date');
        dateDiv.innerText = dateFormat(chatObj.createdAt);

        doms.chatContainer.appendChild(div);
        div.appendChild(img);
        div.appendChild(contentDiv);
        div.appendChild(dateDiv);

    }

    function dateFormat(timeStr) {
        return new Date(timeStr).toLocaleString();
    }



    getHistoryChat()





})();