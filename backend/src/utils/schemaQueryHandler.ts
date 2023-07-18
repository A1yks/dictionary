import { FilterQuery, HydratedDocument, MongooseQueryMiddleware, Query, Schema } from 'mongoose';

type ManyQueryType = {
    _id: {
        $in: string[];
    };
};

type ThisType<T> = Query<any, ManyQueryType | HydratedDocument<T>>;

async function schemaQueryHandler<T = never>(
    schema: Schema,
    method: 'deleteMany' | 'updateMany',
    callback: (this: ThisType<T>, ids: string[], query: FilterQuery<ManyQueryType>) => void | Promise<void>
): Promise<void>;

async function schemaQueryHandler<T = never>(
    schema: Schema,
    method: Exclude<MongooseQueryMiddleware, 'deleteMany' | 'updateMany'>,
    callback: (this: ThisType<T>, document: HydratedDocument<T>, query: FilterQuery<HydratedDocument<T>>) => void | Promise<void>
): Promise<void>;

async function schemaQueryHandler<T = never>(
    schema: Schema,
    method: MongooseQueryMiddleware,
    callback: (
        this: ThisType<T>,
        documentOrIds: string[] | HydratedDocument<T>,
        query: FilterQuery<ManyQueryType | HydratedDocument<T>>
    ) => void | Promise<void>
) {
    schema.pre(method, async function (this: ThisType<T>) {
        const query = this.getQuery();

        if (method === 'deleteMany' || method === 'updateMany') {
            const ids = query._id.$in as ManyQueryType['_id']['$in'];

            if (!ids) {
                throw new Error('Query doesn not have $in operator');
            }

            await callback.call(this, ids, query);
            return;
        }

        const id = query._id;
        const document = await this.model.findOne({ _id: id });

        if (!document) return;

        await callback.call(this, document, query);
    });
}

export default schemaQueryHandler;
