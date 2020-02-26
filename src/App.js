import React from 'react';
import logo from './logo.svg';
import Clock from './components/Clock.js';
import ShowInput from './components/showInput.js';
import Button from './components/Button.js';
import Check from './components/check.js';
import TextArea from './components/textarea.js';
import Twins from './components/ref.js';
import Count from './components/lifecycle.js';
import Toggle from './components/toggle.js';
// import MyRef from './components/createRef';
// import LogControl from './components/logControl.js';
import NameForm from './components/form1.js';
// import SelectForm from './components/form2.js';
import Reservation from './components/form3.js';
import RefDemo from './components/form4'
import Temperature from './components/temperature';
import SignUpDialog from './components/dialog';
import List from './components/list';
// import  ContainerUI from './components/store_test';
import ContainerUI from './components/flux_reduce_store';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button />
        <RefDemo />
        <ContainerUI />
        <ShowInput />
        <Clock />
        <List />
        {/* <MyRef /> */}
        <Count />
        <div id='lifecycle'></div>
        <TextArea />
        <Check/>
        <Twins/>
        <Toggle /> 
        <NameForm />
        {/* <SelectForm /> */}
        <Reservation />
        {/* <LogControl isLogIn={true}/> */}
        <Temperature scale='c' />
        <SignUpDialog />
      </header>
    </div>
  );
}


export default App;
