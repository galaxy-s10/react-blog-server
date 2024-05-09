import fs from 'fs';

import { Sequelize } from 'sequelize';

import { PROJECT_ENV, PROJECT_ENV_ENUM, PROJECT_NODE_ENV } from '@/constant';
import { deleteForeignKeys, deleteIndexs } from '@/utils';
import { chalkERROR, chalkSUCCESS, chalkWARN } from '@/utils/chalkTip';

/** 加载所有model */
export const loadAllModel = () => {
  const modelDir = `${process.cwd()}/${
    PROJECT_ENV === PROJECT_ENV_ENUM.prod ? 'dist' : 'src'
  }/model`;
  fs.readdirSync(modelDir).forEach((file: string) => {
    if (PROJECT_NODE_ENV === 'development') {
      if (file.indexOf('.model.ts') === -1) return;
    } else if (file.indexOf('.model.js') === -1) return;

    // eslint-disable-next-line
    require(`${modelDir}/${file}`).default;
  });
  console.log(chalkSUCCESS(`加载所有数据库表成功!`));
};

/** 删除所有表 */
export const deleteAllTable = async (sequelizeInst: Sequelize) => {
  try {
    loadAllModel();
    await sequelizeInst.drop();
    console.log(chalkSUCCESS('删除所有表成功！'));
  } catch (err) {
    console.log(chalkERROR('删除所有表失败！'));
  }
};

/**
 * 初始化数据库：
 * force:重置所有
 * alert:校正现有数据库
 * load:加载数据库表
 */
export const initDb = async (
  type: 'force' | 'alert' | 'load',
  sequelizeInst: Sequelize
) => {
  switch (type) {
    case 'force':
      console.log(chalkWARN('开始初始化数据库所有表'));
      await deleteForeignKeys({ sequelizeInst });
      await deleteIndexs({ sequelizeInst });
      await deleteAllTable(sequelizeInst);
      await sequelizeInst.sync({ force: true }); // 将创建表,如果表已经存在,则将其首先删除
      console.log(chalkSUCCESS('初始化数据库所有表完成！'));
      break;
    case 'alert':
      console.log(chalkWARN('开始校正数据库所有表'));
      require('@/model/relation');
      await sequelizeInst.sync({ alter: true }); // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
      console.log(chalkSUCCESS('校正数据库所有表完成！'));
      break;
    case 'load':
      require('@/model/relation');
      break;
    default:
      throw new Error('initDb参数不正确！');
  }
};
