import { DocumentNode } from "graphql";
import { IResolvers } from "graphql-tools";
import { compact, merge, flatten } from "lodash";

export interface SchemaSection {
    typeDef: DocumentNode;
    resolvers: any;
}

export interface SchemaGroup {
    typeDefs: DocumentNode[];
    resolvers: IResolvers;
}

type PartialSchema = Partial<SchemaSection>;

const isSchemaGroup = (
    section: PartialSchema | SchemaGroup
): section is SchemaGroup => {
    return !!(section as SchemaGroup).typeDefs;
};

export const groupSchema = (
    ...sections: Array<PartialSchema | SchemaGroup>
): SchemaGroup => ({
    typeDefs: compact(
        flatten(
            sections.map(section =>
                isSchemaGroup(section) ? section.typeDefs : [section.typeDef]
            )
        )
    ),
    resolvers: merge({}, ...sections.map(({ resolvers }) => resolvers))
});
