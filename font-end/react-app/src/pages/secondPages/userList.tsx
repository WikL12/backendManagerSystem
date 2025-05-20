import { useEffect, useState } from "react"
import { Table, Space, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { getUserList } from "../../api/system.api"

interface UserData {
    userName: string;
    password: string;
    create_time: string;
    id: number;
}

export default function UserList() {
    const [tableData, setTableData] = useState<UserData[]>([]);
    
    const columns: ColumnsType<UserData> = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            align: 'center' as const,
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            align: 'center' as const,
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center' as const,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center' as const,
        },
        {
            title: '操作',
            key: 'action',
            align: 'center' as const,
            render: (_: unknown, record: UserData) => (
                <Space size="middle">
                    <a>修改</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await getUserList();
                if (result.code === 200) {
                    setTableData(result.data);
                } else {
                    console.error('Failed to fetch users:', result.message);
                }
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };
        fetchUsers();
    }, []);


    return (
        <div>
            <Table<UserData> bordered dataSource={tableData} columns={columns} />
        </div>
    );
}