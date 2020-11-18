import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateLink from "./routes/CreateLink";
import ViewLink from "./routes/ViewLink";
import styled from "styled-components";

export const baseUrl = "https://v8f5wuaac9.execute-api.us-east-1.amazonaws.com/dev";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Switch>
          <Route path="/" exact component={CreateLink} />
          <Route path="/view/:linkId" component={ViewLink} />
        </Switch>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
