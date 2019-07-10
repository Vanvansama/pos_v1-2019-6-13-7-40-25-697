'use strict';

function printReceipt(inputs) {
  console.log(createReceipt(inputs));
  // console.log(createReceipt(inputs));
}

function isBarCodeValid(barcodes) {
  const database = loadAllItems();
  let flag = true;
  const barcodeList = database.map(data => data.barcode);
  barcodes.map((barcode) => barcode.slice(0, 10)).forEach(barcode => {
    if (barcodeList.indexOf(barcode) === -1) {
      flag = false;
    }
  });
  return flag;
}

function countBarcodeNumbers(barcodes) {
  return barcodes.reduce((object, barcode) => {
    const barcodeAndNumber = barcode.split('-');
    if (barcodeAndNumber.length > 1) {
      if (object[barcodeAndNumber[0]]) {
        object[barcodeAndNumber[0]] += parseFloat(barcodeAndNumber[1]);
      } else {
        object[barcodeAndNumber[0]] = parseFloat(barcodeAndNumber[1]);
      }
    } else {
      if (object[barcodeAndNumber[0]]) {
        object[barcodeAndNumber[0]]++;
      } else {
        object[barcodeAndNumber[0]] = 1;
      }
    }
    return object
  }, {});
}

function calculateTotalPrice(barcodeAndNumbers) {
  let price = 0;
  const database = loadAllItems();
  for (const barcode in barcodeAndNumbers) {
    if (barcodeAndNumbers.hasOwnProperty(barcode)) {
      const number = barcodeAndNumbers[barcode];
      database.forEach(data => {
        if (data.barcode === barcode) {
          price += data.price * number;
        }
      });
    }
  }
  return price;
}

function isPromotions(barcode) {
  const promotionsList = loadPromotions();
  let flag = false;
  promotionsList.forEach(promotion => {
    promotion.barcodes.forEach(promotionBarcode => {
      if (promotionBarcode === barcode) {
        flag = true;
      }
    })
  });
  return flag
}

function createReceipt(barcodes) {
  if (isBarCodeValid(barcodes)) {
    const database = loadAllItems();
    let Receipts = "***<没钱赚商店>收据***\n";
    const barcodeAndNumbers = countBarcodeNumbers(barcodes);
    const totalPrice = calculateTotalPrice(barcodeAndNumbers);
    let actuallyPrice = 0;
    for (const barcode in barcodeAndNumbers) {
      if (barcodeAndNumbers.hasOwnProperty(barcode)) {
        const number = barcodeAndNumbers[barcode];
        database.forEach(data => {
          if (data.barcode === barcode) {
            let count = 0;
            isPromotions(barcode) ? count = data.price * (number - parseInt(number / 3)) : count = data.price * number;
            actuallyPrice += count;
            Receipts += `名称：${data.name}，数量：${number}${data.unit}，单价：${data.price.toFixed(2)}(元)，小计：${count.toFixed(2)}(元)\n`;
          }
        });
      }
    }
    Receipts += `----------------------\n总计：${actuallyPrice.toFixed(2)}(元)\n节省：${(totalPrice - actuallyPrice).toFixed(2)}(元)\n**********************`;
    return Receipts;
  }
  return null;
}
