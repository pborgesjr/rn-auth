import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axios";
import { deleteSecureValue } from "../../utils/secureStore";
import { useJWTAuth } from "../../context/jwtAuth";

type ProfileResponse = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

const HomePage = () => {
  const [user, setUser] = useState<ProfileResponse | null>(null);

  const { setIsLoggedIn } = useJWTAuth();

  const fetchProfileData = async () => {
    axiosInstance.get<ProfileResponse>("/profile").then((res) => {
      setUser({ ...res.data });
    });
  };

  const simulateRefreshToken = async () => {
    await deleteSecureValue("access_token");

    setIsLoggedIn(false);

    fetchProfileData();
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <View>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Text>{user?.role}</Text>

      <TouchableOpacity onPress={simulateRefreshToken}>
        <Text>Simulate refreshing token</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
