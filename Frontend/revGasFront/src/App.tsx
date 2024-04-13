import {
  Container,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import React from "react";
import { useState } from "react";
import axios from "axios";

const api = "http://127.0.0.1:8000";

interface Bank {
  codigo: string;
  instituicao: string;
}

function App() {
  const [searchResults, setSearchResults] = useState<Bank[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get(api + `/bancos/${searchValue}`);
      let results = response.data;
      if (!Array.isArray(results)) {
        results = [results];
      }
      results.sort(
        (a: Bank, b: Bank) => parseInt(a.codigo) - parseInt(b.codigo)
      );
      setSearchResults(results);
      setIsError(results.length === 0);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  return (
    <>
      <main className="App">
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "3vh",
            gap: 2,
          }}
        >
          <Typography variant="h2">RevGás</Typography>
          <Card
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "70%",
              height: "70%",
            }}
          >
            <Typography variant="h5">Consulta de Bancos</Typography>
            <FormControl
              component="form"
              onSubmit={handleSubmit}
              sx={{ gap: 2 }}
            >
              <TextField
                label="Código de Compensação"
                variant="outlined"
                error={isError}
                helperText={isError ? "Nenhum banco encontrado!" : ""}
                value={searchValue}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Pesquisar
              </Button>
            </FormControl>
            <List>
              <Typography variant="h6">Resultados: </Typography>
              {searchResults.map((result, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`${result.codigo} - ${result.instituicao} `}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Card>
          <footer>
            <Typography variant="body2" align="center">
              Desenvolvido por:{" "}
              <a href="https://github.com/miasK3011" target="_blank" rel="noopener noreferrer">Neemias Calebe</a>
            </Typography>
          </footer>
        </Container>
      </main>
    </>
  );
}

export default App;
