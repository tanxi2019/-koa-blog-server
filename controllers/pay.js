const {alipaySdk,AlipayFormData} = require('../utils/alipay');


class Pay {
    // 支付宝
    static alipay = async (ctx) => {
        const formData = new AlipayFormData();
        formData.setMethod('get');
        formData.addField('returnUrl','http://cssjs.club');// 回调地址
        formData.addField('bizContent', {
            outTradeNo:Math.random(), // 订单号
            productCode:'FAST_INSTANT_TRADE_PAY', // 订单码
            totalAmount:'60000', // 金额
            subject:'小满的内裤', // 标题
            body:'轻仓大甩卖', // 内容
        });
        // 通过该接口主动查询订单状态
        const result = await alipaySdk.exec(
            'alipay.trade.page.pay',
            {},
            { formData: formData },
        );

        console.log(result);
        ctx.body = {
            url:result,
            code: 1000,
            msg: '成功'
        };
    };

}

module.exports = {
    Pay
};
