import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./../configs/api";

const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);

  return useMutation({ mutationFn });
};

const useLogin = () => {
  // console.log("Base URL:", baseUrl);
  const mutationFn = (data) => api.post("auth/login", data);

  return useMutation({ mutationFn });
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.post("products", data);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.delete("products", data);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

const useEditProduct = (id) => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.put(`products/${id}`, data);

  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
export {
  useRegister,
  useLogin,
  useCreateProduct,
  useDeleteProduct,
  useEditProduct,
};
