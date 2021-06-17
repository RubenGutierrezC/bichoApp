import React, { ChangeEventHandler, ReactEventHandler, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  Table,
  TableCaption,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";

interface Gol {
  number: number | string;
  teamReceive: string;
  date: string;
  minute: string;
  type: string;
  mark: string;
}

const defaultData = {
  number: "",
  teamReceive: "",
  date: "",
  minute: "",
  type: "",
  mark: "",
};

function App() {
  const [gol, setGol] = useState<Gol>({} as Gol);
  const [isEdit, setIsEdit] = useState(false);
  const [goles, setGoles] = useState<Gol[]>([]);
  const [editedIndex, setEditedIndex] = useState(-1);

  const audio = new Audio("/cr_suuu.mp3");

  const handleAddGol = () => {
    const isValidForm = Object.keys(gol).some((t) => t !== "");
    if (isValidForm) {
      const findSameNumber = goles.find((g) => g.number === gol.number);

      if (!findSameNumber) {
        setGoles((state) => [...state, gol]);
        setGol({ ...gol, ...defaultData });
        audio.play();
      }
    }
  };

  const handleEdit = (number: number | string) => {
    setIsEdit(true);
    const findGol = goles.findIndex((g) => g.number === number);
    setEditedIndex(findGol);
    setGol({ ...goles[findGol] });
  };

  const handleEditGol = () => {
    const isValidForm = Object.keys(gol).some((t) => t !== "");
    if (isValidForm) {
      setGoles(goles.map((g, i) => (i === editedIndex ? gol : g)));
      setEditedIndex(-1);
      setGol({ ...gol, ...defaultData });
      setIsEdit(false);
    }
  };

  const handleDeleteGol = () => {
    setGoles(goles.filter((g, i) => i !== editedIndex));
    setEditedIndex(-1);
    setGol({ ...gol, ...defaultData });
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditedIndex(-1);
    setGol({ ...gol, ...defaultData });
  };

  return (
    <Box
      bgImage='url("https://i.pinimg.com/originals/6f/eb/d7/6febd71cfe36746be8485dba514e5a39.jpg")'
      h="100vh"
    >
      <Text textAlign="center" fontSize={40} color="#fff">
        Goles del bicho
      </Text>

      <Flex marginLeft={10}>
        {/* form */}
        <Box bgColor="rgba(255,255,255, 1)" px={4} borderRadius={8} py={4}>
          <Text mb="8px">Numero:</Text>
          <Input
            disabled={isEdit}
            type="number"
            value={gol.number}
            onChange={(evt: any) => {
              if (!isNaN(parseInt(evt.target.value))) {
                setGol({ ...gol, number: parseInt(evt.target.value) });
              }
            }}
            placeholder="Here is a sample placeholder"
            size="sm"
          />
          <Text mb="8px">Equipo que recibio el gol:</Text>
          <Input
            value={gol.teamReceive}
            onChange={(evt: any) =>
              setGol({ ...gol, teamReceive: evt.target.value })
            }
            placeholder="Here is a sample placeholder"
            size="sm"
          />
          <Text mb="8px">Fecha:</Text>
          <Input
            type="date"
            value={gol.date}
            onChange={(evt: any) => setGol({ ...gol, date: evt.target.value })}
            placeholder="Here is a sample placeholder"
            size="sm"
          />
          <Text mb="8px">Minuto:</Text>
          <Input
            value={gol.minute}
            onChange={(evt: any) =>
              setGol({ ...gol, minute: evt.target.value })
            }
            placeholder="Here is a sample placeholder"
            size="sm"
          />
          <Text mb="8px">Tipo de gol:</Text>
          <Input
            value={gol.type}
            onChange={(evt: any) => setGol({ ...gol, type: evt.target.value })}
            placeholder="Here is a sample placeholder"
            size="sm"
          />
          <Text mb="8px">Con que marco:</Text>
          <Input
            value={gol.mark}
            onChange={(evt: any) => setGol({ ...gol, mark: evt.target.value })}
            placeholder="Here is a sample placeholder"
            size="sm"
          />

          {!isEdit ? (
            <Button onClick={handleAddGol}>Agregar</Button>
          ) : (
            <>
              <Button onClick={handleEditGol}>Editar</Button>
              <Button onClick={handleDeleteGol}>Eliminar</Button>
              <Button onClick={handleCancel}>Cancelar</Button>
            </>
          )}
        </Box>

        <Box
          ml={10}
          bgColor="rgba(255,255,255, 1)"
          px={4}
          borderRadius={8}
          py={4}
        >
          <Text>Listado:</Text>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Gol #</Th>
                <Th>Equipo</Th>
                <Th>Opción</Th>
              </Tr>
            </Thead>
            <Tbody>
              {goles.map((gol, index) => (
                <Tr key={index}>
                  <Td>{gol.number}</Td>
                  <Td>{gol.teamReceive}</Td>
                  <Td>
                    <Button onClick={() => handleEdit(gol.number)}>
                      Editar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {goles.length > 0 && (
            <Button
              as='a'
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(goles)
              )}`}
              download="filename.json"
            >
              {`Download Json`}
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
