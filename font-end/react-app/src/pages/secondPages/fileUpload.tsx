import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { littleFileUpload, chunkFileUpload, chunkFileControl, fileDownload } from '../../api/system.api';
import { useEffect, useState } from 'react';
export default function FileUpload() {
    // useEffect(() => {
    //     const file = document.getElementById('file')!
    //     file.addEventListener('change', (event) => {
    //         const file = event.target.files[0] //获取文件信息
    //         let formData = new FormData();
    //         formData.append('file', file);
    //         console.log(formData);
    //         littleFileUpload(formData, {
    //         }).then(res => {
    //             console.log(res);
    //         })

    //     })
    // }, [])

    const fileChange = (file) => {
        console.log(file);
        let formData = new FormData();
        formData.append('fileName', file.fileList[0].name);
        formData.append('file', file.fileList[0].originFileObj);
        console.log(formData);
        littleFileUpload(formData, {
        }).then(res => {
            console.log(res);
        })
    }


    const bigFileChange = (files: any) => {
        console.log(files);
        const file = files.fileList[0].originFileObj;
        const chunks = chunksFun(file);
        const allFileRequest: Promise<any>[] = [];
        chunks.forEach((x, index) => {
            let formdata = new FormData();
            formdata.append('fileName', file.name);
            formdata.append('index', index.toString());
            formdata.append('file', x.chunk);
            allFileRequest.push(
                chunkFileUpload(formdata, {
                }).then(res => {
                    console.log(res);
                })
            )
        });
        Promise.all(allFileRequest).then(res => {
            console.log(res);
            chunkFileControl({ fileName: file.name },).then(res => {
                console.log(res);
            })
        })
    }
    const chunksFun = (file, size = 4 * 1024 * 1024) => {
        let chunks = [];
        let cur = 0;
        while (cur < file.size) {
            chunks.push({ chunk: file.slice(cur, cur + size), index: cur / size });
            cur += size;
        }
        return chunks;
    }

    const downloadFile = () => {
        fileDownload({ fileName: 'logo.jpg' })
    }

    return <>
        <div>
            文件上传
            <div style={{ marginLeft: '100px' }}>
                <Upload onChange={fileChange} name="fileLittle">
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                {/* <input type="file" id="file" /> */}
            </div>

            大文件上传
            <div style={{ marginLeft: '100px' }}>
                <Upload onChange={bigFileChange} {...{name:'fileBig'}}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div>

            文件下载
            <Button type='primary' onClick={downloadFile} style={{ marginLeft: '100px' }}>下载</Button>
        </div>
    </>
}