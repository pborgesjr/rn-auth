import * as SecureStore from "expo-secure-store";

export const saveSecureValue = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const readSecureValue = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};
