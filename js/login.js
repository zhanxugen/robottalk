const loginIDValidate = new InputValidate($('#txtLoginId'), async function (value) {
    if (!value) {
        return '请填写昵称';
    }
});

const loginPWDValidate = new InputValidate($('#txtLoginPwd'), async function (value) {
    if (!value) {
        return '请输入密码';
    }
});


const form = $('.user-form');

form.onsubmit = async function (e) {
    e.preventDefault();
    const result = await InputValidate.validate(loginIDValidate, loginPWDValidate);
    if (!result) {
        return;
    } else {
        const formdata = new FormData(form);
        const useObj = Object.fromEntries(formdata.entries());
        console.log(useObj);

        const resp = await methods.sendLogin(useObj)
        if (resp.code === 0) {
            alert('登录成功了');
            location.href = './index.html';
        } else {
            alert(`${resp.msg}`)
        }
    }
}
