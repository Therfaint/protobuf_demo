import axios from "axios";
import protobuf from 'protobufjs';
import protoRoot from '../proto/proto_es6';

const httpService = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 45000,
    headers: {
        'accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-protobuf'
    },
    responseType: 'arraybuffer'
});

// 请求体message
const helloReq = protoRoot.lookup('hellopackage.helloReq');
// 响应体的message
const helloRes = protoRoot.lookup('hellopackage.helloRes');

function isArrayBuffer(obj) {
    return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

function transformResponse(rawResponse) {
    // 判断response是否是arrayBuffer
    if (rawResponse == null || !isArrayBuffer(rawResponse)) {
        return rawResponse
    }
    try {
        const buf = protobuf.util.newBuffer(rawResponse);
        // decode响应体
        return helloRes.decode(buf)
    } catch (err) {
        return err
    }
}

// 可以将Message的类型通过参数传入 request作为通用逻辑
async function helloWorld(requestBody) {
    console.log(requestBody)
    const errMsg = helloReq.verify(requestBody);
    if (errMsg)
        throw Error(errMsg);
    // 将对象序列化成请求体实例 创建Message实例
    const req = helloReq.create(requestBody);
    try {
        const {data, status} = await httpService.post('/api', req, {
            transformRequest: (data) => {
                // 根据Message实例将JSON实例进行encode = Uinit8Array
                console.log(helloReq.encode(data).finish());
                return helloReq.encode(data).finish();
            },
            transformResponse,
        });
        if (status !== 200) {
            console.log(new Error('服务器异常'));
        }
        return data;
    } catch (e) {
        console.log(e)
    }
}

export default helloWorld;
