import fs from 'fs';

import { SECRETTEMP_FILE, SECRET_FILE, UPLOAD_DIR } from '../constant';

function handleSecretFile() {
  const isExist = fs.existsSync(SECRET_FILE);
  if (!isExist) {
    const secretTemp = fs.readFileSync(SECRETTEMP_FILE);
    fs.writeFileSync(SECRET_FILE, secretTemp.toString());
  }
}

function handleUploadDir() {
  const isExist = fs.existsSync(UPLOAD_DIR);
  if (!isExist) {
    fs.mkdirSync(UPLOAD_DIR);
  }
}

handleSecretFile(); // 处理秘钥文件(src.config/secret.ts)
handleUploadDir(); // 处理文件上传目录(src/upload)
