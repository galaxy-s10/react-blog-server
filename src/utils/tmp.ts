export const emailTmp = `
<div
  style="
    padding-bottom: 20px;
    background-color: #f7f8fa;
    min-width: 320px;
    max-width: 660px;
    margin: 0 auto;
    font-family: '宋体';
  "
>
  <table style="width: 100%">
    <tbody>
      <tr>
        <td style="width: 2%; max-width: 30px"></td>
        <td>
          <div>
            <div
              style="
                height: 30px;
                display: flex;
                align-items: center;
                margin-top: 10px;
              "
            >
              <img
                src="https://resource.hsslive.cn/image/fafb8ef1b480f4e263161db54d264e36.jpg"
                alt=""
                style="width: 30px; height: 30px; border-radius: 4px"
              />
              <div
                style="font-weight: 400; font-size: 18px; margin-left: 6px"
              >
                自然博客
              </div>
            </div>

            <table
              style="
                width: 100%;
                background-color: #fff;
                box-shadow: 0px 1px 1px 0px rgb(122 55 55 / 20%);
                font-size: 14px;
                color: rgb(51, 51, 51);
                font-weight: 300;
              "
            >
              <tr>
                <div
                  style="
                    height: 2px;
                    background-color: #00a4ff;
                    padding: 0;
                    width: 100%;
                    margin-top: 14px;
                  "
                ></div>
                <td style="width: 2%; max-width: 30px"></td>
                <td>
                  <h1
                    style="
                      margin: 10px 0 20px 0;
                      font-size: 20px;
                      font-weight: bold;
                    "
                  >
                    {title}ds第四个
                  </h1>
                  <p style="color: #00a4ff; margin: 6px 0 0 0">
                    <span>触发时间：</span>
                    <span>{triggerTime}</span>
                  </p>
                  <p style="color: red; margin: 6px 0 0 0">
                    <span>
                      当前内存使用率：{currMemoryRate}，当前buff/cache使用率：{currBuffCacheRate}
                    </span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Mem:total：</span></span>
                    <span><span>{Memtotal}</span></span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Mem:used：</span></span>
                    <span><span>{Memused}</span></span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Mem:free：</span></span>
                    <span><span>{Memfree}</span></span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Mem:shared：</span></span>
                    <span><span>{Memshared}</span></span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Mem:buff/cache：</span></span>
                    <span><span>{Membuffcache}</span></span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Mem:available：</span></span>
                    <span><span>{Memavailable}</span></span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Swap:total：</span></span>
                    <span><span>{Swaptotal}</span></span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Swap:used：</span></span>
                    <span><span>{Swapused}</span></span>
                  </p>
                  <p style="margin: 6px 0 0 0">
                    <span><span>Swap:free：</span></span>
                    <span><span>{Swapfree}</span></span>
                  </p>
                  <p style="margin: 6px 0 12px 0">
                    <span>内存阈值：</span>
                    <span>{memoryThreshold}({memoryRate})</span>，
                    <span>buff/cache阈值： </span>
                    <span>{buffCacheThreshold}({buffCacheRate})</span>，
                    <span>重启pm2的阈值：</span>
                    <span>{restartPm2Threshold}({restartPm2Rate})</span>
                  </p>
                </td>
                <td style="width: 2%; max-width: 30px"></td>
              </tr>
            </table>
          </div>
        </td>
        <td style="width: 2%; max-width: 30px"></td>
      </tr>
    </tbody>
  </table>
  <div
    style="
      font-size: 14px;
      color: rgb(51, 51, 51);
      margin-top: 10px;
      text-align: center;
    "
  >
    此为系统邮件，请勿回复。
  </div>
</div>
`;
