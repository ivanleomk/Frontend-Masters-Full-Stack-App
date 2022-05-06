import { useStoreActions } from "easy-peasy";
import React from "react";
import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <IconButton
          icon={<BsFillPlayFill fontSize="30px" />}
          colorScheme="green"
          size="lg"
          aria-label="Play"
          isRound
          onClick={() => handlePlay()}
        />
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>
              <AiOutlineClockCircle />
            </Th>
          </Thead>
          <Tbody>
            {songs.map((song, i) => {
              return (
                <Tr
                  onClick={() => {
                    handlePlay(song);
                  }}
                  sx={{
                    transition: "all .3s ",
                    "&:hover": {
                      bg: "rgba(255,255,255, 0.1)",
                    },
                  }}
                  key={song.id}
                  cursor="pointer"
                >
                  <Td>{i + 1}</Td>
                  <Td>{song.name}</Td>
                  <Td>{formatDate(song.createdAt)}</Td>
                  <Td>{formatTime(song.duration)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
