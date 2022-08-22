import * as yup from 'yup';
import config from '../config';

export type PaginationDTO = { page: number; limit: number; orderBy: string };
export type PaginationFromRequest = {
    page: string;
    limit: string;
    orderBy: string;
};
export type PaginationReturn = { count: number };

const querySchema = yup.object({
    page: yup.number().integer().label('Page number'),
    limit: yup.number().integer().label('Limit per Page'),
    orderBy: yup
        .string()
        .matches(
            /^(?:[A-Za-z]+:(?:asc|desc),?)+$/,
            'Order By must be "key1:(asc|desc),key2:(asc|desc)"'
        )
        .label('Ordered by'),
});

const dto = (query: PaginationFromRequest): PaginationDTO => {
    const page = query.page as string;
    const limit = query.limit as string;
    const orderBy = query.orderBy as string;

    return {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 15,
        orderBy,
    };
};

const link = (page: number, limit: number, path: string, extraQueries) => {
    const extras = !extraQueries
        ? ''
        : Object.entries(extraQueries).reduce((acc, entry) => {
              if (entry[1] !== undefined)
                  return `${acc}${entry[0]}=${entry[1]}&`;
              return acc;
          }, '');
    return `${config.HOST}:${config.PORT}${path}?page=${page}&limit=${limit}&${extras}`;
};

const response = (
    data: PaginationDTO,
    count: number,
    path: string,
    extraQueries?: { [key: string]: string }
) => {
    const pages = Math.ceil(count / data.limit);
    const next =
        data.page < pages
            ? link(data.page + 1, data.limit, path, extraQueries)
            : undefined;
    const previous =
        data.page > 1
            ? link(data.page - 1, data.limit, path, extraQueries)
            : undefined;

    return {
        page: data.page,
        limit: data.limit,
        pages,
        count,
        links: { next, previous },
    };
};

const getOrder = (orderBy?: string, alias?: string) => {
    const order: { [key: string]: 'ASC' | 'DESC' } = {};
    if (orderBy) {
        const columns = orderBy.split(',');
        columns.forEach((column) => {
            const [key, value] = column.split(':');
            const finalKey = alias ? `${alias}.${key}` : key;
            order[finalKey] = value.toUpperCase() as 'ASC' | 'DESC';
        });
    }

    return order;
};

const find = (data: PaginationDTO) => {
    const order = getOrder(data.orderBy);

    return {
        ...(Object.keys(order).length === 0 && order),
        skip: data.limit * (data.page - 1),
        take: data.limit,
    };
};

const PaginationHelper = { querySchema, dto, response, find, getOrder };

export default PaginationHelper;
