import { useQueries } from "@tanstack/react-query";
import { getProjectTree } from "../../../apis/projects.js";

export const useProjectTree = (projectId) => {
    const {isError, isLoading, error, data: projectTree} = useQueries({
        queryFn: () => getProjectTree({projectId})
    });
    return {isError, isLoading, error, projectTree};
}