import { filterObj } from 'billd-utils';
import Sequelize from 'sequelize';

import { IList, IType } from '@/interface';
import typeModel from '@/model/type.model';
import { handlePaging } from '@/utils';

const { Op } = Sequelize;

class TypeService {
  /** 分类是否存在 */
  async isExist(ids: number[]) {
    const res = await typeModel.count({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return res === ids.length;
  }

  /** 获取分类列表 */
  async getList({
    id,
    orderBy,
    orderName,
    nowPage,
    pageSize,
    keyWord,
    rangTimeType,
    rangTimeStart,
    rangTimeEnd,
  }: IList<IType>) {
    let offset;
    let limit;
    if (nowPage && pageSize) {
      offset = (+nowPage - 1) * +pageSize;
      limit = +pageSize;
    }
    const allWhere: any = {};
    if (id) {
      allWhere.id = +id;
    }
    if (keyWord) {
      const keyWordWhere = [
        {
          name: {
            [Op.like]: `%${keyWord}%`,
          },
        },
      ];
      allWhere[Op.or] = keyWordWhere;
    }
    if (rangTimeType) {
      allWhere[rangTimeType] = {
        [Op.gt]: new Date(+rangTimeStart!),
        [Op.lt]: new Date(+rangTimeEnd!),
      };
    }
    // @ts-ignore
    const result = await typeModel.findAndCountAll({
      order: [[orderName, orderBy]],
      limit,
      offset,
      where: {
        ...allWhere,
      },
    });
    return handlePaging(result, nowPage, pageSize);
  }

  /** 查找分类 */
  async find(id: number) {
    const result = await typeModel.findOne({ where: { id } });
    return result;
  }

  /** 创建分类 */
  async create(data: IType) {
    const result = await typeModel.create(data);
    return result;
  }

  /** 修改分类 */
  async update(data: IType) {
    const { id } = data;
    const data2 = filterObj(data, ['id']);
    const result = await typeModel.update(data2, {
      where: { id },
      limit: 1,
    });
    return result;
  }

  /** 删除分类 */
  async delete(id: number) {
    const result = await typeModel.destroy({
      where: { id },
      limit: 1,
      individualHooks: true,
    });
    return result;
  }
}

export default new TypeService();
