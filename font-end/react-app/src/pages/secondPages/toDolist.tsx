import { useState, useEffect } from "react";
import { Table, Input, DatePicker, Button, message ,Drawer,Radio} from "antd";
import useSystemStore from '../../store/system.store';
import { getTodoList, addTodoListApi, deleteTodoListApi, editTodoListApi } from '../../api/system.api'
import dayjs from 'dayjs';

export default function TodoList() {

  const { userName } = useSystemStore();
  const [TableData, setTableData] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [completionTime, setCompletionTime] = useState<string | string[]>('');
  const tableHeader = [
    {
      title: '待办事项标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: '待办事项内容',
      dataIndex: 'content',
      align: 'center',
      key: 'content',
    },
    {
      title: '待完成时间',
      dataIndex: 'completionTime',
      align: 'center',
      key: 'completionTime',
    },
    {
      title: '创建人',
      dataIndex: 'creater',
      align: 'center',
      key: 'creater',
    },
    {
      title: '是否已完成',
      dataIndex: 'isFinished',
      align: 'center',
      key: 'isFinished',
      render: (_, record: any) => {
        return record.isFinished ? '是' : '否'
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (_, record: any) => (
        <><Button onClick={() => handleDelete(record)} color="yellow">删除</Button>
          <Button onClick={() => handleEdit(record)} color="default">编辑</Button>
          <Button onClick={() => handleFinish(record)} color="primary">{record.isFinished ? '未完成' : '完成'}</Button>
        </>
      )
    },
  ];
  // 新增任务
  const addTodoList = () => {
    console.log(userName);
    if (title && content && completionTime) {
      addTodoListApi({
        title: title,
        content: content,
        completionTime: dayjs(completionTime).format('YYYY-MM-DD HH:mm:ss'),
        creater: localStorage.getItem('userName')!,
        isFinished: false
      }).then(res => {
        if (res.code === 200) {
          getTodoListData();
          setTitle('');
          setContent('');
          setCompletionTime('');
        }
      })

    } else {
      message.error('请填写完整信息');
    }
  }
// 获取数据
  const getTodoListData = async () => {
    const res = await getTodoList();
    if (res.code === 200) {
      setTableData(res.data);
    }
  }
  // 删除任务
  const handleDelete = (record: any) => {
    console.log(record.id);
    let { id } = record;
    deleteTodoListApi({ id: id }).then(res => {
      if (res.code === 200) {
        getTodoListData();
        message.success('删除成功');
      }
    })
  }
  // 修改任务状态
  const handleFinish = (record: any) => {
    let { id, isFinished } = record;
    editTodoListApi({ id: id, title: record.title, content: record.content, completionTime: record.completionTime, creater: record.creater, isFinished: !isFinished }).then(res => {
      if (res.code === 200) {
        getTodoListData();
        message.success('修改成功');
      }
    })
  }
  const [editItem, setEditItem] = useState<any>({});
  const [open, setOpen] = useState(false);
  const options = [
    { label: '已完成', value: true },
    { label: '未完成', value: false },
  ];
  const onClose = () => {
    setOpen(false);
  };
  // 编辑任务
  const handleEdit = (record: any) => {
    console.log(record);
      setEditItem(record);
      setOpen(true);
  }
  const comfirmEdit = ()=>{
    editTodoListApi(editItem).then(res => {
      if (res.code === 200) {
        getTodoListData();
        message.success('修改成功');
      }
    })
    setOpen(false);
  }
  useEffect(() => {
    getTodoListData();
  }, [null])

  return <>
    <div className="flex w-full h-30px items-center mb-2">
      <div className="flex justify-center items-center">
        <span style={{ width: '160px' }}>待办事项标题：</span>
        <Input style={{ marginRight: '20px' }} placeholder="" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="flex justify-center items-center">
        <span style={{ width: '160px' }}>待办事项内容：</span>
        <Input style={{ marginRight: '20px' }} placeholder="" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="flex justify-center items-center">
        <span style={{ width: '100px' }}>待完成时间:</span>
        <DatePicker
          placeholder="请选择日期时间"
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          value={completionTime} onChange={(date, dateString) => setCompletionTime(date)}
        />
      </div>
      <Button type="primary" style={{ marginLeft: '20px' }} onClick={addTodoList}>新增</Button>
    </div>
    <div>
      <Table dataSource={TableData} bordered columns={tableHeader} />
    </div>

    {/* 编辑 */}
    <Drawer
        title="编辑"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        <div>
        <div className="flex justify-center items-center">
        <span style={{ width: '160px' }}>待办事项标题：</span>
        <Input style={{ marginRight: '20px' }} placeholder="" value={editItem.title} onChange={(e) => setEditItem({...editItem,title: e.target.value })} />
      </div>
      <div className="flex justify-center items-center">
        <span style={{ width: '160px' }}>待办事项内容：</span>
        <Input style={{ marginRight: '20px' }} placeholder="" value={editItem.content} onChange={(e) => setEditItem({...editItem,content: e.target.value })} />
      </div>
      <div className="flex justify-center items-center">
        <span style={{ width: '100px' }}>待完成时间:</span>
        <DatePicker
          placeholder="请选择日期时间"
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          value={dayjs(editItem.completionTime)} onChange={(date, dateString) => setEditItem({...editItem,completionTime: date })}
        />
      </div>
      <div className="flex justify-center items-center">
        <span style={{ width: '100px' }}>是否完成:</span>
        <Radio.Group block options={options} value={Boolean(editItem.isFinished)} onChange={(e) => setEditItem({...editItem,isFinished: e.target.value })}  />
      </div>
      <Button type="primary" style={{ marginLeft: '20px' }} onClick={comfirmEdit}>保存</Button>
        </div>
      </Drawer>
  </>
}   