import React, {useState, useEffect} from "react";
import axios from 'axios';
import VerticalBar from './chart';


const App = () => {
  
  const [txtData, setTxtData] = useState([]);
  const [countHost, setCountHost] = useState([]);
  const [day30Request, setDay30Request] = useState([]);
  const [day29Request, setDay29Request] = useState([]);
  const [getRequest, setGetRequest] = useState([]);
  const [postRequest, setPostRequest] = useState([]);
  const [replyCode200, setReplyCode200] = useState([]);
  const [numberOfBytes, setNumberOfBytes] = useState([]);



  useEffect( () => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: 'get',
      url: 'https://nodeserverufirst.herokuapp.com/getData'
    }).then(function (response) {
        setTxtData(response['data']);
      });
    } 

    const showDataConsole = () => {
      console.log("Count of hosts: " + countHost);
      console.log("Count of request at 30 of August: " + day30Request);
      console.log("Count of request at 29 of August: " + day29Request);
      console.log("Count of GET requests: " + getRequest);
      console.log("Count of POST requests: " + postRequest);
      console.log("Count of reply code 200: " + replyCode200);
      console.log("Count of bytes: " + numberOfBytes);

    }

    const showTheData = () => {

      let numberOfHost = 0;
      let august29Request = 0;
      let august30Request = 0;
      let numberOfGet = 0;
      let numberOfPost = 0;
      let replyCode200 = 0;
      let bytes = 0;

      txtData.forEach((value) => {
        
        if(value['host'] !== ' '){
          numberOfHost++;
        }

        if(value['date'] < '[30:00:00:00]'){
          august30Request++;
        }

        if(value['date'] >= '[30:00:00:00]'){
          august29Request++;
        }

        if(value['request'][0] === 'G'){
          numberOfGet++;
        }

        if(value['request'][0] === 'P'){
          numberOfPost++;
        }

        if(value['httpReplyCode'] === '200'){
          replyCode200++;
        }

        if(value['bytes'] !== ' '){
          bytes++;
        }

      })

      setCountHost(numberOfHost);
      setDay30Request(august30Request);
      setDay29Request(august29Request);
      setGetRequest(numberOfGet);
      setPostRequest(numberOfPost);
      setReplyCode200(replyCode200);
      setNumberOfBytes(bytes);
      
    }

    return (
      <div>
        <h3>Choose the way you want to see the data</h3>
        <div>
          <button onClick={ () => showTheData()} >Show data in graphic</button>
          <button onClick={ () => showDataConsole()} >Show data in console</button>
        </div>
        <div className="verticalChart">
        <VerticalBar 
        host={countHost} 
        day29={day29Request} 
        day30={day30Request} 
        getRequest={getRequest} 
        postRequest={postRequest}
        replyCode200={replyCode200}
        bytes={numberOfBytes}
        ></VerticalBar>
        </div>
      </div>
    );
  }


export default App;
