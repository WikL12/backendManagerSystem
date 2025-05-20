import { useState ,useEffect} from 'react';
import { Dropdown, Space, Modal, message } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import useSystemStore from '../../store/system.store';
import { useNavigate } from 'react-router';
import { logout } from '../../api/system.api';
export default function HeaderControls() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState('');
    const hideModal = () => {
        setOpen(false)
    }
    const { removeToken, removeUserNameStore, userName } = useSystemStore();
    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res.code == 200) {
                console.log(res);
                message.success('退出登录成功');
                removeToken();
                removeUserNameStore();
                setOpen(false);
                navigate('/login');
            } else {
                message.error(res.message);
                return Promise.reject(res.message);
            }
        } catch (error) {
            console.log(error);
        }

    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: '退出登录',
            icon: <LogoutOutlined />,
            onClick: () => {
                setOpen(true)
            }
        },
    ]
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/system/sse');
        eventSource.onopen = (event) => {
            console.log(event);
            console.log('连接成功');
        }
        eventSource.onmessage = (event) => {
            // const data = JSON.parse(event.data);
            console.log(event.data);
            setTime(event.data)
        }
        eventSource.onerror = (event) => {
            console.log(event);
            console.log('连接失败');
        }
    },[null])
    return (
        <div>
            <Dropdown menu={{ items }}>
                <Space>
                    <div className="text-white">欢迎您，{localStorage.getItem('userName')}</div>
                    <span className="text-white">现在时间是:{time}</span>
                    <DownOutlined className="text-white!" />
                </Space>
                
            </Dropdown>
            <Modal
                title={<><ExclamationCircleOutlined className='text-red-500!' /> 您正在选择退出登录</>}
                open={open}
                onOk={handleLogout}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
            >
                <p>您确定要退出登录吗？</p>

            </Modal>
        </div>
    )
}