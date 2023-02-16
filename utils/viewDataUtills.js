const { paymentMethods } = require('../constants');

exports.getPaymentMethodViewData = (selectedPaymentMethod) => {
    const payment = Object.keys(paymentMethods).map((key) => ({
        value: key,
        label: paymentMethods[key],
        isSelected: selectedPaymentMethod == key,
      }));

    return payment
}
