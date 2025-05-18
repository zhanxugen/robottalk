const regLoginIdValidate = new InputValidate($('#txtLoginId'), async function (value) {
    if (!value) {
        return '请填写账号';
    }
    const isExist = await methods.sendExists(value);
    if (isExist.data) {
        return '用户名重复';
    }
});


const regNicknameValidate = new InputValidate($('#txtNickname'), async function (value) {
    if (!value) {
        return '请填写昵称';
    }
});

const pwdNicknameValidate = new InputValidate($('#txtLoginPwd'), async function (value) {
    if (!value) {
        return '请填写密码';
    }
});

const pwdComfirmNicknameValidate = new InputValidate($('#txtLoginPwdConfirm'), async function (value) {
    if (!value) {
        return '请填写确认密码';
    }

    if (value !== pwdNicknameValidate.inputNode.value) {
        return '两次输入的密码不一致，请重新输入'
    }
});


const form = $('.user-form');



form.onsubmit = async function (e) {
    e.preventDefault();
    const result = await InputValidate.validate(regLoginIdValidate, regNicknameValidate, pwdNicknameValidate, pwdComfirmNicknameValidate);
    if (!result) {
        return;
    } else {
        const formdata = new FormData(form);
        const useObj = Object.fromEntries(formdata.entries());
        console.log(useObj);

        const resp = await methods.sendRegister(useObj);
        if (resp.code === 0) {
            alert('注册成功了');
            location.href = DEPLOY_URL + './login.html';
        } else {
            alert(`${resp.msg}`)
        }
    }
}
