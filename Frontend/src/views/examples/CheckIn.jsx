import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Label,
  Table,
} from 'reactstrap';
import styled from 'styled-components';
import SimpleFooter from '../../components/Footers/SimpleFooter';

import RestaurantsNavbar from '../../components/Navbars/RestaurantsNavbar';
import { useAuthValue } from '../../providers/AuthProvider';
import { firebase } from '../../services/firebase';
import { baseUrl, asyncUrl } from '../../constants';

const CustomList = styled.div`
    background-color: rgba(255, 255, 255);
    opacity: 0.8;
    border-radius: 0px 10px 10px 0px;
    height: 100%;
    overflow-y: scroll;
`;

const CheckIn = () => {
  const { currentUser, userToken } = useAuthValue();
  const [checkedInUsers, setCheckedInUsers] = useState([]);
  const [, setUserEmotes] = useState([]);

  let pc = null;

  function createPeerConnection() {
    const config = {
      sdpSemantics: 'unified-plan',
    };

    if (document.getElementById('use-stun').checked) {
      config.iceServers = [
        { urls: ['stun:stun.l.google.com:19302']},
        {
          urls: 'turn:54.184.201.238:3478?transport=tcp',
          username: 'turner',
          Credential: 'msengage'
        }
      ];
    }

    pc = new RTCPeerConnection(config);

    pc.addEventListener('track', function (evt) {
      if (evt.track.kind === 'video')
        document.getElementById('video').srcObject = evt.streams[0];
      else
        document.getElementById('audio').srcObject = evt.streams[0];
    });

    return pc;
  }

  function negotiate() {
    return pc.createOffer().then(function (offer) {
      return pc.setLocalDescription(offer);
    }).then(function () {
      return new Promise(function (resolve) {
        if (pc.iceGatheringState === 'complete') {
          resolve();
        } else {
          function checkState() {
            if (pc.iceGatheringState === 'complete') {
              pc.removeEventListener('icegatheringstatechange', checkState);
              resolve();
            }
          }
          pc.addEventListener('icegatheringstatechange', checkState);
        }
      });
    }).then(function () {
      const offer = pc.localDescription;

      return fetch(asyncUrl + 'offer', {
        body: JSON.stringify({
          sdp: offer.sdp,
          type: offer.type,
          restaurant: userToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }).then(function (response) {
      return response.json();
    }).then(function (answer) {
      return pc.setRemoteDescription(answer);
    }).catch(function (e) {
      alert(e);
    });
  }

  function start() {
    document.getElementById('start').style.display = 'none';

    pc = createPeerConnection();

    const constraints = {
      audio: false,
      video: true,
    };

    constraints.video = true;


    if (constraints.audio || constraints.video) {
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        stream.getTracks().forEach(function (track) {
          pc.addTrack(track, stream);
        });
        return negotiate();
      }, function (err) {
        alert('Could not acquire media: ' + err);
      });
    } else {
      negotiate();
    }

    document.getElementById('stop').style.display = 'inline-block';
  }

  function stop() {
    document.getElementById('stop').style.display = 'none';
    document.getElementById('start').style.display = 'block';

    if (pc.getTransceivers) {
      pc.getTransceivers().forEach(function (transceiver) {
        if (transceiver.stop) {
          transceiver.stop();
        }
      });
    }

    pc.getSenders().forEach(function (sender) {
      sender.track.stop();
    });

    setTimeout(function () {
      pc.close();
    }, 500);
  }

  useEffect(() => {
    if (currentUser != null && userToken != null) {
      const dbRef = firebase.database().ref('checkin/' + currentUser.user.username);
      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data !== '') {
          axios.post(
            baseUrl + 'restaurant/getcustomerinfo/',
            {
              'usernames': data,
            },
            { headers: { 'Authorization': userToken }},
          ).then((response) => {
            const user_data = response.data;
            const emoteRefs = [];
            user_data.forEach((customer) => {
              const tmpRef = firebase.database().ref('emotion/' + customer.user.username);
              tmpRef.on('value', (snapshot) => {
                const emotion = snapshot.val();
                if (emotion !== '') {
                  customer['emotion'] = emotion;
                }
              });
              emoteRefs.push(tmpRef);
            });
            setUserEmotes(emoteRefs);
            setCheckedInUsers(user_data);
          });
        }
        else {
          setCheckedInUsers([]);
          setUserEmotes([]);
        }
      });
    }
  }, [userToken, currentUser]);

  return (
    <>
      <RestaurantsNavbar />
      <main>
        <div className="position-relative">
          <section className="section section-shaped section-lg pb-150">
            <div className="shape shape-style-1 bg-gradient-danger">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="mt-4">
              <Row className="mt-4">
                <Col lg="9" style={{ padding: '0px' }}>
                  <audio id="audio" autoPlay={true} />
                  <video id="video" autoPlay={true} playsInline={true} style={{ width: '100%', height: '100%', backgroundColor: 'black', borderRadius: '10px 0px 0px 10px' }} />
                </Col>
                <Col lg="3" style={{ padding: '0px' }}>
                  <CustomList>
                    <Container>
                      <Table borderless>
                        <thead>
                          <th>Name</th>
                          <th>Emotion</th>
                        </thead>
                        <tbody>
                          {
                            checkedInUsers.map((user) => (
                              <tr key={user.user.name}>
                                <td>{user.user.name}</td>
                                <td>{user.emotion}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </Table>
                    </Container>
                  </CustomList>
                </Col>
              </Row>
              <Row className="mt-4 justify-content-center">
                <Col lg="5" className="mx-4">
                  <Button
                    id="start"
                    color="warning"
                    onClick={() => start()}
                  >Start</Button>
                  <Button
                    id="stop"
                    color="warning"
                    style={{ display: 'none' }}
                    onClick={() => stop()}
                  >
                    Stop
                  </Button>
                </Col>
                <Col lg="5" className="mx-4 justify-content-center">
                  <Input type="checkbox" id="use-stun" />
                  <Label check>Use STUN server</Label>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </main>
      <SimpleFooter />
    </>
  );
};

export default CheckIn;