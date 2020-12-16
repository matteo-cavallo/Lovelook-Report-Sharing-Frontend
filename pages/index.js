import { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Spacer,
  Spinner,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthProvider";
import { auth } from "../firebase/firebase.config";
import nookies from "nookies";

export default function Index({ products }) {
  const router = useRouter();
  const { user } = useAuth();

  const totalSales = () => {
    let total = 0;
    let orders = [];
    if (products.length != 0) {
      products.forEach((product) => {
        product.orders.forEach((order) => {
          orders.push(order.price);
        });
      });
      total = orders.reduce((accumulator, current) => {
        return accumulator + current;
      });
    }
    return { total: total, number: orders.length };
  };

  const logout = () => {
    auth.signOut();
    router.push("/login");
  };

  if (!user) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="red.500" />
      </Center>
    );
  }

  const Product = ({ product }) => {
    const { title, image } = product.product;
    const { orders } = product;
    return (
      <Box>
        <Flex px={2} alignItems="center">
          <Square size="50px" bgColor="gray.100">
            <Image src={image} />
          </Square>
          <Box p={1} flex={2}>
            <Heading ml={1} fontSize="md">
              {title}
            </Heading>
          </Box>
          <Box p={2}>
            <Center h="100%">
              <Text fontSize="sm" color="gray.600">
                {orders.length}
              </Text>
            </Center>
          </Box>
        </Flex>
      </Box>
    );
  };

  const ReportCard = ({ title, amount, link, data }) => {
    return (
      <Box rounded="md" boxShadow="md" p={4}>
        <Stack>
          <Box>
            <Text color="gray.600" fontSize="xs">
              {title}
            </Text>
            <Box py={3}>
              <Heading fontSize="2xl">{amount}</Heading>
            </Box>
          </Box>
          <Divider></Divider>
          <Box py={3}>
            <Flex>
              <Text color="gray.600" fontSize="sm">
                {data}
              </Text>
              <Spacer></Spacer>
              <Text fontSize="sm">{link}</Text>
            </Flex>
          </Box>
        </Stack>
      </Box>
    );
  };

  return (
    <Box p={4}>
      <Heading mb={8}>Hello {user.displayName}</Heading>
      <Stack spacing={4}>
        <Box>
          <Box boxShadow="md" py={4} rounded="md">
            <Stack p={3}>
              <Text color="gray.600" fontSize="xs">
                SHARED ORDERS
              </Text>
              <Heading fontSize="md">
                These are the products shared with you by Lovelook
              </Heading>
              <Text fontSize="sm">
                These data includes number of orders, amount and total.
              </Text>
            </Stack>
            <Flex px={4} py={1}>
              <Text fontSize="sm">Product</Text>
              <Spacer></Spacer>
              <Text fontSize="sm">Orders</Text>
            </Flex>
            <Divider></Divider>
            <Stack divider={<Divider></Divider>}>
              {products.map((p) => {
                return <Product key={p.product.handle} product={p}></Product>;
              })}
            </Stack>
          </Box>
        </Box>

        <ReportCard
          title="TOTAL SALES"
          amount={totalSales().total + "€"}
          data={`${totalSales().number} orders`}
          link="View Reports"
        ></ReportCard>
        <Button onClick={logout}>Sign Out</Button>
      </Stack>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const { token, mail } = nookies.get(ctx);

  if (token && mail) {
    const { products } = await fetch(
      `https://arcane-temple-75010.herokuapp.com/orders/${mail}`
    ).then((res) => res.json());

    return {
      props: {
        products: products,
      },
    };
  } else {
    console.log("No Token");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
