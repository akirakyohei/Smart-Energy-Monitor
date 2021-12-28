const { DurationMeasurement, TAX } = require("../configs/meter.config");

exports.calMoneyPay = (unit, power) => {
    var energy = power * (DurationMeasurement / 3600000); //KWh

    var keys = Object.keys(unit);

    var i = 0;
    var result = [];
    var sum = 0;
    var tax = 0;
    var total = 0;
    while (power > 0) {
        var numberEnergy = Math.min(keys[i], power);
        power -= numberEnergy;
        sum += numberEnergy * unit[keys[i]]
        result.push({ level: numberEnergy, unit: unit[keys[i]], price: numberEnergy * unit[keys[i]] });
        i++;
    }
    tax = sum * TAX / 100;
    total = sum + tax;
    return result, power, sum, tax, total;
};