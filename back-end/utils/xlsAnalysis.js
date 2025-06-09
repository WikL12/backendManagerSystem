import xlsx from 'node-xlsx';
import fs from 'fs';
let xlsxData = xlsx.parse('./xlsx/final.xlsx');
console.log(xlsxData[0].data);
// 获取表头
let header = xlsxData[0].data[0];
// 获取数据
let data = xlsxData[0].data.slice(1);
// 获取需要分类的表头
let sortHader = '居村委会';
// 根据分类数据所在下标获取所有分类的值,并去重
let index = header.indexOf(sortHader);
let allSortHeaderData = [];
data.forEach((item) => {
    allSortHeaderData.push(item[index]);
});
allSortHeaderData = [...new Set(allSortHeaderData)];
// 格局要分类的表头中数据个数生成多个xls文件并保存
allSortHeaderData.forEach((item) => {
    let sortData = [];
    data.forEach((dataItem) => {
        if (dataItem[index] === item) {
            sortData.push(dataItem);
        }
    });
    let buffer = xlsx.build([{ name: item, data: [header, ...sortData] }]);
    fs.writeFileSync(`./xlsx/${item}.xlsx`, buffer);
})
