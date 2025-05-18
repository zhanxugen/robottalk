//我们要根据每一个文本框去做验证，围绕的就是文本框，文本框数据，错误提示这三个内容
//那么我们就可以针对每一个文本框作为一个对象，给文本框设置属性和验证方法


function $(nodeStr) {
    return document.querySelector(nodeStr);
}

function $$(nodeStr) {
    return document.querySelectorAll(nodeStr);
}

function $$$(tagName) {
    return document.createElement(tagName);
}




class InputValidate {

    constructor(node, valdateFunction) {
        this.inputNode = node;
        this.errInfo = this.inputNode.nextElementSibling;
        this.valdateFunction = valdateFunction;
        this.inputNode.onblur = () => {
            this.validate();
        }
    }

    //验证目前输入框是否是合法的，合法返回true，不合法返回false
    async validate() {
        const validateStr = await this.valdateFunction(this.inputNode.value);
        if (validateStr) {
            this.errInfo.innerText = validateStr;
            return false
        } else {
            this.errInfo.innerText = '';
            return true;
        }
    }


    static async validate(...args) {
        const proArr = args.map(item => item.validate());
        const result = await Promise.all(proArr);
        return result.every(item => item)
    }

}









