const inArray = function(payer, points, array) {
    for(let i = 0; i < array.length; i++) {
        if (payer === array[i].payer) {
            array[i].points -= points;
            return true;
        } 
    }
}

module.exports = inArray;