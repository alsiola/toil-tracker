import { toilService } from "./toil-event";
import { Connection } from "typeorm";

export const createModel = (connection: Connection) => ({
    toilService: toilService(connection)
});
