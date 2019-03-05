class Calculate {

    constructor(calcData) {
        this.mc = 453000;
        this.calcData = calcData || {};
    }

    // Общая стоимость квартиры
    cost(floor, months, sq) {
        return this.costSqM(floor, months) * sq;
    }

    // Стоимость 1 кв.м в зависимости от этажа и периода рассрочки в месяцах
    costSqM(floor, months) {
        const _floor = floor || this.calcData.floor;
        return this.calcData.prices[_floor - 1] + (months ? this.calcData.priceChangePerMonth * months : 0);
    }

    // Сумма, которую необходимо выплатить после вычета первоначального взноса (ПВ. В ПВ может входить и мат. капитал)
    reminder(totalCost, fee, mcSwitch = false) {
        let _fee = typeof fee === 'number' ? fee : this.calcData.fee;
        return totalCost - (mcSwitch ? (_fee + this.mc) : _fee);
    }

    // Выплата в месяц
    pmPerMonth(totalCost, months, fee, mcSwitch) {
        return Math.round(this.reminder(totalCost, fee, mcSwitch) / months);
    }

}

export default Calculate;