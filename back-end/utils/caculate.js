const data = ['陈婷满意度100+自评99+互评100+学校测评100',
    '李海佳满意度100+自评98+互评100+学校测评100',
    '龚良娇满意度100+自评97+互评100+学校测评100',
    '舒颖满意度100+自评89+互评100+学校测评100',
    '雷莜满意度100+自评88.5+互评100+学校测评100',
    '徐艳满意度100+自评88+互评100+学校测评100',
    '邓童星满意度100+自评87+互评100+学校测评100',
    '孔书颜满意度100+自评86.5+互评100+学校测评100',
    '郭春燕满意度100+自评86+互评100+学校测评100',
    '鲁艺琴满意度100+自评85.5+互评100+学校测评100',
    '刘潘满意度100+自评85+互评100+学校测评100',
    '刘攀满意度100+自评84+互评100+学校测评100',];
    
    const newData= [];
     data.forEach(item=>{
        const newItems = [];
        item.split('+').forEach(n=>{
            // 去除中文和空格
            newItems.push(n.replace(/[\u4e00-\u9fa5]/g, '').replace(/\s+/g, ''));
        });
        console.log(newItems);
        newData.push(newItems)
    });
    console.log(newData);

    let finalData = [];
    newData.forEach(item=>{
        let caculate = item[0]*0.4 + item[1]*0.15 + item[2]*0.15 + item[3]*0.3;
        finalData.push(caculate)
    });
    console.log(finalData);