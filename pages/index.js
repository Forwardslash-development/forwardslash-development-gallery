import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Text,
  Wrap,
  WrapItem,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { getCuratedPhotos, getQueryPhotos } from '../lib/api';

export default function Home({ data }) {
  const [photos, setPhotos] = useState(data);
  const [query, setQuery] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (query == '') {
      toast({
        title: 'Error.',
        description: 'Empty Search',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } else {
      const res = await getQueryPhotos(query);
      await setPhotos(res);
      await setQuery('');
    }
  };

  return (
    <div>
      <Head>
        <title>Forwardslash Development Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" bg="orange.500" minH="100vh">
        <Container>
          <Text
            color="blue.50"
            fontWeight="semibold"
            mb="1rem"
            textAlign="center"
            textDecoration="underline"
            fontSize={['4xl', '4xl', '5xl', '5xl']}
          >
            Forwardslash Development Gallery
          </Text>
          <form onSubmit={handleSubmit}>
            <InputGroup pb="1rem">
              <Input
                placeholder="Search for Apple"
                variant="ghost"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <InputRightElement
                children={
                  <IconButton
                    aria-label="Search"
                    icon={<SearchIcon />}
                    onClick={handleSubmit}
                    bg="blue.400"
                    color="white"
                  />
                }
              />
            </InputGroup>
          </form>
        </Container>
        <Wrap px="1rem" spacing={4} justify="center">
          {photos.map((pic) => (
            <WrapItem
              key={pic.id}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              bg="white"
              lineHeight="0"
              _hover={{ boxShadow: 'dark-lg' }}
            >
              <Image
                src={pic.src.portrait}
                height="600"
                width="400"
                alt={pic.url}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getCuratedPhotos();
  return {
    props: {
      data,
    },
  };
}
