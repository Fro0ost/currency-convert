import React from 'react';
import {ConfigProvider} from "antd";
import {Header} from "./components/Header/Header";
import {Convert} from "./components/Convert/Convert";

function App() {
  return (
      <ConfigProvider theme={{
        token: {
          fontFamily: 'Montserrat',
        },
      }}>
        <div className="App">
          <Header/>
          <Convert/>
        </div>
      </ConfigProvider>

  );
}

export default App;
