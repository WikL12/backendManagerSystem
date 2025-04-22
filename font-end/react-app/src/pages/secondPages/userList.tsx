import { useEffect ,useState} from "react"
import { Table ,Space, Tag} from "antd";
import {getUserList} from "../../api/system.api"
export default function UserList(){
    const [tableData, setTableData] = useState<any[]>([]);
    const columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            align: 'center',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => (
              <Space size="middle">
                <a>修改</a>
              </Space>
            ),
          },
    ];
    useEffect(() => {
        const fetchUsers = async () => {
            // get user list
           try{
            const result = await getUserList();
            if (result.code === 200) {
                setTableData(result.data);
            } else {
                console.error('Failed to fetch users:', result.message);
            }
           }catch(err){
            console.log('Failed to fetch users:', err);
           }
        };
        fetchUsers();
    }, [null]);
    return(
        <div>
            <Table bordered dataSource={tableData} columns={columns} />
        </div>
    )
}