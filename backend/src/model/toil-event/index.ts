import { Connection, Repository } from "typeorm";
import { ToilEvent } from "../../entities/ToilEvent";

type Repo = Repository<ToilEvent>;

const timestampify = (toilEvent: ToilEvent) => ({
    ...toilEvent,
    start: toilEvent.start.toISOString(),
    end: toilEvent.end && toilEvent.end.toISOString()
});

const getToilById = (repository: Repo) => ({ id }: { id: number }) => {
    return repository.findOneOrFail({ id });
};

const startToil = (repository: Repo) => async ({
    user_sub
}: {
    user_sub: string;
}) => {
    const toilEvent = await repository.save(
        ToilEvent.create({
            user_sub
        })
    );

    return timestampify(toilEvent);
};

const endToil = (repository: Repo) => async ({ id }: { id: number }) => {
    await repository.update({ id }, { end: new Date() });

    const toilEvent = await getToilById(repository)({ id });

    return timestampify(toilEvent);
};

const getUserToils = (repository: Repo) => async ({
    user_sub
}: {
    user_sub: string;
}) => {
    const toilEvents = await repository.find({ user_sub });

    return toilEvents.map(timestampify);
};

const getCurrentUserToil = (repository: Repo) => async ({
    user_sub
}: {
    user_sub: string;
}) => {
    const toilEvent = await repository.findOne({ user_sub, end: null });

    return toilEvent && timestampify(toilEvent);
};

export const toilService = (connection: Connection) => {
    const repository = connection.getRepository(ToilEvent);
    return {
        startToil: startToil(repository),
        endToil: endToil(repository),
        getUserToils: getUserToils(repository),
        getCurrentUserToil: getCurrentUserToil(repository)
    };
};
