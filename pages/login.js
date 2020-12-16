import {
  Center,
  Heading,
  Box,
  Flex,
  Link,
  Divider,
  Spacer,
  Text,
  Button,
  Image,
  Alert,
  AlertIcon,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/router";
import { auth, googleProvider } from "../firebase/firebase.config";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    auth.signInWithPopup(googleProvider).then((user) => {
      router.push("/");
      setLoading(false);
    });
  };

  return (
    <Flex direction="column" h="100vh">
      <Box p={4}>
        <Flex alignItems="center" w="100%">
          <Heading>Login</Heading>
        </Flex>
      </Box>
      <Center flex={2} p={4}>
        <Stack maxW="400px" textAlign="center">
          <Box textAlign="center" mb={8}>
            <Heading>Lovelook Report Sharing</Heading>
          </Box>
          <Box textAlign="left">
            <Heading size="lg">Sign in with Google</Heading>
            <Text>
              You must sign in with your google account, to get access to the
              app.
            </Text>
            <Button
              mt={4}
              colorScheme="red"
              isFullWidth
              leftIcon={<AiOutlineGoogle />}
              onClick={handleLogin}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Box>
        </Stack>
      </Center>
    </Flex>
  );
}
