import React, {Fragment, useEffect, useState} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from "axios";

import {
    Row, Col,
    Card, CardBody, Button, Container, FormGroup, Label, Input, Form, ModalFooter
} from 'reactstrap';
import Select from "react-select";


const UbahDataMember = (props) => {

    const [name, setname] = useState(props.data.name)
    const [birthDate, setbirthDate] = useState(props.data.birthDate)
    const [selectOptions, setSelectOptions] = useState([]);
    const [idposition, setIdposition] = useState(props.data.idposition)
    const [nip, setNip] = useState(props.data.nip)
    const [gender, setgender] = useState(null)

    const onSubmit = () => {
        {/*Create a new object FromData*/}
        const formData = new FormData();

        {/*A method to converts a JavaScript object or value to a JSON string*/}
        const json = JSON.stringify({
            "id": this.props.id,
            "name": name == null ? props.data.name : name,
            "birthDate":  birthDate == null ? props.data.birthDate : birthDate,
            "idposition": idposition == null ? props.data.idposition : idposition,
            "nip": nip == null ? props.data.nip : nip,
            "gender": gender == null ? props.data.gender : gender,
        });


        {/*Sebuah object yang berisi hasil convert JS ke JSON*/}
        const blobDoc = new Blob([json], {
            type: 'application/json'
        });

       formData.append('data', blobDoc)

        const config = {
            headers: {
                'content-type': 'multipart/mixed'
            }
        }

        axios.post("http://localhost:2222/employee/update", formData, config)
            .then(()=>{tampil()})

        props.onChangeToggle(false)
    }

    const tampil = () =>{props.tampil()}


    const getOptions = () => {
        console.log("why im not around")
        axios.get('http://localhost:2222/position', {
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            const data = res.data;
            const options = data.map(d => ({
                "value": d.id,
                "label": d.positionName

            }));
            setSelectOptions(options)
        })

        console.log(selectOptions)
    }

    // const tampil = () =>{props.tampil}

    useEffect(() => {
        getOptions();
        tampil()
    }, [])

    return (
        <Fragment>
            <CSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>


                <div className="app-main">
                    <div className="app-main__inner">
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Card>
                                        <CardBody>
                                            <div
                                                className="p-5 bg-plum-plate">
                                                <div className="slider-content" style={{
                                                    color: "white", textAlign: "center"
                                                }}>
                                                    <h3>Master Karyawan</h3>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardBody>

                                            <Form>

                                                <FormGroup>
                                                    <Label>name</Label>
                                                    <Input type="text" name="name" id="name"
                                                           placeholder="name" onChange={(e) => {
                                                        setname(e.target.value)
                                                    }}/>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>Tanggal Lahir</Label>
                                                    <Input type="date" name="birthDate" id="birthDate" onChange={(e) => {
                                                        setbirthDate(e.target.value)
                                                    }}/>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="position">position</Label>
                                                    <Select name="idposition" id="idposition"
                                                            options={selectOptions}
                                                        // onChange={handleChangeSelect.bind(this)}
                                                            onChange={(e) => {
                                                                setIdposition(e.value)
                                                            }}
                                                    />
                                                </FormGroup>


                                                <FormGroup>
                                                    <Label for="nip">position</Label>
                                                    <Input type="number" name="nip" id="nip"
                                                           placeholder="Input your NIP" onChange={(e) => {
                                                        setNip(e.target.value)
                                                    }}/>
                                                </FormGroup>


                                                <FormGroup>
                                                    <Label for="gender">Jenis Kelamin</Label>
                                                    <Input type="select" name="gender" id="gender" onChange={(e) => {
                                                        setgender(e.target.value)
                                                    }}>
                                                        <option></option>
                                                        <option>Pria</option>
                                                        <option>Wanita</option>
                                                    </Input>
                                                </FormGroup>

                                                <Button color="link" onClick={()=> {props.onChangeToggle(false)}}>Cancel</Button>
                                                <Button color="primary" onClick={() => {onSubmit()}}>Save</Button>

                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </CSSTransitionGroup>
        </Fragment>
    )
}

export default UbahDataMember