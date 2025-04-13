import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "../../../apis/projects";

export const useCreateProject = () => {
    const { mutateAsync, isLoading, isSuccess, isError, error, data } = useMutation({
        mutationFn: createProjectApi,
        onSuccess: (data) => {
            console.log("Project created successfully", data);
        },
        onError: () => {
            console.log("Error creating project"); 
        }
    });

    return {
        createProjectMutation: mutateAsync,
        isLoading,
        isSuccess,
        isError,
        data,
        error
    }
}