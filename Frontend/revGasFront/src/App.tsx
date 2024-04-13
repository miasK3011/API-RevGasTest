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
import axios from 'axios';

interface Bank {
  name: string;
  code: string;
}

function App() {
  const [searchResults, setSearchResults] = useState<Bank[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const banks: Bank[] = [
    { name: "Banco do Brasil", code: "001" },
    { name: "Caixa Econômica Federal", code: "104" },
    { name: "Banco Santander", code: "033" },
    { name: "Banco Itaú", code: "341" },
    { name: "Banco Bradesco", code: "237" },
  ]; 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchValue.trim() === "") {
      setIsError(true);
      return;
    }
    try {
      const response = await axios.get<Bank[]>('https://seu-endpoint.com/bancos');
      const banks = response.data;
      const results = banks.filter((bank) => bank.code.includes(searchValue));
      setSearchResults(results);
      setIsError(results.length === 0);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  return (
    <>
      <div className="App">
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "2vh",
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
              width: "50%",
              height: "50%",
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
              />
              <Button type="submit" variant="contained" color="primary">
                Pesquisar
              </Button>
            </FormControl>
            <List>
              {searchResults.map((result, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={`${result.code} - ${result.name} `} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default App;
