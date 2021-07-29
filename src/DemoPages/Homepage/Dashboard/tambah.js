import React, {Fragment, useEffect, useState} from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import axios from "axios";

import {
    Row, Col,
    Card, CardBody, Button, Container, FormGroup, Label, Input, Form
} from 'reactstrap';
import Select from "react-select";


const AddNewMember = (props) => {

    const [name, setName] = useState(null)
    const [birthDate, setBirthDate] = useState(null)
    const [selectOptions, setSelectOptions] = useState([]);
    const [idPosition, setIdPosition] = useState(null)
    const [nip, setNip] = useState(null)
    const [gender, setGender] = useState(null)


    const onSubmit = (e) => {
        const formData = new FormData();

        {/*A method to converts a JavaScript object or value to a JSON string*/}
        const json = JSON.stringify({
            "name": name,
            "birthDate":  birthDate,
            "idPosition": idPosition,
            "nip": nip,
            "gender": gender,
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

        axios.post("http://localhost:2222/employee/save", formData, config)
            .then(props.tampil).catch()

        props.onChangeToggle(false)
        props.tampil();
    }


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

    useEffect(() => {
        getOptions();
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
                                                    <Label>Nama</Label>
                                                    <Input type="text" name="name" id="name"
                                                           placeholder="name" onChange={(e) => {
                                                        setName(e.target.value)
                                                    }}/>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>Tanggal Lahir</Label>
                                                    <Input type="date" name="birthDate" id="birthDate" onChange={(e) => {
                                                        setBirthDate(e.target.value)
                                                    }}/>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="position">Jabatan</Label>
                                                    <Select name="idPosition" id="idPosition"
                                                            options={selectOptions}
                                                        // onChange={handleChangeSelect.bind(this)}
                                                            onChange={(e) => {
                                                                setIdPosition(e.value)
                                                            }}
                                                    />
                                                </FormGroup>


                                                <FormGroup>
                                                    <Label for="nip">NIP</Label>
                                                    <Input type="number" name="nip" id="nip"
                                                           placeholder="Input your NIP" onChange={(e) => {
                                                        setNip(e.target.value)
                                                    }}/>
                                                </FormGroup>


                                                <FormGroup>
                                                    <Label for="gender">Jenis Kelamin</Label>
                                                    <Input type="select" name="gender" id="gender" onChange={(e) => {
                                                        setGender(e.target.value)
                                                    }}>
                                                        <option></option>
                                                        <option>Pria</option>
                                                        <option>Wanita</option>
                                                    </Input>
                                                </FormGroup>


                                                <Button color="link" onClick={()=> {props.onChangeToggle(false)}}>Kembali</Button>
                                                <Button color="primary"  onClick={() => {onSubmit()}}>Simpan</Button>


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

export default AddNewMember