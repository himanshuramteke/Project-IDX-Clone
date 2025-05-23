import { useQuery } from "@tanstack/react-query"
import { getProjectTree } from "../../../apis/projects"

export const useProjectTree = ( projectid ) => {
    const { isLoading, isError, data: projectTree, error } = useQuery({
        queryFn: () => getProjectTree({ projectid })
    });

    return {
        isLoading,
        isError,
        projectTree,
        error
    }
}